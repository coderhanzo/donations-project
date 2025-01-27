'use client'
import AuthPasswordModal from "../_components/AuthSettingsPasswordModal";
import AuthSettingsModal from "../_components/AuthSettingsModal";
import AuthSettingsTable from "../_components/AuthSettingsTable";
import AuthStatusModal from "../_components/AuthStatusModal";
import { useState } from "react";

const AuthSettings = () => {
    const [isAuthSettingsModalOpen, setisAuthSettingsModalOpen] = useState(false);
    const [isAuthStatusModalOpen, setisAuthStatusModalOpen] = useState(false);
    const [isAuthPasswordModalOpen, setisAuthPasswordModalOpen] = useState(false);

    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <AuthSettingsTable itemsPerPage ={10}
             onAuthSettingsClick = {() => setisAuthSettingsModalOpen(true)}
             onAuthPasswordClick = {() => setisAuthPasswordModalOpen(true)}
             onAuthStatusClick = {() => setisAuthStatusModalOpen(true)}/>
            
            <AuthSettingsModal
            isOpen={isAuthSettingsModalOpen}
            onClose={()=>setisAuthSettingsModalOpen(false)}/>
            
            <AuthPasswordModal
            isOpen={isAuthPasswordModalOpen}
            onClose={()=> setisAuthPasswordModalOpen(false)}/>
            
            <AuthStatusModal
            isOpen={isAuthStatusModalOpen}
            onClose={() => setisAuthStatusModalOpen(false)}/>
        </div>
    )
}
export  default AuthSettings;