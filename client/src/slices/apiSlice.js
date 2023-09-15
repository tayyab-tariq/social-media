import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });          // baseUrl is null since we already added proxy to vite.config.js

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],                     //  For caching, since we only have user. e.g Products, blog posts, orders etc 
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({})
});