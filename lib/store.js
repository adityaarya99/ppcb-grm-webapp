import { configureStore } from '@reduxjs/toolkit';
import grievanceReducer from '@/features/grievances/slice';

const store = configureStore({
  reducer: {
    grievance: grievanceReducer,
  },
});

export default store;
