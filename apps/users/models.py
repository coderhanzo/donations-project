from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from phonenumber_field.modelfields import PhoneNumberField
from schedule.models import Calendar
import uuid

# Create your models here.


class Institution(models.Model):
    id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, editable=False
    )
    institution_name = models.CharField(
        max_length=255, verbose_name="Institution Name", blank=True, null=True
    )
    institution_email = models.EmailField(
        max_length=255,
        verbose_name="Institution Email",
        blank=True,
        null=True,
        unique=True,
    )
    institution_phone = PhoneNumberField(
        verbose_name=_("Phone Number"), max_length=30, blank=True, null=True
    )
    contact_person = models.CharField(
        max_length=255, verbose_name="Contact Person", blank=True, null=True
    )
    contact_person_phone = models.CharField(
        max_length=200, verbose_name="Contact Person Phone", blank=True, null=True
    )
    # contact_person_email = models.EmailField(
    #     max_length=200, verbose_name="Contact Person email", blank=True, null=True
    # )
    contact_person_position = models.CharField(
        max_length=150, verbose_name="Contact Person Position", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)

    def user_directory_path(instance, filename):
        return "institution-files/{filename}".format(filename=filename)

    institution_certificate = models.FileField(
        upload_to=user_directory_path,
        verbose_name="Institution Certificate",
        blank=True,
        null=True,
    )
    institution_license = models.FileField(
        upload_to=user_directory_path,
        verbose_name="Institution License",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.institution_name} {self.id}"


class User(AbstractUser):
    """
    Use <user>.tasks.all() to get tasks assigned to this user
    Use <user>.my_created_tasks.all() to get all task assigned by this user
    """

    username = None
    # is_superuser = None
    # is_staff = None
    # first_name = None
    # last_name = None
    first_name = models.CharField(
        verbose_name=_("First Name"), max_length=255, blank=True
    )
    last_name = models.CharField(
        verbose_name=_("Last Name"), max_length=255, blank=True
    )
    email = models.EmailField(
        max_length=200,
        unique=True,
        verbose_name="Contact Person email",
        blank=True,
        null=True,
    )
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"), max_length=30, blank=True, null=True
    )
    institution = models.ForeignKey(
        Institution,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name="users",
        verbose_name=_("user_institution"),
    )
    user_role = models.CharField(max_length=255, blank=True, null=True)
    last_login = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    timezone = models.CharField(max_length=50, default="UTC", blank=True, null=True)
    password_confirmation = models.CharField(
        max_length=26, blank=True, null=True, verbose_name="Password Confirmation"
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "phone_number",
        # "institution",
    ]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
