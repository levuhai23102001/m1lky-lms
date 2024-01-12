import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-courses-analytics",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-users-analytics",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-orders-analytics",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} = analyticsApi;
