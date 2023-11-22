import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayoutData: builder.query({
      query: (type) => ({
        url: `layout/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `layout/edit-layout`,
        body: { type, image, title, subTitle, faq, categories },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetLayoutDataQuery, useEditLayoutMutation } = layoutApi;
