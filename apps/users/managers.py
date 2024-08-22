from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def email_validator(self, contact_person_email):
        try:
            validate_email(contact_person_email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email address"))

    def create_user(self, contact_person_email, password=None, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if contact_person_email:
            contact_person_email = self.normalize_email(contact_person_email)
            self.email_validator(contact_person_email)
        else:
            raise ValueError(_("Base User Account: An email address is required"))
        user = self.model(contact_person_email=contact_person_email, **extra_fields)
        if password:
            user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superusers must have is_staff=True"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superusers must have is_superuser=True"))
        if not password:
            raise ValueError(_("Superusers must have a password"))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Admin Account: An email address is required"))

        user = self.create_user(email, password, **extra_fields)
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, email):
        """
        This method makes email login to admin case-insensitive
        """
        return self.get(email__iexact=email)
