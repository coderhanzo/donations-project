
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import apiClient from "./../../../../apiClient"

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`/apiClientpi/donor-analytics?timeFrame=${data}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const initialFilterState = {

}


export const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        filter: {},
        selectionType: '',
        loading: false,
        error: '',

    },
    reducers: {
        setSelectionType: (state, action) => {
            state.selectionType = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload
                state.loading = false
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }

})
export const { setSelectionType } = transactionSlice.actions
export default transactionSlice.reducer
