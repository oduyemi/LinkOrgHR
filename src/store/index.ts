import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { recruitmentApi } from "./services/recruitmentApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [recruitmentApi.reducerPath]: recruitmentApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, recruitmentApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
