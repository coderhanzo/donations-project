'use client'

import InstitutionTabs from "./_components/InstitutionTabs"
import { useDispatch, useSelector } from "react-redux"
import Registration from "./_components/Registration";
import AutoApproval from "./_components/AutoApproval";
import VerificationProcess from "./_components/VerificationProcess";
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice";
import { useEffect } from "react";
import FundingType from "./_components/FundingType";


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

                <InstitutionTabs />
                <section className={`${selectedTab == 0 ? '' : 'hidden'} flex w-full `}>
                    <Registration/>
                </section>
                <section className={`${selectedTab == 1 ? '' : 'hidden'} flex w-full`}>
                    <AutoApproval />
                </section>
                <section className={`${selectedTab == 2 ? '' : 'hidden'} flex w-full`}>
                    <VerificationProcess />
                </section>
                <section className={`${selectedTab == 3 ? '' : 'hidden'} flex w-full`}>
                    <FundingType />
                </section>


            </div>
        </>
    )
}

export default InstitutionSettings;