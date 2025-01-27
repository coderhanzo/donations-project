'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isError } from "util";

// Initial state
const initialState = {
    institution: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// Async thunk for registering an institution
export const registerInstitution = createAsyncThunk(
    'institution/register',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post('http://0.0.0.0:8000/api/auth/institution/', formData, { headers:{'Content-Type': 'multipart/form-data'} });
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const institutionSlice = createSlice({
    name: 'institution',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
        institution: null
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.institution = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerInstitution.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerInstitution.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.institution = action.payload;
                state.message = 'Institution registered successfully';
            })
            .addCase(registerInstitution.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

// Export the actions and reducer
export const { reset } = institutionSlice.actions;
export default institutionSlice.reducer;
