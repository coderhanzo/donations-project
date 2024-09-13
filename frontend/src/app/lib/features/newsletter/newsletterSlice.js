
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from './../../../../apiClient'


const initialState = {
    rawHTML: '',
    loading: false,
    error: null,
}

export const getHTML = createAsyncThunk(
    'newsletter/getHTML',
    async (template_id, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`http://localhost:8000/mosaico/get-html/?template_id=${template_id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getHTML.pending, (state) => {
                state.loading = true
            })// add Events
            .addCase(getHTML.fulfilled, (state, action) => {
                state.rawHTML = action.payload.template_html
                state.loading = false
            })
            .addCase(getHTML.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { } = newsletterSlice.actions

export default newsletterSlice.reducer