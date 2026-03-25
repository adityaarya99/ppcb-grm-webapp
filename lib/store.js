import { configureStore } from '@reduxjs/toolkit';

import grievanceReducer from '@/features/grievances/slice';
import authReducer from '@/features/auth/slice';

const store = configureStore({
    reducer: {
        grievance: grievanceReducer,
        auth: authReducer,
    },
});

export default store;
