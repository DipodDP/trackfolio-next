// Or from '@reduxjs/toolkit/query/react'
import { configureStore } from "@reduxjs/toolkit/";
import counterReducer from "./slice";
import { trackfolioApi } from "./api/trackfolio.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { trackfolioReducer } from "./api/trackfolio.slice";
// import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    [trackfolioApi.reducerPath]: trackfolioApi.reducer,
    counter: counterReducer,
    trackfolio: trackfolioReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trackfolioApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
