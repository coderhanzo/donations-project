// CustomSidebar.js

'use client'
import { useState } from "react"
import CustomSidebarLink from "./CustomSidebarLink"
import { FaHome } from 'react-icons/fa'
import { CiCalendarDate } from 'react-icons/ci'
import { LuUsers2, LuX, LuScatterChart, LuKanbanSquareDashed, LuUser2, LuHeart, LuHeartHandshake, LuClipboardEdit,LuTornado, LuSettings, LuSettings2, LuUserCircle, LuUserPlus} from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import SidebarAccordian from "./SidebarAccordian"
import { toggleSidebar, toggleTasksDropdown, toggleInstitutionDropdown, toggleSettingsDropdown,toggleAuthMenuDropdown } from "../lib/features/dropdown/dropdownSlice"
import { toggleSelectedTab } from "../lib/features/profile/profileSlice"

const CustomSidebar = () => {
    const dispatch = useDispatch()

    const { sidebarOpen, tasksOpen, institutionOpen, settingsOpen,authMenuOpen } = useSelector((state) => state.dropdowns)
   
    const handleProfileClick = () => {
        dispatch(toggleSelectedTab(3))
        localStorage.setItem('selectedTab', 3)
    }


    return (
        <>
            <aside className={`fixed top-0 z-30 flex h-screen flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 w-[290px] min-w-[225px] ${sidebarOpen ? ' translate-x-0' : '-translate-x-full '} overflow-y-scroll`}>
                <div className="p-3 flex flex-row place-items-center justify-between">
                    <h1 className="text-white p-3 text-xl ">NGO Admin</h1>
                    <LuX className="lg:hidden scale-[1.5] text-white cursor-pointer" onClick={() => dispatch(toggleSidebar())} />
                </div>

                <div>
                    <div className="p-6">
                        <h2 className="text-white text-md font-bold">MENU</h2>
                    </div>
                    <div className="py-6 ">
                        <CustomSidebarLink title="Dashboard" icon={<FaHome className="scale-[1.5]" />} href="/dashboard" />
                        <CustomSidebarLink title="Calendar" icon={<CiCalendarDate className="scale-[1.75]" />} href="/dashboard/calendar" />
                        <CustomSidebarLink title="Donors" icon={<LuUsers2 className="scale-[1.75] stroke-1" />} href="/dashboard/contacts" />
                        <CustomSidebarLink title="Beneficiaries" icon={<LuHeart className="scale-[1.5] stroke-1" />} href="/dashboard/beneficiaries/transactions" />
                        <CustomSidebarLink title="Analytics" icon={<LuScatterChart className="scale-[1.5] stroke-1" />} href="/dashboard/analytics" />
                        <CustomSidebarLink title="Campaigns" icon={<LuHeartHandshake className="scale-[1.55] stroke-1" />} href={`/dashboard/campaigns`} />
                        <SidebarAccordian
                            title="Tasks"
                            subtitles={["Kanban", "Appointments"]}
                            icons={[<LuKanbanSquareDashed className="scale-[1.5]" />, <LuTornado className="scale-[1.5]" />]}
                            toggleAction={toggleTasksDropdown}
                            isOpen={tasksOpen}
                        />
                        <SidebarAccordian
                            title="Auth Menu"
                            subtitles={["Add New User", "Manage Users"]}
                            icons={[<LuUserPlus className="scale-[1.5]" />, <LuClipboardEdit className="scale-[1.5]" />]}
                            toggleAction={toggleAuthMenuDropdown}
                            isOpen={authMenuOpen}
                        />
                        <SidebarAccordian
                            title="Institutions"
                            subtitles={["Add Institution", "Manage Institutions"]}
                            icons={[<LuUserPlus className="scale-[1.5]" />, <LuClipboardEdit className="scale-[1.5]" />]}
                            toggleAction={toggleInstitutionDropdown}
                            isOpen={institutionOpen}    
                        />
                        <SidebarAccordian
                            title="Settings"
                            subtitles={["Auth", "Institutions", "General Settings"]}
                            icons={[<LuUserCircle className="scale-[1.5]" />, <LuSettings2 className="scale-[1.5]" />, <LuSettings className="scale-[1.5]"/>]}
                            toggleAction={toggleSettingsDropdown}
                            isOpen={settingsOpen}
                        />
                        <CustomSidebarLink title="Profile" icon={<LuUser2 className="scale-[1.5] stroke-1" />} href="/dashboard/profile" click={handleProfileClick} />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default CustomSidebar;
