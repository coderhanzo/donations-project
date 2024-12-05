
import { configureStore } from '@reduxjs/toolkit'
import dropdownReducer from './features/dropdown/dropdownSlice'
import eventReducer from './features/events/eventSlice'
import contactReducer from './features/contacts/contactSlice'
import profileReducer from './features/profile/profileSlice'
import campaignReducer from './features/campaigns/campaignSlice'
import analyticReducer from './features/analytics/analyticSlice'
import newsletterReducer from './features/newsletter/newsletterSlice'
import authReducer from './features/auth/authSlice'
import transactionReducer from './features/transactions/transactionSlice'
import institutionReducer from './features/institutions/institutionSlice'



export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            dropdowns: dropdownReducer,
            events: eventReducer,
            contact: contactReducer,
            profile: profileReducer,
            campaigns: campaignReducer,
            analytics: analyticReducer,
            newsletter: newsletterReducer,
            transactions: transactionReducer,
            institution: institutionReducer,
        },
        devTools: true,
    })
}