// from .../query/react to generate hooks
import {
  IInstrumentShort,
  InstrumentResponse,
} from "@/lib/models/portfolio.api.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// require('dotenv').config()

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
// console.log('Endpoint: ', baseUrl)

export const trackfolioApi = createApi({
  reducerPath: "trackfolio/api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",  // This enables sending cookies
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    // query to fetch data, mutations to change data
    // first generic is a type of fetched data, second is a type of parameter to execute query
    searchAssets: build.query<IInstrumentShort[], string>({
      // query: () => 'search/users' or
      query: (find: string) => ({
        url: "find",
        params: {
          query: find,
        },
      }),
      // callback to transform data from response
      transformResponse: (response: InstrumentResponse<IInstrumentShort>) =>
        response.instruments,
    }),
    // getUserAssets: build.query<IAsset[], string>({
    //   query: (username: string) => ({
    //     url: `users/${username}/assets`
    //   })
    // }),
    // boilerplate
    createUser: build.mutation<any, void>({
      query: () => "",
    }),
  }),
});

// automaticly generated hook
export const { useSearchAssetsQuery, useLazySearchAssetsQuery } = trackfolioApi;

