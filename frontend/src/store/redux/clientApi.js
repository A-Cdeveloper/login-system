import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.0.149:8080";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients",
      providesTags: ["Client"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { useGetClientsQuery, useDeleteClientMutation } = clientApi;
