'use client'
import InstitutionSettingsModal from "../_components/AuthSettingsModal";
import InstitutionSettingsTable from "../_components/AuthSettingsTable";
import InstitutionStatusModal from "../_components/AuthStatusModal";
import { useState } from "react";

const InstitutionSettings = () => {
    const [isInstitutionSettingsModalOpen, setisInstitutionSettingsModalOpen] = useState(false);
    const [isInstitutionStatusModalOpen, setisInstitutionStatusModalOpen] = useState(false);
    
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <InstitutionSettingsTable itemsPerPage ={10}
             onInstitutionSettingsClick = {() => setisInstitutionSettingsModalOpen(true)}
             onInstitutionStatusClick = {() => setisInstitutionStatusModalOpen(true)}/>
            
            <InstitutionSettingsModal
            isOpen={isInstitutionSettingsModalOpen}
            onClose={()=>setisAuthSettingsModalOpen(false)}/>
            
            <InstitutionStatusModal
            isOpen={isInstitutionStatusModalOpen}
            onClose={() => setisAuthStatusModalOpen(false)}/>
        </div>
    )
}
export  default InstitutionSettings;