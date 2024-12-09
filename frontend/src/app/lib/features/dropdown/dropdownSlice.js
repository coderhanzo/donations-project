'use client'
import { createSlice } from '@reduxjs/toolkit';

// MISC OPEN/CLOSE THINGS, LIKE MODALS

// Define the initial state
const initialDropdownState = {
    tasksOpen: false,
    institutionOpen:false,
    authMenuOpen:false,
    settingsOpen: false,
    accountDropdownOpen: false,
    sidebarOpen: false,
    embedModalOpen: false,
    deleteBoardModalOpen: false,
    authSettingsOpen: false,
};

// Create the slice
export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState: initialDropdownState,
    reducers: {
        // Define a reducer to toggle the dropdown state
        toggleTasksDropdown: (state) => {
            state.tasksOpen = !state.tasksOpen;
        },
        //Define a reducer to toggle the dropdown state
        toggleInstitutionDropdown: (state) =>{
            state.institutionOpen = !state.institutionOpen;
        },
        toggleSettingsDropdown: (state) => {
            state.settingsOpen = !state.settingsOpen;
        },
        toggleAuthMenuDropdown: (state) => {
            state.authMenuOpen =!state.authMenuOpen;
        },
        // Top Right Profile button
        toggleAccountDropdown: (state) => {
            state.accountDropdownOpen = !state.accountDropdownOpen
        },
        // not really a dropdown but I don't want to make another slice
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        // i should really change the name of this slice to toggles
        toggleEmbedModal: (state) => {
            state.embedModalOpen = !state.embedModalOpen
        },
        toggleDeleteBoardModal: (state) => {
            state.deleteBoardModalOpen = !state.deleteBoardModalOpen
        },
        toggleAuthDropdown: (state) =>{
            state.authSettingsOpen= !state.authSettingsOpen
        }

    }
});

// Export the action creator
export const { toggleTasksDropdown, toggleInstitutionDropdown,toggleSettingsDropdown,toggleAuthMenuDropdown, toggleAccountDropdown, toggleSidebar, toggleEmbedModal, toggleDeleteBoardModal, toggleAuthDropdown } = dropdownSlice.actions;

// Export the reducer
export default dropdownSlice.reducer;