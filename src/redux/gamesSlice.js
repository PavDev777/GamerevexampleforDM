import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  newGamesURL,
  popularGamesURL,
  searchGameURL,
  upcomingGamesURL,
} from "../api";

export const loadGamesAsync = createAsyncThunk(
  "games/loadGamesAsync",
  async () => {
    const popularData = await axios.get(popularGamesURL());
    const newGamesData = await axios.get(newGamesURL());
    const upcomingData = await axios.get(upcomingGamesURL());
    return {
      popularGames: popularData.data.results,
      newGames: newGamesData.data.results,
      upcomingGames: upcomingData.data.results,
    };
  }
);

export const fetchSearched = createAsyncThunk(
  "games/fetchSearched",
  async (payload) => {
    const searchGames = await axios.get(searchGameURL(payload));
    return searchGames.data.results;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    popularGames: [],
    newGames: [],
    upcomingGames: [],
    searched: [],
    isLoading: true,
    isLoadingSearch: false,
  },
  reducers: {
    clearSearched: (state, action) => {
      state.searched = [];
    },
  },
  extraReducers: {
    [loadGamesAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadGamesAsync.fulfilled]: (state, { payload }) => {
      state.popularGames = payload.popularGames;
      state.newGames = payload.newGames;
      state.upcomingGames = payload.upcomingGames;
      state.isLoading = false;
    },
    [fetchSearched.pending]: (state, action) => {
      state.isLoadingSearch = true;
    },
    [fetchSearched.fulfilled]: (state, { payload }) => {
      state.searched = payload;
      state.isLoadingSearch = false;
    },
  },
});

export const { clearSearched } = gamesSlice.actions;

export default gamesSlice.reducer;
