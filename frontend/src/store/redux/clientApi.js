import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.0.149:8080";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    clients: builder.query({
      query: () => "/clients",
      providesTags: ["Client"],
    }),
  }),
});

export const { useClientsQuery } = clientApi;
