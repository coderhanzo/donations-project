from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("password-reset/", views.custom_password_reset_view),
    path("password-confirm/", views.custom_password_reset_confirm_view),
    path("jwt/refresh/", views.refresh_token_view, name="jwt-refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="jwt-verify"),
    path("jwt/login/", views.login_view, name="login"),
    path("users/create/", views.signup_view, name="create-account"),
    path("users/user/", views.signup_view, name="register_user"),

    path("jwt/create/", views.login_view, name="login"),
    path("users/", views.signup_view, name="register"),

    path("users/me/", views.get_logged_in_user, name="get_logged_in"),
    path("users/logout/", views.logout, name="logout"),
    path("users/set_password/", views.set_password),
    path("users/all/", views.GetUsers.as_view()),
]
