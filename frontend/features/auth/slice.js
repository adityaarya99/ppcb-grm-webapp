import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './services/authService';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const res = await authService.login({ username, password });
            return res;
        } catch (err) {
            return rejectWithValue(err?.data?.message || err?.message || 'Login failed');
        }
    }
);

export const fetchSession = createAsyncThunk(
    'auth/fetchSession',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authService.getSession();
            return res;
        } catch (err) {
            return rejectWithValue(err?.data?.message || err?.message || 'Session check failed');
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
                state.isAuthenticated = false;
            })
            .addCase(fetchSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSession.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null;
                state.isAuthenticated = !!action.payload?.user;
                state.error = null;
            })
            .addCase(fetchSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Session check failed';
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
