import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./clientApi";

const store = configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(clientApi.middleware),
});

export default store;
