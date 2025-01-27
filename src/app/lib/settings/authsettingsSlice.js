'use client'
import { createSlice } from "@reduxjs/toolkit";
import { toggleAuthDropdown } from "../features/dropdown/dropdownSlice";

const intialState = {
    authSettingsOpen: false,
}

export const authsettingsSlice = createSlice ({
    name: 'auth',
    initialState: intialState,
    reducers: {
        toggleAuthDropdown: (state, action) => {
            state.authSettingsOpen =!state
        }
    }
})