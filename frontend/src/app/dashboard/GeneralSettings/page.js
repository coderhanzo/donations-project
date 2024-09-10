'use client'

import SettingsTab from "./_components/SettingsTab"
import { useDispatch, useSelector } from "react-redux"
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice";
import { useEffect } from "react";
import DonorTypes from "./_components/DonorTypes";
import EmailTemplate from "./_components/EmailTemplate";
import TaskCategories from "./_components/TaskCategories";
import CampaignExpiry from "./_components/CampaignExpiry";
import MaxDonations from "./_components/MaxDonationAmount";


const InstitutionSettings = () => {
    const { selectedTab} = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    useEffect(() => {
        const selectedTab = localStorage.getItem('selectedTab');
        if (selectedTab !== null) {
            dispatch(toggleSelectedTab(parseInt(selectedTab)));
        }
    });

    return (
        <>
           

            <div className="">

                <SettingsTab />
                <section className={`${selectedTab == 0 ? '' : 'hidden'} flex w-full `}>
                    <MaxDonations/>
                </section>
                <section className={`${selectedTab == 1 ? '' : 'hidden'} flex w-full`}>
                    <CampaignExpiry />
                </section>
                <section className={`${selectedTab == 2 ? '' : 'hidden'} flex w-full`}>
                    <TaskCategories />
                </section>
                <section className={`${selectedTab == 3 ? '' : 'hidden'} flex w-full`}>
                    <DonorTypes/>
                </section>
                <section className={`${selectedTab == 4 ? '' : 'hidden'} flex w-full`}>
                    <EmailTemplate/>
                </section>


            </div>
        </>
    )
}

export default InstitutionSettings;