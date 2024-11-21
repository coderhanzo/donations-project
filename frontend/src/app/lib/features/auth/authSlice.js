

import apiClient from "../../../../apiClient";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const get_logged_in_user = createAsyncThunk(
    'auth/user',
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.get('http://13.244.68.8:8000/api/auth/users/me/', { withCredentials: true })


            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post('http://13.244.68.8:8000/api/auth/jwt/create/', data, { withCredentials: true })

            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', response.data.access)
            }
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        //change
        try {

            const response = await apiClient.post('http://13.244.68.8:8000/api/auth/users/', data, { withCredentials: true })

            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', response.data.access)
            }
            return response.data
        } catch (error) {
            if (error.response.data.password) {
                error.message = error.response.data.password[0]
            } else if (error.response.data.email) {
                error.message = error.response.data.email[0].charAt(0).toUpperCase() + error.response.data.email[0].slice(1)
            } else if (error.response.data.phone_number) {
                error.message = error.response.data.phone_number[0]
            } else if (error.response.data.first_name) {
                error.message = 'Please add your given name'
            } else if (error.response.data.last_name) {
                error.message = 'Please add your last name'
            } else if (error.response.data.slug) {
                error.message = "The email has been used to create a previously deactivated account. Please contact an administrator or use a different email"
            }
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (data, thunkAPI) => {
        //change
        try {
            const response = await apiClient.get('http://13.244.68.8:8000/api/auth/users/logout/', { withCredentials: true })

            localStorage.removeItem('access_token')

            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const reset_password = createAsyncThunk(
    'auth/reset-password',
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post('http://13.244.68.8:8000/api/auth/users/reset_password/', data, { withCredentials: true })
            return response.data
        } catch (error) {
            const message = "No user with that email found"
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const confirm_password = createAsyncThunk(
    'auth/confirm-password',
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post(`http://13.244.68.8:8000/api/auth/users/reset_password_confirm/`, data, { withCredentials: true })
            return response.data
        } catch (error) {
            if (error.response.data.new_password) {
                error.message = error.response.data.new_password[0]
            }
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const set_password = createAsyncThunk(
    'auth/set-password',
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post('http://13.244.68.8:8000/api/auth/users/set_password/', data, { withCredentials: true })
            return response.data
        } catch (error) {
            if (error.response.data.new_password) {
                error.message = error.response.data.new_password[0]
            }
            if (error.response.data.current_password) {
                error.message = error.response.data.current_password[0]
            }
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(get_logged_in_user.pending, (state) => {

            })
            .addCase(get_logged_in_user.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(get_logged_in_user.rejected, (state, action) => {
                state.user = null;
            })
            .addCase(reset_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(reset_password.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(reset_password.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(confirm_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(confirm_password.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(confirm_password.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(set_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(set_password.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(set_password.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;