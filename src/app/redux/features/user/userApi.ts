import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "users/update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ name }) => ({
        url: "users/update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "users/update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
