from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics, permissions
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User, Institution
from .serializers import (
    UserSerializer,
    CreateUserSerializer,
    InstitutionSerializer,
    InstitutionAdminSerializer,
)
from djoser.serializers import PasswordSerializer, CurrentPasswordSerializer
from djoser.compat import get_user_email
from .serializers import TokenRefreshSerializer
from django.contrib.auth import (
    authenticate,
    login,
    logout,
)
from django.template.loader import render_to_string
from schedule.models import Calendar
from apps.scheduler.serializers import (
    CalendarSerializer,
    AdditionalCalendarInfoSerializer,
)
from django.contrib.auth.models import Permission
from django.utils.text import slugify
from .custom_permissions import IsAdminUser

CENTRAL_AUTH_URL = settings.CENTRAL_AUTH_URL
User = get_user_model()


# NEEDS TESTING
# Gets new access token else should return 401
# to get a new refresh token, login
@api_view(["GET"])
@permission_classes([AllowAny])
def refresh_token_view(request):
    # Access the refresh_token from the cookies sent with the request
    refresh_token = request.COOKIES.get("refresh_token")
    # if not refresh_token:
    #     return Response({"error": "Refresh token not found."}, status=400)

    # Prepare data for TokenRefreshView
    data = {"refresh": refresh_token}
    # Check simplejwt docs if this doesnt work
    serializer = TokenRefreshSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
    except TokenError:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.validated_data, status=status.HTTP_200_OK)


