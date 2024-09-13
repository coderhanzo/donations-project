
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../../../apiClient'
import { isEqual } from '../../../../utils/equalCheck'

const API_BASE_URL = 'http://localhost:8000'

export const fetchCampaigns = createAsyncThunk(
    'campaign/fetchCampaigns',
    async () => {
        const response = await apiClient.get(`${API_BASE_URL}/api/campaigns/get-campaigns/` , { withCredentials:true })
        return response.data
    }
)

export const createCampaign = createAsyncThunk(
    'campaign/createCampaign',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/campaigns/create-campaign/`, data, { withCredentials: true })
            if (typeof window !== 'undefined') {
                window.location.href = `/dashboard/campaigns/${response.data.id}`
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
const filterBySearchTerm = (campaigns, searchTerm) => {
    if (!searchTerm) return campaigns;
    return campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};


const filterByType = (campaigns, type) => {
    if (type === 'all') return campaigns;
    return campaigns.filter(campaign => campaign.type === type);
};
const filterByStatus = (campaigns, status) => {
    if (status === 'inactive') {
        return campaigns.filter(campaign => campaign.is_active === false);
    } else if (status === 'active') {
        return campaigns.filter(campaign => campaign.is_active === true);
    }
    return campaigns;
};
const sortCampaigns = (campaigns, sortCriteria) => {
    return [...campaigns].sort((a, b) => {
        if (sortCriteria === 'name') {
            return a.name.localeCompare(b.name);
        }
        // Add other sorting criteria here (e.g., 'date', 'price')
        // ...
    });
};

export const initialFilterState = {
    search: '',
    type: 'all', // options could be monetary or something else that i forgot
    status: 'all',
    sort: 'name', // Default sort criteria
}

const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        campaigns: [],
        searchResults: [],
        users: [],
        filter: { ...initialFilterState },
        selectedCampaign: null,
        selectedPatient: null,
        selectedCampaigns: [],
        campaignTableActionOpen: false,
        addPatientModalOpen: false,
        loading: false,
        error: null,
        selectedCampaign: null,
        selectedPatient: null,
        selectedCampaigns: [],
        campaignTableActionOpen: false,
        addPatientModalOpen: false,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCampaign: (state, action) => {
            state.selectedContact = action.payload
        },
        setSelectedPatient: (state, action) => {
            state.selectedPatient = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload;
        },
        setTypeFilter: (state, action) => {
            state.filter.type = action.payload;
        },
        setStatusFilter: (state, action) => {
            state.filter.status = action.payload;
        },
        setSortCriteria: (state, action) => {
            state.filter.sort = action.payload;
        },
        applyFilters: (state) => {
            let filteredCampaigns = filterBySearchTerm(state.campaigns, state.filter.search);
            filteredCampaigns = filterByType(filteredCampaigns, state.filter.type);
            filteredCampaigns = filterByStatus(filteredCampaigns, state.filter.status);
            state.searchResults = sortCampaigns(filteredCampaigns, state.filter.sort);
        },
        toggleAddPatientModal: (state) => {
            state.addPatientModalOpen = !state.addPatientModalOpen
        },
        toggleAllCampaigns: (state) => {
            let visibleCampaigns = state.searchResults.length > 0 ? state.searchResults : state.campaigns
            if (isEqual(state.filter, initialFilterState)) {
                visibleCampaigns = state.campaigns
            } else {
                visibleCampaigns = state.searchResults
            }
            const allSelected = visibleCampaigns.every(campaign => state.selectedCampaigns.includes(campaign.id));

            if (allSelected) {
                state.selectedCampaigns = [] // Clear the selection
            } else {
                visibleCampaigns.forEach(campaign => { // O(n^2) 
                    if (!state.selectedCampaigns.includes(campaign.id)) {
                        state.selectedCampaigns.push(campaign.id);
                    }
                });
            }
        },
        toggleCampaignTableAction: (state) => {
            state.campaignTableActionOpen = !state.campaignTableActionOpen
        },
        toggleCampaignSelection: (state, action) => {
            const campaignId = action.payload;
            if (state.selectedCampaigns.includes(campaignId)) {
                state.selectedCampaigns = state.selectedCampaigns.filter(id => id !== campaignId);
            } else {
                state.selectedCampaigns.push(campaignId);
            }
        },
        removeAllFilters: (state) => {
            state.filter = { ...initialFilterState }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampaigns.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCampaigns.fulfilled, (state, action) => {
                state.campaigns = action.payload
                state.loading = false
            })
            .addCase(fetchCampaigns.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(createCampaign.pending, (state) => {
                state.loading = true
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.campaigns.push(action.payload)
                state.loading = false
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setSelectedCampaign, setSearchResults, setSearchFilter, setSortCriteria, setTypeFilter, setStatusFilter, applyFilters, toggleAddPatientModal, toggleAllCampaigns, toggleCampaignSelection, toggleCampaignTableAction, removeAllFilters, setSelectedPatient } = campaignSlice.actions
export default campaignSlice.reducer
