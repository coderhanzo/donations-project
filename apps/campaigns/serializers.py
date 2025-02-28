from rest_framework import serializers
from .models import (
    Cause,
    Campaign,
    HealthcarePatient,
    EducationalInstitution,
    HealthcareInstitution,
    AnimalCare,
    SocialWelfareProgram,
    EmergencyRelief,
    EnvironmentalProtection,
    CommunityDevelopment,
    DisabilitySupport,
    Photo,
)


class CauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cause
        fields = "__all__"


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcarePatient
        fields = "__all__"


class EducationalInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalInstitution
        fields = "__all__"


class HealthcareInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcareInstitution
        fields = "__all__"


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalCare
        fields = "__all__"


class SocialWelfareProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialWelfareProgram
        fields = "__all__"


class EmergencyReliefSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyRelief
        fields = "__all__"


class EnvironmentalProtectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalProtection
        fields = "__all__"


class CommunityDevelopmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityDevelopment
        fields = "__all__"


class DisabilitySupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilitySupport
        fields = "__all__"


model_mapping = {
    "EDUCATIONAL_INSTITUTION": (
        EducationalInstitution,
        EducationalInstitutionSerializer,
    ),
    "HEALTHCARE_INSTITUTION": (HealthcareInstitution, HealthcareInstitutionSerializer),
    "HEALTHCARE_PATIENT": (HealthcarePatient, PatientSerializer),
    "ANIMAL": (AnimalCare, AnimalSerializer),
    "SOCIAL_WELFARE_PROGRAM": (SocialWelfareProgram, SocialWelfareProgramSerializer),
    "EMERGENCY_RELIEF": (EmergencyRelief, EmergencyRelief),
    "ENVIRONMENTAL_PROTECTION": (EnvironmentalProtection, EnvironmentalProtection),
    "COMMUNITY_DEVELOPMENT": (CommunityDevelopment, CommunityDevelopment),
    "DISABILITY_SUPPORT": (DisabilitySupport, DisabilitySupportSerializer),
}


class CampaignSerializer(serializers.ModelSerializer):
    beneficiaries = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Campaign
        fields = "__all__"
        extra_kwargs = {
            "is_active": {"read_only": True},
        }

    # def __init__(self, *args, **kwargs):
    #     super(MonetarySerializer, self).__init__(*args, **kwargs)
    #     if (
    #         self.context["request"].user.roles == "Institution Admin"
    #         or self.context["request"].user.roels == "Admin"
    #     ):
    #         self.fields["is_active"].read_only = False

    def get_beneficiaries(self, obj):
        ben_list = []
        for key, ben in obj.beneficiaries:
            serializer = model_mapping[key][1](instance=ben)
            ben_list.append(serializer.data)
        return ben_list
