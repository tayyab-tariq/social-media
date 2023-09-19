import { apiSlice } from "./apiSlice";
const USERS_URL = "api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/register`,
        method: "POST",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        invalidatesTags: ['Post'],
      }),
    }),
    getUsers: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/users/${userId}`,
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updatePosts: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/posts`,
        method: "POST",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getPosts: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/posts`,
        method: "GET",
      }),
    }),
    getUserPosts: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/posts/${userId}`,
        method: "GET",
      }),
    }),

    addRemoveFriend: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/${data.userId}/${data.friendId}`,
        method: "PATCH",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    likePost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/posts/${data.postId}/like`,
        method: "PATCH",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getFriends: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/users/${userId}/friends`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUsersMutation, useUpdatePostsMutation, useGetPostsMutation, useGetUserPostsMutation, useAddRemoveFriendMutation, useLikePostMutation, useGetFriendsMutation } =
  usersApiSlice; // userLoginMutation is very specific, remember convention
