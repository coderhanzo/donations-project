from django.db import models
from apps.contact_analytics.models import AccountProfile
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from utils.hash_photo import calculate_file_hash
from apps.users.models import Institution


User = get_user_model()


# from .cause import Cause
class Cause(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Cause"


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    goal = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(blank=True, null=True)
    subscribers = models.ManyToManyField(
        AccountProfile, blank=True, related_name="subscribed_campaigns"
    )
    is_active = models.BooleanField(default=True)
    causes = models.ManyToManyField(Cause, blank=True, related_name="campaigns")
    # i have this as many to many cause you might have a fund that supports multiple patients or something
    created_by = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.PROTECT, related_name="campaigns"
    )
    last_edited = models.DateTimeField(auto_now=True)
    last_edited_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name="edited_campaigns",
    )
    institution = models.ForeignKey(
        Institution, blank=True, null=True, on_delete=models.CASCADE
    )

    @property
    def beneficiaries(self):
        all_beneficiaries = []

        for key in [
            "EDUCATIONAL_INSTITUTION",
            "HEALTHCARE_INSTITUTION",
            "HEALTHCARE_PATIENT",
            "ANIMAL",
            "SOCIAL_WELFARE_PROGRAM",
            "EMERGENCY_RELIEF",
            "ENVIRONMENTAL_PROTECTION",
            "COMMUNITY_DEVELOPMENT",
            "DISABILITY_SUPPORT",
        ]:
            beneficiary_relation = getattr(self, key, None)
            if beneficiary_relation is not None:
                all_beneficiaries.extend(
                    [(key, instance) for instance in beneficiary_relation.all()]
                )
        return all_beneficiaries

    def __str__(self):
        return self.name


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/institution_<id>/campaign_photos/<filename>
    return "institution_{0}/campaign_photos/{1}".format(instance.institution, filename)


class Photo(models.Model):
    file = models.FileField(upload_to=user_directory_path)
    hash_key = models.CharField(max_length=64, blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="photos"
    )
    institution = models.UUIDField(blank=True, null=True)

    class Meta:
        unique_together = ("hash_key", "institution")


class HealthcarePatient(models.Model):

    SUPPORT_TYPE_CHOICES = [
        ("MEDICAL TREATMENT", "Medical Treatment"),
        ("THERAPY MEDICATION", "Therapy Medication"),
    ]
    profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        default=None,
        related_name="patient_profile",
    )
    # health_conditions = models.CharField(
    #     max_length=50, choices=SPECIFIC_HEALTH_CONDITION_TYPE_CHOICES
    # )
    hospital = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    illness = models.CharField(max_length=255, blank=True, null=True)
    number_of_patients_benefiting = models.IntegerField(
        default=0, blank=True, null=True
    )
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="HEALTHCARE_PATIENT"
    )

    def __str__(self):
        return self.profile.name


class EducationalInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("PRIMARY", "Primary"),
        ("SECONDARY", "Secondary"),
        ("UNIVERSITY", "University"),
        ("ORPHANAGE", "Orphanage"),
    ]
    EDUCATIONAL_NEEDS_CHOICES = [
        ("BOOKS", "Books"),
        ("SCHOLARSHIP", "Scholarship"),
        ("INFRASTRUCTURE", "Infrastructure"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    number_of_students = models.IntegerField(default=0)
    programs_offered = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    state = models.TextField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    accreditation_details = models.TextField(blank=True, null=True)
    educational_needs = models.CharField(
        max_length=50, choices=EDUCATIONAL_NEEDS_CHOICES, blank=True, null=True
    )
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="EDUCATIONAL_INSTITUTION"
    )
    other_info = models.TextField(blank=True, null=True)

    @property
    def get_full_location(self):
        return f"{self.address}, {self.city}, {self.state}"


class HealthcareInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("HOSPITAL EQUIPMENT", "Hospital Equipment"),
        ("PATIENT CARE", "Patient Care"),
        ("HEALTH CENTER", "Health Center"),
        ("SENIOR HOMES", "Senior Homes"),
        ("MEDICAL SUPPLIES", "Medical Supplies"),
    ]
    SPECIFIC_HEALTH_CONDITION_TYPE_CHOICES = [
        ("CANCER", "Cancer"),
        ("DIABETES", "Diabetes"),
        ("GENERAL_HEALTH_SUPPORT", "General Health Support"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    health_condition = models.CharField(
        max_length=50,
        choices=SPECIFIC_HEALTH_CONDITION_TYPE_CHOICES,
        blank=True,
        null=True,
    )

    number_of_beds = models.IntegerField(default=0)
    number_of_patients_benefiting = models.IntegerField(default=0)
    specializations = models.TextField(blank=True, null=True)
    operating_hours = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="HEALTHCARE_INSTITUTION"
    )


class AnimalCare(models.Model):
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    SPECIES_CHOICES = [
        ("CAT", "Cat"),
        ("DOG", "Dog"),
        ("WILDLIFE", "Wildlife"),
        ("OTHER", "Other"),
    ]
    # Maybe use a choices
    health_status = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    special_needs = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="ANIMAL"
    )
    others = models.TextField(blank=True, null=True)


