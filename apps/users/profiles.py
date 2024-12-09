# this will serve as the profile for any other user type, in this cause a user and bsystems admin

from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
import uuid


class BsystemsUser(models.Model):
  id = models.UUIDField(
    primary_key=True, unique=True, default=uuid.uuid4, editable=False
  )
  user = models.OneToOneField(
    "users.User",
    on_delete=models.CASCADE,
    related_name="bsystem_user",
    blank=True,
    null=True,
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.user.email