import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { appReducer } from './app-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
