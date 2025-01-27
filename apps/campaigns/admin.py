from django.contrib import admin
from .models import (
    HealthcarePatient,
    Campaign,
    Cause,
    HealthcareInstitution,
    CommunityDevelopment,
    DisabilitySupport,
    AnimalCare,
    EducationalInstitution,
    SocialWelfareProgram,
    EmergencyRelief,
    EnvironmentalProtection,
    Photo,
)


class HealthcareInstitutionAdmin(admin.ModelAdmin):
    list_display = [
        "id",
    ]

    class Meta:
        model = HealthcareInstitution


# Register your models here.
admin.site.register(Campaign)
admin.site.register(HealthcarePatient)
admin.site.register(Cause)
admin.site.register(HealthcareInstitution, HealthcareInstitutionAdmin)
admin.site.register(CommunityDevelopment)
admin.site.register(DisabilitySupport)
admin.site.register(AnimalCare)
admin.site.register(EducationalInstitution)
admin.site.register(SocialWelfareProgram)
admin.site.register(EmergencyRelief)
admin.site.register(EnvironmentalProtection)
admin.site.register(Photo)
