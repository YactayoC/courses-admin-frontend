import { configureStore } from '@reduxjs/toolkit';
import { courseSlice } from './courseSelect';

export const store = configureStore({
  reducer: {
    course: courseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
