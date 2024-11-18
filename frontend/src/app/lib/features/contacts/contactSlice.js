
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../../../apiClient'
import { isEqual } from '../../../../utils/equalCheck'

const API_BASE_URL = 'http://localhost:8000'

export const fetchContacts = createAsyncThunk(
    'contact/fetchContacts',
    async (_,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/api/contact-analytics/contacts/`, { withCredentials: true })
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const addContact = createAsyncThunk(
    'contact/addContact',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/contact-analytics/add-contact/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const uploadContact = createAsyncThunk(
    'contact/uploadContact',
    async (uploadData, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/contact-analytics/upload/`, uploadData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const editContact = createAsyncThunk(
    'contact/editContact',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.patch(`${API_BASE_URL}/api/contact-analytics/edit-contact/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchCauses = createAsyncThunk(
    'contact/fetchCauses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/api/campaigns/get-causes/`, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const addCause = createAsyncThunk(
    'contact/addCause',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/campaigns/add-cause/`, eventData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

//may need changes this is copy of add
export const editCause = createAsyncThunk(
    'contact/editCause',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/campaigns/edit-cause/`, updatedData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// Utility function to filter by search term
const filterBySearchTerm = (contacts, searchTerm) => {
    if (!searchTerm) return contacts;
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Utility function to filter by type
const filterByType = (contacts, type) => {
    // If 'types' includes 'all' or is empty, return all contacts
    if (type.length === 0 || type.includes('all')) {
        return contacts;
    }
    // Otherwise, filter contacts by the specified types
    return contacts.filter(contact => type.includes(contact.lead_type));
};
// Utility function to filter by type
const filterByContactType = (contacts, type) => {
    // If 'types' includes 'all' or is empty, return all contacts
    if (type === 'all') {
        return contacts;
    }
    // Otherwise, filter contacts by the specified types
    return contacts.filter(contact => contact.contact_type === type);
};

// Utility function to sort contacts
const sortContacts = (contacts, sortCriteria) => {
    return [...contacts].sort((a, b) => {
        if (sortCriteria === 'name') {
            return a.name.localeCompare(b.name);
        }
        // Add other sorting criteria here (e.g., 'date', 'price')
        // ...
    });
};





export const initialFilterState = {
    search: '',
    lead_type: ['all'],
    contact_type: 'all',
    sort: 'name',
};

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        searchResults: [],
        filter: { ...initialFilterState },
        checkboxes: {
            major_donor: false,
            mid_range_donor: false,
            broad_base_donor: false,
        },
        selectedContact: null,
        selectedContacts: [],
        causes: [],
        selectedCause: null,
        contactCardOpen: false,
        contactCardMoreOpen: false,
        uploadContactOpen: false,
        editUserOpen: false,
        deleteModalOpen: false,
        contactTableActionOpen: false,
        contactSortModalOpen: false,
        patientSortModalOpen: false,
        contactTrackFundsModalOpen: false,
        causeModalOpen: false,
        isSuccess: false,
        error: false,
        cause_success: false, // success bool for cause model crud
        loading: false,
        cause_error: null, // error bool for cause model crud
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.isSuccess = false;
            state.message = "";
            state.cause_error = false;
            state.cause_success = false;
        },
        setSelectedContact: (state, action) => {
            state.selectedContact = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload;
        },
        setTypeFilter: (state, action) => {
            // don't think this is ever used
            state.filter.lead_type = action.payload;
        },
        setContactTypeFilter: (state, action) => {
            state.filter.contact_type = action.payload;
        },
        setSortCriteria: (state, action) => {
            state.filter.sort = action.payload;
        },
        applyFilters: (state) => {
            let filteredContacts = filterBySearchTerm(state.contacts, state.filter.search);
            filteredContacts = filterByType(filteredContacts, state.filter.lead_type);
            filteredContacts = filterByContactType(filteredContacts, state.filter.contact_type);
            state.searchResults = sortContacts(filteredContacts, state.filter.sort);
        },
        toggleDeleteModal: (state, action) => {
            state.deleteModalOpen = !state.deleteModalOpen
        },
        toggleCauseModal: (state) => {
            state.causeModalOpen = !state.causeModalOpen
        },
        toggleUploadContactModal: (state) => {
            state.uploadContactOpen = !state.uploadContactOpen
        },
        toggleContactCard: (state) => {
            state.contactCardOpen = !state.contactCardOpen;
        },
        toggleContactCardMore: (state) => {
            state.contactCardMoreOpen = !state.contactCardMoreOpen
        },
        toggleContactTableAction: (state) => {
            state.contactTableActionOpen = !state.contactTableActionOpen
        },
        toggleEditUser: (state) => {
            state.editUserOpen = !state.editUserOpen
        },
        toggleTrackFundsModal: (state) => {
            state.contactTrackFundsModalOpen = !state.contactTrackFundsModalOpen
        },
        toggleContactSortModal: (state) => {
            state.contactSortModalOpen = !state.contactSortModalOpen
        },
        togglePatientSortModal: (state) => {
            state.patientSortModalOpen = !state.patientSortModalOpen
        },
        toggleAllContacts: (state) => {
            let visibleContacts = state.searchResults.length > 0 ? state.searchResults : state.contacts;
            if (isEqual(state.filter, initialFilterState)) {
                visibleContacts = state.contacts
            } else {
                visibleContacts = state.searchResults
            }
            const allSelected = visibleContacts.every(contact => state.selectedContacts.includes(contact.id));

            if (allSelected) {
                state.selectedContacts = [] // Clear the selection
            } else {
                visibleContacts.forEach(contact => { // O(n^2) 
                    if (!state.selectedContacts.includes(contact.id)) {
                        state.selectedContacts.push(contact.id);
                    }
                });
            }
        },
        toggleContactSelection: (state, action) => {
            const contactId = action.payload;
            if (state.selectedContacts.includes(contactId)) {
                state.selectedContacts = state.selectedContacts.filter(id => id !== contactId);
            } else {
                state.selectedContacts.push(contactId);
            }
        },
        toggleCheckbox: (state, action) => {
            const { checkbox } = action.payload; // e.g., 'major_donor'

            // Toggle the checkbox state
            state.checkboxes[checkbox] = !state.checkboxes[checkbox];

            // Directly use checkbox states to determine filter types
            const selectedTypes = Object.entries(state.checkboxes)
                .filter(([key, value]) => value) // Filter for checked ones
                .map(([key, value]) => key); // Use the checkbox name as the type

            // Update the filter.type based on current checkbox states
            if (selectedTypes.length === 0 || selectedTypes.length === Object.keys(state.checkboxes).length) {
                // If none or all checkboxes are selected, default to 'all'
                state.filter.lead_type = ['all'];
            } else {
                // Otherwise, set the filter type to the selected checkboxes
                state.filter.lead_type = selectedTypes;
            }
        },
        removeAllFilters: (state) => {
            state.filter = { ...initialFilterState };
            state.checkboxes = {
                major_donor: false,
                mid_range_donor: false,
                broad_base_donor: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload
                state.loading = false
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })// add Contact
            .addCase(addContact.pending, (state) => {
                state.loading = true
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload)
                state.isSuccess = true
                state.editUserOpen = false
                state.loading = false
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) // edit events
            .addCase(editContact.pending, (state) => {
                state.loading = true
            })
            .addCase(editContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    // Replace the old contact with the updated one
                    state.contacts[index] = action.payload;
                }
                state.isSuccess = true
                state.loading = false
                state.editUserOpen = false
                state.contactCardOpen = false
            })
            .addCase(editContact.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchCauses.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCauses.fulfilled, (state, action) => {
                state.causes = action.payload
                state.loading = false
            })
            .addCase(fetchCauses.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })// add Contact
            .addCase(addCause.pending, (state) => {
                state.loading = true
            })
            .addCase(addCause.fulfilled, (state, action) => {
                state.causes.push(action.payload)
                state.isSuccess = true
                state.loading = false
            })
            .addCase(addCause.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) // edit events
            .addCase(editCause.pending, (state) => {
                state.loading = true
            })
            .addCase(editCause.fulfilled, (state, action) => {
                const index = state.causes.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    // Replace the old contact with the updated one
                    state.causes[index] = action.payload;
                }
                state.loading = false
                state.isSuccess = true
            })
            .addCase(editCause.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { reset, setSelectedContact, setSearchResults, setSearchFilter, setTypeFilter, setContactTypeFilter, setSortCriteria, applyFilters, toggleUploadContactModal, toggleContactCard, toggleContactCardMore, toggleContactTableAction, toggleContactSortModal, toggleAllContacts, toggleTrackFundsModal, toggleContactSelection, toggleEditUser, toggleDeleteModal, toggleCheckbox, toggleCauseModal, togglePatientSortModal, removeAllFilters } = contactSlice.actions
export default contactSlice.reducer
