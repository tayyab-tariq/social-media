import { apiSlice } from "./apiSlice";
const USERS_URL = "auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        invalidatesTags: ['Post'],
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } =
  usersApiSlice; // userLoginMutation is very specific, remember convention
