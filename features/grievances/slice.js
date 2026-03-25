import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { grievanceService } from './services/grievanceService';

// Async thunk for submitting grievance with files
export const submitGrievance = createAsyncThunk(
    'grievance/submitGrievance',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await grievanceService.submitGrievanceWithFiles(formData);
            return res;
        } catch (err) {
            // Prefer error message from backend
            return rejectWithValue(err?.data?.message || err?.message || 'Submission failed');
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    success: false,
    referenceNumber: null,
};

const grievanceSlice = createSlice({
    name: 'grievance',
    initialState,
    reducers: {
        resetSubmissionState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.referenceNumber = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitGrievance.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.referenceNumber = null;
            })
            .addCase(submitGrievance.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.referenceNumber = action.payload?.referenceNumber || null;
            })
            .addCase(submitGrievance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Submission failed';
                state.success = false;
                state.referenceNumber = null;
            });
    },
});

export const { resetSubmissionState } = grievanceSlice.actions;
export default grievanceSlice.reducer;
