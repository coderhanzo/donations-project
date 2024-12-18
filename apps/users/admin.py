from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User, Institution


class UserAdmin(BaseUserAdmin):
    ordering = ["last_name"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = [
        "id",
        "email",
        "first_name",
        "last_name",
        "is_active",
        # "user_role",
    ]
    list_display_links = [
        "id",
        "email",
    ]  # "roles"
    list_filter = [
        "email",
        "first_name",
        "last_name",
        "phone_number",
        # "is_staff",
        "is_active",
        # "user_role",
    ]
    fieldsets = (
        (
            _("Login Credentials"),
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            _("Personal Information"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "phone_number",
                    "timezone",
                )
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important Dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "groups",
                    "user_permissions",
                    "user_role",
                ),
            },
        ),
    )
    search_fields = ["email", "first_name", "last_name", "phone_number", "user_role"]


admin.site.register(User, UserAdmin)
admin.site.register(Institution)