class SocialWelfareProgram(models.Model):
    PROGRAM_TYPE_CHOICES = [
        ("FOOD AID", "Food Aid"),
        ("SHELTER", "Shelter"),
        ("EDUCATION", "Education"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    program_name = models.CharField(max_length=255)  # possible remove
    program_type = models.CharField(max_length=50, choices=PROGRAM_TYPE_CHOICES)
    target_population = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    key_activities = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="SOCIAL_WELFARE_PROGRAM"
    )


class EmergencyRelief(models.Model):
    RELIEF_TYPE_CHOICES = [
        ("NATURAL DISASTER", "Natural Disaster"),
        ("CONFLICT", "Conflict"),
        ("PANDEMIC", "Pandemic"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    relief_type = models.CharField(max_length=50, choices=RELIEF_TYPE_CHOICES)
    area_covered = models.TextField(blank=True, null=True)
    contact_organization = models.TextField(blank=True, null=True)  # possible remove
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)
    relief_timeline = models.TextField(blank=True, null=True)
    other_info = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="EMERGENCY_RELIEF"
    )


class EnvironmentalProtection(models.Model):
    CONSERVATION_TYPE_CHOICES = [
        ("REFORESTATION", "Reforestation"),
        ("WEILDLIFE PROTECTION", "Wildlife Protection"),
        ("CLEAN WATERS", "Clean Waters"),
    ]
    ENVIRONMENTAL_GOALS_CHOICES = [
        ("PLANTING TREES", "Planting Trees"),
        ("REDUCING POLLUTION", "Reducing Pollution"),
    ]
    RESOURCES_REQUIRED = [
        ("VOLUNTEER", "Volunteer"),
        ("FUNDING", "Funding"),
        ("EQUIPMENT", "Equipment"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)  # possible remove
    project_name = models.CharField(max_length=255)  # possible remove
    location = models.TextField(blank=True, null=True)
    conservation_type = models.CharField(
        max_length=50, choices=CONSERVATION_TYPE_CHOICES
    )
    environmental_goals = models.CharField(
        max_length=50, choices=ENVIRONMENTAL_GOALS_CHOICES, blank=True, null=True
    )
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="ENVIRONMENTAL_PROTECTION"
    )


class CommunityDevelopment(models.Model):
    TARGET_COMMUNITY_CHOICES = [
        ("RURAL", "Rural"),
        ("URBAN", "Urban"),
        ("INDIGENOUS", "Indigenous"),
    ]
    DEVELOPMENT_TYPE = [
        ("INFRASTRUCTURE", "Infrastructure"),
        ("EDUCATION", "Education"),
        ("HEALTHCARE", "Healthcare"),
    ]
    SPECIFIC_DEVELOPMENT_CHOICES = [
        ("CONSTRUCTION", "Construction"),
        ("TRAINING PROGRAMS", "Training Programs"),
        ("FUNDING", "Funding"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    community = models.CharField(
        max_length=255, choices=TARGET_COMMUNITY_CHOICES, blank=True, null=True
    )  # possible remove
    community_name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    key_objectives = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="COMMUNITY_DEVELOPMENT"
    )


class DisabilitySupport(models.Model):
    SUPPORT_TYPE_CHOICES = [
        ("FINANCIAL AID", "Financial Aid"),
        ("EQUIPMENT", "Equipment"),
        ("TRAINING", "Training"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    support_type = models.CharField(max_length=50, choices=SUPPORT_TYPE_CHOICES)
    organization_name = models.CharField(max_length=255)  # possible remove
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="DISABILITY_SUPPORT"
    )
