'use client'
import { useEffect, useState } from "react"
import { FaChevronDown, FaTasks } from "react-icons/fa"
import { LuClipboardList } from "react-icons/lu"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { toggleTasksDropdown } from "../lib/features/dropdown/dropdownSlice"
import { toggleSelectedTab } from "../lib/features/profile/profileSlice"



const SidebarAccordian = ({ title, subtitles, icons,toggleAction, isOpen }) => {
    // const [open, setOpen] = useState(false)

    //const { tasksOpen } = useSelector((state) => state.dropdowns)
   // const { selectedTab } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const getHref = (item) => {
        if (title === "Tasks") {
            return item.toLowerCase() === 'donor pipeline' ? '/dashboard/kanban' : '/dashboard/profile';
        } else if (title === "Auth Menu") {
            return item.toLowerCase() === 'add new user' ? '/dashboard/AuthMenu_AddUser' : '/dashboard/AuthMenu_ManageUser';
        }
        else if (title === "Institutions") {
            return item.toLowerCase() === 'add institution' ? '/dashboard/AddInstitution' : '/dashboard/institutions/manage';
        }
        else if (title === "Settings") {
            // Check for each settings case separately
            if (item.toLowerCase() === 'auth') {
                return '/dashboard/SettingsAuth';
            } else if (item.toLowerCase() === 'institutions') {
                return '/dashboard/InstitutionSettings';
            } else if (item.toLowerCase() === 'general settings') {
                return '/dashboard/GeneralSettings';
            }
        }
        return '#'; 
    }
    return (
        <div className="text-white font-bold text-lg ">
            <button className="cursor-pointer flex flex-row justify-between w-full place-items-center py-3 px-6 hover:bg-black hover:bg-opacity-25" onClick={() => dispatch(toggleAction())}>
                <div className="flex flex-row place-items-center pl--2">
                    <LuClipboardList className="scale-[1.5] stroke-1" />
                    <p className="pl-3">{title}</p>
                </div>
                <FaChevronDown />
            </button>
            <div className={`transition-all overflow-hidden duration-[350ms]    ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul>
                    {subtitles.map((item, index) => (
                        <li key={index} className=" px-6 py-3 hover:bg-black hover:bg-opacity-25">
                            <Link href={getHref(item)}>
                                <div className="cursor-pointer flex flex-row place-items-center pl-3 ">
                                    {icons[index]}
                                    <p className="pl-3">{item}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    )
}

export default SidebarAccordian