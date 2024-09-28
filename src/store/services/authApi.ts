import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTokenToRequest } from "../../lib/token";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://odoobros.pythonanywhere.com/api/",
    prepareHeaders: (headers, { getState }: any) => {
      return addTokenToRequest(headers, { getState });
    },
  }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    login: build.mutation<any, any>({
      query: (data) => ({
        url: `extract-info/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
