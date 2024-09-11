'use client'


import { useDispatch, useSelector } from "react-redux"
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice";
import { useEffect } from "react";
import AuthTabs from "./_components/AuthTabs";
import PasswordSettings from "./_components/PasswordSettings";
import LoginTries from "./_components/LoginTries";
import PasswordExpirationSettings from "./_components/PasswordExpirationSettings";


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

                <AuthTabs />
                <section className={`${selectedTab == 0 ? '' : 'hidden'} flex w-full`}>
                    <PasswordSettings />
                </section>
                <section className={`${selectedTab == 1 ? '' : 'hidden'} flex w-full`}>
                    <LoginTries />
                </section>
                <section className={`${selectedTab == 2 ? '' : 'hidden'} flex w-full`}>
                    <PasswordExpirationSettings/>
                </section>
            </div>
        </>
    )
}

export default InstitutionSettings;