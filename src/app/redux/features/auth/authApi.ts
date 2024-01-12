import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activeToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
        mode: "no-cors",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(userRegistration({ token: res.data.activeToken }));
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ active_code, active_token }) => ({
        url: "auth/active-user",
        method: "POST",
        body: {
          active_code,
          active_token,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
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
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "auth/social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
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
    logout: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLogout());
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
