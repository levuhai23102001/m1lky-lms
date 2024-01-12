import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "auth/refresh-token",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "auth/me",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            userLogin({
              user: res.data.user,
              accessToken: res.data.accessToken,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
