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
    name = models.CharField(
        max_length=255, verbose_name="Institution Name", blank=True, null=True
    )
    email = models.EmailField(
        max_length=255,
        verbose_name="Institution Email",
        blank=True,
        null=True,
        unique=True,
    )
    phone = models.CharField(
        max_length=255, verbose_name="Institution Phone", blank=True, null=True
    )
    contact_person = models.CharField(
        max_length=255, verbose_name="Contact Person", blank=True, null=True
    )
    contact_person_phone = models.CharField(
        max_length=200, verbose_name="Contact Person Phone", blank=True, null=True
    )
    contact_person_email = models.EmailField(
        max_length=200, verbose_name="Contact Person email", blank=True, null=True
    )
    contact_person_position = models.CharField(
        max_length=150, verbose_name="Contact Person Position", blank=True, null=True
    )

    def user_directory_path(instance, filename):
        # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
        return "{0}/{1}".format("mosque files", filename)

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
        return f"{self.name} {self.id}"


class User(AbstractUser):
    """
    Use <user>.tasks.all() to get tasks assigned to this user
    Use <user>.my_created_tasks.all() to get all task assigned by this user
    """

    username = None
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50)
    email = models.EmailField(verbose_name=_("Email Address"), unique=True)
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"), max_length=30, blank=True, null=True
    )

    reference = models.CharField(
        verbose_name=_("Account Reference"), max_length=250, blank=True, null=True
    )
    institution = models.ForeignKey(
        Institution,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name="users",
    )
    timezone = models.CharField(max_length=50, default="UTC")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "phone_number",
        "institution",
    ]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    # class Roles(models.TextChoices):
    #     BSYTEMS_ADMIN = "bsystems_admin", _("Bsystems Admin")
    #     INSTITUTION_ADMIN = "institution_admin", _("Institution Admin")
    #     USER = "user", _("User")

    # add type car owner, admin, parking attendant


# roles = models.CharField(
#     verbose_name=_("Roles"),
#     max_length=50,
#     choices=Roles.choices,
#     default=Roles.USER,
# )
