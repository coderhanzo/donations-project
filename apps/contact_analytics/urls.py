from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path("uploadcsv/", views.CSVUploadView.as_view(), name="CSVUpload"),
    path("add-contact/", views.addContact.as_view()),
    path("edit-contact/", views.editContact.as_view()),
    path("get-contacts/", views.GetContacts.as_view()),
    path("delete-contact/", views.delete_contact),
]
