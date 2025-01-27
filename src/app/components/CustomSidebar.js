'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import {
    LuUsers2, LuX, LuScatterChart, LuKanbanSquareDashed,
    LuUser2, LuHeart, LuHeartHandshake, LuClipboardEdit, LuTornado,
    LuSettings, LuSettings2, LuUserCircle, LuUserPlus
} from "react-icons/lu";
import SidebarAccordian from "./SidebarAccordian";
import CustomSidebarLink from "./CustomSidebarLink";
import {
    toggleSidebar, toggleTasksDropdown, toggleInstitutionDropdown,
    toggleSettingsDropdown, toggleAuthMenuDropdown
} from "../lib/features/dropdown/dropdownSlice";
import { toggleSelectedTab } from "../lib/features/profile/profileSlice";
import apiClient from "../../apiClient";

const CustomSidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 

    const { sidebarOpen, tasksOpen, institutionOpen, settingsOpen, authMenuOpen } = useSelector((state) => state.dropdowns);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                router.push('/auth/login');
                return;
            }

            try {
                const response = await apiClient.get('http://13.244.68.8:8000/api/auth/users/me/', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setIsAuthenticated(true); // Token is valid
                } else {
                    router.push('/auth/login'); // Invalid token
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                router.push('/auth/login'); // Redirect on error
            } finally {
                setLoading(false); // Stop loading after verification
            }
        };

        verifyToken();
    }, [router]);

    const handleProfileClick = () => {
        dispatch(toggleSelectedTab(3));
        localStorage.setItem('selectedTab', 3);
    };

    if (loading) {
        return (
            null
        );
    }

    if (!isAuthenticated) {
        return null;
    }
    return (
        <aside
            className={`fixed top-0 z-30 flex h-screen flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 w-[290px] min-w-[225px] ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } overflow-y-scroll`}
        >
            <div className="p-3 flex flex-row place-items-center justify-between">
                <h1 className="text-white p-3 text-xl">NGO Admin</h1>
                <LuX className="lg:hidden scale-[1.5] text-white cursor-pointer" onClick={() => dispatch(toggleSidebar())} />
            </div>

            <div className="p-6">
                <h2 className="text-white text-md font-bold">MENU</h2>
            </div>

            <div className="py-6">
                <CustomSidebarLink title="Dashboard" icon={<FaHome className="scale-[1.5]" />} href="/dashboard" />
                <CustomSidebarLink title="Calendar" icon={<CiCalendarDate className="scale-[1.75]" />} href="/dashboard/calendar" />
                <CustomSidebarLink title="Donors" icon={<LuUsers2 className="scale-[1.75] stroke-1" />} href="/dashboard/contacts" />
                <CustomSidebarLink title="Beneficiaries" icon={<LuHeart className="scale-[1.5] stroke-1" />} href="/dashboard/beneficiaries/transactions" />
                <CustomSidebarLink title="Analytics" icon={<LuScatterChart className="scale-[1.5] stroke-1" />} href="/dashboard/analytics" />
                <CustomSidebarLink title="Campaigns" icon={<LuHeartHandshake className="scale-[1.55] stroke-1" />} href="/dashboard/campaigns" />

                <SidebarAccordian
                    title="Tasks"
                    subtitles={["Donor Pipeline", "Appointments"]}
                    icons={[
                        <LuKanbanSquareDashed key="kanban" className="scale-[1.5]" />,
                        <LuTornado key="appointments" className="scale-[1.5]" />
                    ]}
                    toggleAction={toggleTasksDropdown}
                    isOpen={tasksOpen}
                />
                <SidebarAccordian
                    title="Auth Menu"
                    subtitles={["Add New User", "Manage Users"]}
                    icons={[
                        <LuUserPlus key="addUser" className="scale-[1.5]" />,
                        <LuClipboardEdit key="manageUsers" className="scale-[1.5]" />
                    ]}
                    toggleAction={toggleAuthMenuDropdown}
                    isOpen={authMenuOpen}
                />
                <SidebarAccordian
                    title="Institutions"
                    subtitles={["Add Institution", "Manage Institutions"]}
                    icons={[
                        <LuUserPlus key="addInstitution" className="scale-[1.5]" />,
                        <LuClipboardEdit key="manageInstitutions" className="scale-[1.5]" />
                    ]}
                    toggleAction={toggleInstitutionDropdown}
                    isOpen={institutionOpen}
                />
                <SidebarAccordian
                    title="Settings"
                    subtitles={["Auth", "Institutions", "General Settings"]}
                    icons={[
                        <LuUserCircle key="auth" className="scale-[1.5]" />,
                        <LuSettings2 key="institutions" className="scale-[1.5]" />,
                        <LuSettings key="generalSettings" className="scale-[1.5]" />
                    ]}
                    toggleAction={toggleSettingsDropdown}
                    isOpen={settingsOpen}
                />

                <CustomSidebarLink title="Profile" icon={<LuUser2 className="scale-[1.5] stroke-1" />} href="/dashboard/profile" click={handleProfileClick} />
            </div>
        </aside>
    );
};

export default CustomSidebar;
