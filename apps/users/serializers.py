from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, status
from phonenumber_field.serializerfields import PhoneNumberField
import django.contrib.auth.password_validation as validations
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from djoser.serializers import UserCreateSerializer
from .models import Institution

User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirmation = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        password = data.pop("password")
        password_confirmation = data.pop("password_confirmation")

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Passwords do not match"}
            )

        try:
            validations.validate_password(password=password)

        except ValidationError as err:
            raise serializers.ValidationError({"password": err.messages})

        data["password"] = make_password(password)
        return data

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            "id",
            "email",
            "phone_number",
            "password",
            "institution",
            "user_role",
        ]

    # extra_kwargs = {"password": {"write_only": True}}


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(source="get_full_name")
    # phone_number = PhoneNumberField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "institution",
            "user_role",
        ]

    def get_full_name(self, obj):
        return obj.get_full_name

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# def to_representation(self, instance):
#     representation = super(UserSerializer, self).to_representation(instance)
#     if instance.is_superuser:
#         representation["admin"] = True
#     return representation




class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField(read_only=True)
    token_class = RefreshToken

    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])

        data = {"access": str(refresh.access_token)}
        if settings.SIMPLE_JWT.get("ROTATE_REFRESH_TOKENS"):
            if settings.SIMPLE_JWT.get("BLACKLIST_AFTER_ROTATION"):
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"


class InstitutionAdminSerializer(UserCreateSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop("password")
        password_confirmation = data.pop("password_confirmation")

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Passwords do not match"}
            )

        try:
            validations.validate_password(password=password)

        except ValidationError as err:
            raise serializers.ValidationError({"password": err.messages})

        data["password"] = make_password(password)
        return data

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            "id",
            "email",
            "phone_number",
            "institution",
            "user_role",
            "is_active",
            "password",
            "password_confirmation",
        ]
