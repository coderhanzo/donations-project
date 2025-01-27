
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from './../../../../apiClient';
import moment from 'moment';
const API_BASE_URL = 'http://13.244.68.8:8000'

// Helper function to calculate start and end dates based on the selected time range
const calculateDateRange = (selectedRange, customStart, customEnd) => {
    let startDate, endDate;
    const now = moment();
    switch (selectedRange) {
        case 'this month':
            endDate = now.format('YYYY-MM-DD');
            startDate = now.subtract(30, 'days').format('YYYY-MM-DD');
            break;
        case 'this quarter':
            startDate = now.startOf('quarter').format('YYYY-MM-DD');
            endDate = now.endOf('quarter').format('YYYY-MM-DD');
            break;
        case 'last 90 days':
            endDate = now.format('YYYY-MM-DD');
            startDate = now.subtract(90, 'days').format('YYYY-MM-DD');
            break;
        case 'all time':
            // Handle accordingly; might involve not sending dates or setting very early start date
            startDate = '2000-01-01'; // Example start date for 'all time'
            endDate = now.format('YYYY-MM-DD');
            break;
        case 'custom':
            startDate = customStart;
            endDate = customEnd;
            break;
        default:
            throw new Error('Invalid time range selected');
    }
    return { startDate, endDate };
};

export const fetchDonorAnalytics = createAsyncThunk(
    'analytics/fetchDonorAnalytics',
    async (_, { getState, rejectWithValue }) => {
        const { selectedTimeRange, customRangeStart, customRangeEnd } = getState().analytics;
        const { startDate, endDate } = calculateDateRange(selectedTimeRange, customRangeStart, customRangeEnd);

        // Define your endpoints with keys matching the blockData structure
        const endpoints = [
            { key: 'totalContribution', url: `${API_BASE_URL}/api/donor-management/total-contribution/?start_date=${startDate}&end_date=${endDate}` },
            { key: 'donorRetentionRate', url: `${API_BASE_URL}/api/donor-management/donor-retention/?start_date=${startDate}&end_date=${endDate}` },
            { key: 'newDonorAcquisition', url: `${API_BASE_URL}/api/donor-management/acquisition/?start_date=${startDate}&end_date=${endDate}` },
            { key: 'averageDonationAmount', url: `${API_BASE_URL}/api/donor-management/average/?start_date=${startDate}&end_date=${endDate}` },
            { key: 'donorChurnRate', url: `${API_BASE_URL}/api/donor-management/churn/?start_date=${startDate}&end_date=${endDate}` },
            { key: 'costPerDollarRaised', url: `${API_BASE_URL}/api/donor-management/cost-per/?start_date=${startDate}&end_date=${endDate}` },
            // Add other endpoints as needed
        ];

        try {
            const requests = endpoints.map(endpoint =>
                apiClient.get(endpoint.url, { withCredentials: true }).catch(error => ({ error: error.message }))
            );

            const responses = await Promise.all(requests);

            // Check for any errors in the responses
            const hasError = responses.some(response => response.error);
            if (hasError) {
                return rejectWithValue('One or more requests failed.');
            }

            // Transform the responses into the desired blockData structure
            const aggregatedData = {
                blockData: endpoints.reduce((acc, endpoint, index) => {
                    const response = responses[index];
                    // Assuming the response for each endpoint matches the desired structure
                    // You may need to extract or transform data here based on your actual API responses
                    acc[endpoint.key] = {
                        value: response.data.value,
                        percent_change: response.data.percent_change,
                    };
                    return acc;
                }, {})
            };

            return aggregatedData;
        } catch (error) {
            return rejectWithValue('An unexpected error occurred.');
        }
    }
);

export const fetchTotalContributionsChartData = createAsyncThunk(
    'analytics/fetchTotalContributions',
    async (timeFrame, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/charts/total-contributions?timeFrame=${timeFrame}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const analyticSlice = createSlice({
    name: 'analytics',
    initialState: {
        selectedTimeRange: 'this month',
        dateRangeModalOpen: false,
        dateDropdownOpen: false,
        customRangeStart: null,
        customRangeEnd: null,
        blockData: {
            totalContribution: {
                value: null,
                percent_change: null,
                currency: 'GHC'
            },
            donorRetentionRate: {
                value: null,
                percent_change: null,
                percentage: true
            },
            newDonorAcquisition: {
                value: null,
                percent_change: null,
            },
            averageDonationAmount: {
                value: null,
                percent_change: null,
                currency: 'GHC'
            },
            donorChurnRate: {
                value: null,
                percent_change: null,
                percentage: true
            },
            costPerDollarRaised: {
                value: null,
                percent_change: null,
                currency: 'USD'
            },
        },
        charts: {
            totalContributions: {
                dataPoints: [], // Array of data points for the chart
                loading: false,
                error: null,
            },
            // ... other charts ...
        },
        block_loading: false,
        block_error: null,
        charts_loading: false,
        charts_error: null,


    },
    reducers: {
        updateTimeFrame: (state, action) => {
            const { timeRange, customStart, customEnd } = action.payload;
            if (timeRange === 'custom') {
                state.customRangeStart = customStart;
                state.customRangeEnd = customEnd;
            } else {
                state.customRangeStart = null;
                state.customRangeEnd = null;
            }
            state.selectedTimeRange = timeRange;
        },
        toggleDateRangeModal: (state, action) => {
            state.dateRangeModalOpen = !state.dateRangeModalOpen
        },
        toggleDateDropdown: (state) => {
            state.dateDropdownOpen = !state.dateDropdownOpen
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDonorAnalytics.pending, (state) => {
                state.block_loading = true
            })
            .addCase(fetchDonorAnalytics.fulfilled, (state, action) => {
                state.blockData = action.payload.blockData;
                state.block_loading = false;
            })
            .addCase(fetchDonorAnalytics.rejected, (state, action) => {
                state.blockData.error = action.payload;
                state.block_loading = false;
            }) // Total Contributions and Donors Chart
            .addCase(fetchTotalContributionsChartData.pending, (state) => {
                state.charts_loading = true
            })
            .addCase(fetchTotalContributionsChartData.fulfilled, (state, action) => {
                state.charts.totalContributions = action.payload.charts.totalContribution;
                state.charts_loading = false;
            })
            .addCase(fetchTotalContributionsChartData.rejected, (state, action) => {
                state.charts.totalContributions.error = action.payload;
                state.charts_loading = false;
            });
    }
})
export const { updateTimeFrame, toggleDateRangeModal, toggleDateDropdown } = analyticSlice.actions
export default analyticSlice.reducer