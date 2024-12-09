
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../../apiClient";
import { isEqual } from "../../../../utils/equalCheck";
const API_BASE_URL = 'http://13.244.68.8:8000'

export const fetchUsers = createAsyncThunk(
    'events/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/api/auth/users/all/`, { withCredentials: true })
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
const filterBySearchTerm = (contacts, searchTerm) => {
    if (!searchTerm) return contacts;
    return contacts.filter(contact =>
        (contact.full_name.toLowerCase().includes(searchTerm.toLowerCase())) || (contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
};

export const initialFilterState = {
    search: '',
}

const initialState = {
    events: [], // events for all of user's calendars
    calendar: null, // selected calendar or user's defaultCalendar initially
    calendars: [], // all of user's calendars
    users: [],
    searchResults: [],
    selectedUsers: [],
    currentCalendarId: null, // needs this cause cant change state based on localstorage changes
    calendarActionOpen: false,
    selectedAppointment: null,
    editAppointmentModalOpen: false,
    editEventModalOpen: false,
    editEventModalEditable: false,
    createEventModalOpen: false,
    inviteModalOpen: false,
    createCalendarModalOpen: false,
    selectedEvent: {
        event: null,
        title: '',
        description: '',
        allDay: false,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        rule: '',
        cancel_start: '',
        cancel_end: '',
    },
    filter: { ...initialFilterState },
    startTimeRange: '',
    endTimeRange: '',
    loading: false,
    error: null
}

export const addEvent = createAsyncThunk(
    'events/addEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/scheduler/create-event/`, eventData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const getEvents = createAsyncThunk(
    'events/getEvents',
    async (timeRange, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/api/scheduler/get-events/?start=${timeRange.start}&end=${timeRange.end}`, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

//may need changes this is copy of add
export const editEvent = createAsyncThunk(
    'events/editEvent',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/scheduler/edit-event/`, updatedData, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getCalendars = createAsyncThunk(
    'events/getCalendars',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/api/scheduler/my-calendars/`, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createCalendar = createAsyncThunk(
    'events/createCalendar',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/scheduler/create-calendar/`, data, { withCredentials: true })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const inviteCalendar = createAsyncThunk(
    'events/inviteCalendar',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/api/scheduler/invite/`, data, { withCredentials: true })
            return response.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
        },
        resetSelectedUsers: (state) => {
            state.selectedUsers = []
        },
        setEvents: (state, action) => {
            state.events = action.payload
        },
        setCalendar: (state, action) => {
            state.calendar = action.payload
        },
        setCurrentCalendarId: (state, action) => {
            state.currentCalendarId = action.payload
        },
        setSelectedAppointment: (state, action) => {
            state.selectedAppointment = action.payload
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload
        },
        setEditEventModalEdit: (state, action) => {
            state.editEventModalEditable = action.payload
        },
        setStartTimeRange: (state, action) => {
            state.startTimeRange = action.payload
        },
        setEndTimeRange: (state, action) => {
            state.endTimeRange = action.payload
        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload;
        },
        applyFilters: (state) => {
            let filteredContacts = filterBySearchTerm(state.users, state.filter.search);
            state.searchResults = filteredContacts
        },
        toggleCalendarAction: (state,) => {
            state.calendarActionOpen = !state.calendarActionOpen
        },
        toggleAppointmentModal: (state) => {
            state.editAppointmentModalOpen = !state.editAppointmentModalOpen;
        },
        toggleCreateEventModal: (state) => {
            state.createEventModalOpen = !state.createEventModalOpen;
        },
        toggleCreateCalendarModal: (state) => {
            state.createCalendarModalOpen = !state.createCalendarModalOpen;
        },
        toggleInviteModal: (state) => {
            state.inviteModalOpen = !state.inviteModalOpen;
        },
        toggleEditEventModal: (state) => {
            state.editEventModalOpen = !state.editEventModalOpen;
        },
        toggleEditEventModalEdit: (state) => {
            state.editEventModalEditable = !state.editEventModalEditable;
        },
        toggleUserSelection: (state, action) => {
            const userId = action.payload;
            if (state.selectedUsers.includes(userId)) {
                state.selectedUsers = state.selectedUsers.filter(id => id !== userId);
            } else {
                state.selectedUsers.push(userId);
            }
        },
        toggleAllUsers: (state) => {
            let visibleUsers = state.searchResults.length > 0 ? state.searchResults : state.users;
            if (isEqual(state.filter, initialFilterState)) {
                visibleUsers = state.users
            } else {
                visibleUsers = state.searchResults
            }
            const allSelected = visibleUsers.every(user => state.selectedUsers.includes(user.id));

            if (allSelected) {
                state.selectedUsers = [] // Clear the selection
            } else {
                visibleUsers.forEach(user => { // O(n^2) 
                    if (!state.selectedUsers.includes(user.id)) {
                        state.selectedUsers.push(user.id);
                    }
                });
            }
        },
        setStartDate: (state, action) => {
            state.selectedEvent.start = action.payload;
        },
        setEndDate: (state, action) => {
            state.selectedEvent.end = action.payload;
        }, /* updateSelectedEvent could be used instead of setStartDate/EndDate
            but I already coded that part and I'm on a deadline 
            Think of setDelectedEvent as a put and updateSelectedEvent as a patch
            updateSelectedEvent is for updating one field
            */
        updateSelectedEvent: (state, action) => {
            const { name, value } = action.payload;
            if (state.selectedEvent) {
                state.selectedEvent[name] = value;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEvent.pending, (state) => {
                state.loading = true
            })// add Events
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(action.payload)
                state.loading = false
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) // get events
            .addCase(getEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.events = action.payload
                state.loading = false
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) // edit events
            .addCase(editEvent.pending, (state) => {
                state.loading = true
            })
            .addCase(editEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    // Replace the old event with the updated one
                    state.events[index] = action.payload;
                }
                state.loading = false
            })
            .addCase(editEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) // get users calendars and default
            .addCase(getCalendars.pending, (state) => {
                state.loading = true
            })
            .addCase(getCalendars.fulfilled, (state, action) => {
                state.calendars = action.payload
                state.loading = false
            })
            .addCase(getCalendars.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })
            .addCase(createCalendar.pending, (state) => {
                state.loading = true
            })// add Events
            .addCase(createCalendar.fulfilled, (state, action) => {
                state.calendars.push(action.payload)
                state.loading = false
            })
            .addCase(createCalendar.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(inviteCalendar.pending, (state) => {
                state.loading = true
            })// add Events
            .addCase(inviteCalendar.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(inviteCalendar.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { reset, resetSelectedUsers, setEvents, setSelectedAppointment, setCalendar, setCurrentCalendarId, setEditEventModalEdit, setEndTimeRange, setStartTimeRange, toggleCalendarAction, toggleAppointmentModal, toggleCreateEventModal, setStartDate, setEndDate, setSelectedEvent, toggleEditEventModal, updateSelectedEvent, toggleEditEventModalEdit, toggleCreateCalendarModal, toggleUserSelection, toggleAllUsers, toggleInviteModal, setSearchFilter, applyFilters } = eventSlice.actions
export default eventSlice.reducer