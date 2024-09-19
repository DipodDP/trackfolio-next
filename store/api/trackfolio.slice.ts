import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'

interface TrackfolioState {
    favourites: string[]
}

// const initialState: TrackfolioState = {
//   favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
// }

// initial state should be declared that way to avoid ssr issues
function getInitialState() {
  if (typeof window !== 'undefined') {
    console.log('localStorage:', localStorage.getItem(LS_FAV_KEY))
    return JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]');
  }
  return [];
}

const initialState: TrackfolioState = {
  favourites: getInitialState()
};


export const trackfolioSlice = createSlice({
  name: 'trackfolio',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      // saves url of asset
      state.favourites.push(action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    },
    removeFavourite(state, action: PayloadAction<string>) {
      console.log(state.favourites.filter(f => f !== action.payload))
      state.favourites = state.favourites.filter(f => f !== action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    }
  }
})

export const trackfolioActions = trackfolioSlice.actions

export const trackfolioReducer = trackfolioSlice.reducer
