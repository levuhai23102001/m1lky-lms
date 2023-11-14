import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `layout/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery } = layoutApi;