class GetUsers(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return User.objects.all()


def generate_unique_slug(model_class, title):
    """
    django-scheduler models aren't great but i'd rather not touch them/
    This function is here so that the slug field in the Calendar model is unique
    """
    original_slug = slugify(title)
    unique_slug = original_slug
    num = 1
    while model_class.objects.filter(slug=unique_slug).exists():
        unique_slug = "{}-{}".format(original_slug, num)
        num += 1
    return unique_slug


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def signup_view(request):
    """Register view for local authentication"""
    user_data = {
        "first_name": request.data.get("first_name"),
        "last_name": request.data.get("last_name"),
        "email": request.data.get("email"),
        "password": request.data.get("password"),
        "password_confirmation": request.data.get("password_confirmation"),
        "phone_number": request.data.get("phone_number"),
        "institution": request.data.get("institution"),
        # Add other fields as needed
    }
    # Post to app db
    serializer = CreateUserSerializer(data=user_data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    if user:
        # If account creation successful, issue JWT token
        token = RefreshToken().for_user(user)
        drf_response = Response(
            {
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Account creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )


def create_personal_calendar(user):
    calendar_serializer = CalendarSerializer(
        data={
            "name": "Personal Calendar",
            "slug": generate_unique_slug(Calendar, "Personal Calendar"),
        }
    )
    calendar_serializer.is_valid(raise_exception=True)
    calendar_instance = calendar_serializer.save()

    info_cal_serializer = AdditionalCalendarInfoSerializer(
        data={"calendar": calendar_instance.id, "private": True}
    )
    info_cal_serializer.is_valid(raise_exception=True)
    info_cal_instance = info_cal_serializer.save()

    info_cal_instance.users.add(user)
    info_cal_instance.save()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_logged_in_user(request):
    serializer = InstitutionSerializer(instance=request.user)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def logout(request):
    drf_response = Response(status=status.HTTP_200_OK)
    drf_response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
    return drf_response


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def set_password(request):
    serializer = CurrentPasswordSerializer(
        context={"request": request}, data=request.data
    )
    serializer.is_valid(raise_exception=True)
    serializer = PasswordSerializer(context={"request": request}, data=request.data)
    serializer.is_valid(raise_exception=True)
    request.user.set_password(serializer.data["new_password"])
    request.user.save()

    if settings.DJOSER.get("PASSWORD_CHANGED_EMAIL_CONFIRMATION"):
        context = {"user": request.user}
        to = [get_user_email(request.user)]
        subject = "Your password has been changed"
        message = render_to_string("users/password_changed.html", context)

        # Send email using Django's send_mail
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=to,
            fail_silently=False,
            html_message=message,
        )

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([AllowAny])
def central_auth_login_view(request):
    """Login view for a central authentication service"""
    email = request.data.get("email")
    password = request.data.get("password")

    request_data = {
        "operation": "SIGNIN",
        "configs": {},
        "body": {"user": {"email": email, "password": password}},
    }
    # Send credentials to centralized service
    response = requests.put(
        f"{CENTRAL_AUTH_URL}/api/v1/gateway/make",
        json=request_data,
    )
    data = response.json()
    if data["success"]:
        # If valid, issue JWT token
        token = RefreshToken()
        token["user_id"] = data["data"]["user"]["_id"]
        token["merchant_id"] = data["data"]["merchant"]["_id"]
        token["merchant_name"] = data["data"]["merchant"]["businessName"]
        drf_response = Response(
            {
                "refresh": str(token),  # probably dont need
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def central_auth_signup_view(request):
    user_data = {
        "first_name": request.data.get("first_name"),
        "last_name": request.data.get("last_name"),
        "email": request.data.get("email"),
        # Add other fields as needed
    }
    merchant_data = {}

    # Post to app db
    serializer = UserSerializer(data=user_data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    # Post to central user db
    name = user_data.pop("first_name") + " " + user_data.pop("last_name")
    user_data["name"] = name
    user_data["password"] = request.data.get("password")

    request_data = {
        "operation": "SIGNUP",
        "configs": {
            "signup": {
                "genPassword": False,
                "appName": "non-profit sass",
                "option": "BOTH",
            }
        },
        "body": {
            "user": user_data,
            "merchant": merchant_data,
        },
    }

    # Send user data to centralized service for account creation
    response = requests.put(
        f"{CENTRAL_AUTH_URL}/api/v1/gateway/make", json=request_data
    )
    data = response.json()
    if data["success"]:
        # If account creation successful, issue JWT token
        token = RefreshToken()
        token["user_id"] = data["data"]["user"]["_id"]
        token["merchant_id"] = data["data"]["merchant"]["_id"]
        token["merchant_name"] = data["data"]["merchant"]["businessName"]
        drf_response = Response(
            {
                "refresh": str(token),  # probably dont need
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Account creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
@transaction.atomic
def custom_password_reset_view(request):
    email = request.data.get("email")
    user = User.objects.filter(email=email).first()
    if not user:
        return Response(
            {"error": "User with this email does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Generate password reset token and UID
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # Construct the password reset link (to be sent via email)
    reset_link = f"{settings.DOMAIN}/reset-password/{uid}/{token}/"

    # Send an email with the password reset link
    send_mail(
        subject="Password Reset for Your Bsystems Account",
        message=f"Please click the following link to reset your password: {reset_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
    )

    return Response({"message": "Password reset link sent."}, status=status.HTTP_200_OK)


@api_view(["POST"])
@transaction.atomic
def custom_password_reset_confirm_view(request):
    uidb64 = request.data.get("uid")
    token = request.data.get("token")
    new_password = request.data.get("new_password")

    try:
        # Decode the UID
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        # Communicate with the central auth service to reset the password
        reference = user.reference
        response = requests.post(
            f"{CENTRAL_AUTH_URL}/reset-password",
            data={"reference": reference, "new_password": new_password},
        )
        data = response.json()
        if data["success"]:
            return Response({"message": "Password has been reset successfully."})
        else:
            return Response(
                {"error": "Failed to reset password with the central auth service."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
    else:
        return Response(
            {"error": "Invalid UID or token."}, status=status.HTTP_400_BAD_REQUEST
        )


# when creating an institution admin, it will have to be linked to an institution and then when that institution admin
# creates a user, the id of the instituion will be passed in and linked to the


# when you an institution admin and creating a user, every user will have to be linked to an institution of that institution admin
#  and the institution will have to be required.

# an institution is the same as an institution admin
# an institution can create an institution user or user
# a bsystem admin can create another bsystem admin and an institution admin


# first we create an endpoint to create an institution which can will then be an institution admin
@api_view(["POST"])
@transaction.atomic
@permission_classes([AllowAny])
def create_institution_with_admin(request):
    institution_data = {
        "institution_name": request.data.get("institution_name"),
        "institution_email": request.data.get("institution_email"),
        "institution_phone": request.data.get("institution_phone"),
        "contact_person": request.data.get("contact_person"),
        "contact_person_phone": request.data.get("contact_person_phone"),
        # "contact_person_email": request.data.get("contact_person_email"),
        "contact_person_position": request.data.get("contact_person_position"),
    }

    admin_user_data = {
        "email": request.data.get("email"),
        "password": request.data.get("password"),
        "password_confirmation": request.data.get("password_confirmation"),
        "phone_number": request.data.get("phone_number"),
        "user_role": "Admin",
    }

    # Create institution
    institution_serializer = InstitutionSerializer(data=institution_data)
    if institution_serializer.is_valid(raise_exception=True):
        institution = institution_serializer.save()

        # Create admin user and link to institution
        admin_user_data["institution"] = institution.id
        admin_user_serializer = InstitutionAdminSerializer(data=admin_user_data)
        if admin_user_serializer.is_valid(raise_exception=True):
            # set the user_role to admin and save
            admin_user = admin_user_serializer.save()

            # Generate JWT token for admin
            token = RefreshToken.for_user(admin_user)
            response_data = {
                "access": str(token.access_token),
                "institution": institution_serializer.data,
                "admin": InstitutionAdminSerializer(admin_user).data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(
        {"detail": "Institution creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )


# creating a user where the one creating it will have its id linked to it and have role to be populated by frontend
@api_view(["POST"])
@transaction.atomic
@permission_classes([AllowAny])
def create_user(request):

    user_data = {
        "first_name": request.data.get("first_name"),
        "last_name": request.data.get("last_name"),
        "email": request.data.get("email"),
        "password": request.data.get("password"),
        "phone_number": request.data.get("phone_number"),
        "user_role": request.data.get("user_role"),
    }
    try:
        institution = Institution.objects.get(id=request.data.get("institution"))
    except Institution.DoesNotExist:
        return Response(
            {"detail": "Institution not found"}, status=status.HTTP_404_NOT_FOUND
        )
    user_serializer = CreateUserSerializer(data=user_data)
    if user_serializer.is_valid(raise_exception=True):
        user = user_serializer.save(commit=False)
        user.institution = institution
        user.save()

        # Generate JWT token for user
        token = RefreshToken.for_user(user)
        response_data = {
            "access": str(token.access_token),
            "user": UserSerializer(user).data,
            "institution": InstitutionSerializer(institution).data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(
        {"detail": "User creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )


# get all institutions and institution admins
@api_view(["GET"])
@permission_classes([AllowAny])
def get_institutions_and_admins(request):
    institutions = Institution.objects.all()

    response_data = []
    for institution in institutions:
        institution_serializer = InstitutionSerializer(institution)
        admin_user = User.objects.filter(institution=institution).first()
        admin_user_serializer = InstitutionAdminSerializer(admin_user)

        institution_data = institution_serializer.data
        institution_data["admin"] = admin_user_serializer.data
        response_data.append(institution_data)

    return Response(response_data, status=status.HTTP_200_OK)


# disable institution and there admins and edit,update institution and their admins


# edit institutions and admins and update institution and their admins
@api_view(["PUT"])
def disable_institutions_and_admins(request):
    institution_data = request.data.get("institution_data")
    admin_data = request.data.get("admin_data")
    if institution_data:
        try:
            institution = Institution.objects.get(id=institution_data)
            institution_data.is_active = False
            institution_data.save()

            admin = institution.users.all()
            admin.update(is_active=False)
            return Response({"message": "Insitution and all users have been didsabled"})
        except Institution.DoesNotExist:
            return Response(
                {"detail": "Institution not found"}, status=status.HTTP_404_NOT_FOUND
            )
    elif admin_data:
        try:
            admin_user = User.objects.get(id=admin_data)
            admin_user.is_active = False
            admin_user.save()
            return Response({"message": "User has been disabled"})
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

    return Response(
        {"message": "No data found to disable"}, status=status.HTTP_404_NOT_FOUND
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """Login view for local authentication"""
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(
        request,
        email=email,
        password=password,
    )

    if user and user.is_active:
        # If valid, issue JWT token
        token = RefreshToken().for_user(user)
        drf_response = Response(
            {
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
    )


# login view for institution admin
