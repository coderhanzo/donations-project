'use client'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    selectedTab: 0,
    tabDropdownOpen: false,
    settingsButtonPressed: false,
    editProfileFormEditable: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        toggleSelectedTab: (state, action) => {
            state.selectedTab = action.payload
        },
        toggleTabDropdown: (state) => {
            state.tabDropdownOpen = !state.tabDropdownOpen
        },
        /* This is for the settings button in the account dropdown
        Navigating and changing state at the same time is negates the state change,
        so a temporary variable is needed to know this button was pressed and to set
        the state accordingly after render */
        toggleSettingsButton: (state) => {
            state.settingsButtonPressed = !state.settingsButtonPressed
        },
        toggleProfileEdit: (state) => {
            state.editProfileFormEditable = !state.editProfileFormEditable
        }
    }
})

export const { toggleSelectedTab, toggleTabDropdown, toggleSettingsButton, toggleProfileEdit } = profileSlice.actions

export default profileSlice.reducer