'use client'
import { useDispatch, useSelector } from "react-redux"
import { toggleSelectedTab, toggleTabDropdown } from "../../../lib/features/profile/profileSlice"
import { LuSettings } from "react-icons/lu"

const AuthTabs = () => {
    const dispatch = useDispatch()
    const { selectedTab, tabDropdownOpen } = useSelector((state) => state.profile)

    const handleTabSelection = (tab) => {
        dispatch(toggleSelectedTab(tab))
        localStorage.setItem('selectedTab', tab);
    }

    const handleTabSelectionMobile = (tab) => {
        dispatch(toggleTabDropdown())
        dispatch(toggleSelectedTab(tab))
        localStorage.setItem('selectedTab', tab); 
    }

    return (
        <>
            <div className="mx-auto w-[85%]">
                <ul className="max-md:hidden grid grid-flow-col text-center text-gray-600 bg-gray-100 rounded-full p-1">
                    {['Campaign Expiration Setting', 'Donor Types Setting', 'Maximum Donations Setting', 'Task Categories Setting', 'Email Template Setting'].map((tabLabel, index) => (
                        <li key={index} className="flex-1">
                            <button 
                                className={`w-full py-4 rounded-full transition-all duration-300 ease-in-out ${
                                    selectedTab === index
                                        ? 'bg-white shadow text-indigo-900'
                                        : 'text-gray-600 hover:bg-gray-200 hover:text-indigo-800'
                                }`} 
                                onClick={() => handleTabSelection(index)}
                            >
                                {tabLabel}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile View */}
                <div className="relative flex items-center md:hidden h-16 w-16 mx-auto bg-gray-300 rounded-full shadow-lg mt-6 cursor-pointer justify-center">
                    <LuSettings className="text-indigo-900 scale-[2.5]" onClick={() => dispatch(toggleTabDropdown())} />
                </div>

                <div className={`absolute z-50 ${tabDropdownOpen ? 'block' : 'hidden'} left-1/2 transform -translate-x-1/2 mt-4 bg-white border border-gray-200 rounded-xl shadow-lg w-64`}>
                    {/* Dropdown */}
                    <ul className="py-2">
                        {['Campaign Expiration Setting', 'Donor Types Setting', 'Maximum Donations Setting', 'Task Categories Setting', 'Email Template Setting'].map((tabLabel, index) => (
                            <li key={index}>
                                <button 
                                    className="w-full block px-4 py-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                                    onClick={() => handleTabSelectionMobile(index)}
                                >
                                    {tabLabel}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AuthTabs
