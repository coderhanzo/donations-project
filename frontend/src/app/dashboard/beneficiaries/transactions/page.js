'use client'

import HealthCareModal from "../../_components/HealthCareModal"
import AnimalCareModal from "../../_components/AnimalCareModal"
import SocialWelfareModal from "../../_components/SocialWelfareModal"
import EmergencyReliefModal from "../../_components/EmergencyReliefModal"
import EducationModal from "../../_components/EducationModal"
import EnvironmentalProtectionModal from "../../_components/EnvironmentalProtectionModal"
import CommunityDevelopmentModal from "../../_components/CommunityDevelopmentModal"
import PatientTransactionsTable from "../../_components/TransactionsTable"
import AddPatientsModal from "../../campaigns/components/AddPatientsModal"
import DisabilityModal from "../../_components/DisabilityModal"
import PatientSupportModal from "../../_components/PatientSupportModal"
import { useState } from "react"

const PatientTransactionsPage = () => {
    const [isEducationModalOpen, setisEducationModalOpen] = useState (false);
    const [isHealthCareModalOpen, setisHealthCareModalOpen] = useState(false);
    const [isAnimalCareModalOpen, setisAnimalCareModalOpen] = useState(false);
    const [isSocialWelfareModalOpen, setisSocialWelfareModalOpen] = useState(false);
    const [isEmergencyReliefModalOpen, setisEmergencyReliefModalOpen] = useState(false);
    const [isEnvironmentalProtectionModalOpen, setisEnvironmentalProtectionModalOpen] = useState(false);
    const [isCommunityDevelopmentModalOpen, setisCommunityDevelopmentModalOpen] = useState(false);
    const [isDisabilityModalOpen, setisDisabilityModalOpen] = useState(false);
    const [isPatientSupportModalOpen, setisPatientSupportModalOpen] = useState(false);
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <PatientTransactionsTable 
            onEducationAddClick = {() => setisEducationModalOpen(true)}
            onHealthCareAddClick = {() => setisHealthCareModalOpen(true)}
            onAnimalCareAddClick = {() => setisAnimalCareModalOpen(true)}
            onSocialWelfareAddClick = {() => setisSocialWelfareModalOpen(true)}
            onEmergencyReliefAddClick = {() => setisEmergencyReliefModalOpen(true)}
            onEnvironmentalProtectionAddClick = {() => setisEnvironmentalProtectionModalOpen(true)}
            onCommunityDevelopmentAddClick = {() => setisCommunityDevelopmentModalOpen(true)}
            onDisabilityAddClick = {() => setisDisabilityModalOpen(true)}
            onPatientSupportAddClick = {() => setisPatientSupportModalOpen(true)}/>
            
            <EducationModal
            isOpen={isEducationModalOpen}
            onClose={() => setisEducationModalOpen(false)}/>
            <HealthCareModal
            isOpen={isHealthCareModalOpen}
            onClose={() => setisHealthCareModalOpen(false)}/>
            <AnimalCareModal
            isOpen={isAnimalCareModalOpen}
            onClose={() => setisAnimalCareModalOpen(false)}/>
            <SocialWelfareModal
            isOpen={isSocialWelfareModalOpen}
            onClose={() => setisSocialWelfareModalOpen(false)}/>
            <EmergencyReliefModal
            isOpen={isEmergencyReliefModalOpen}
            onClose={() => setisEmergencyReliefModalOpen(false)}/>
            <EnvironmentalProtectionModal
            isOpen={isEnvironmentalProtectionModalOpen}
            onClose={() => setisEnvironmentalProtectionModalOpen(false)}/>
            <CommunityDevelopmentModal
            isOpen={isCommunityDevelopmentModalOpen}
            onClose={() => setisCommunityDevelopmentModalOpen(false)}/>
            <DisabilityModal
            isOpen={isDisabilityModalOpen}
            onClose={() => setisDisabilityModalOpen(false)}/>
            <PatientSupportModal
            isOpen={isPatientSupportModalOpen}
            onClose={() => setisPatientSupportModalOpen(false)}/>
        </div>
    )
}

export default PatientTransactionsPage