import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { gameDetailsGet, gameScreenshotURL } from "../api";

export const gamesDetailAsync = createAsyncThunk(
  "gameDetail/gameDetailAsync",
  async ({ id }) => {
    const detailData = await axios.get(gameDetailsGet(id));
    const screenshotGameData = await axios.get(gameScreenshotURL(id));
    return {
      game: detailData.data,
      screen: screenshotGameData.data.results,
    };
  }
);

const gameDetails = createSlice({
  name: "gameDetails",
  initialState: {
    game: null,
    screen: {},
    isLoading: true,
  },
  extraReducers: {
    [gamesDetailAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [gamesDetailAsync.fulfilled]: (state, { payload }) => {
      state.game = payload.game;
      state.screen = payload.screen;
      state.isLoading = false;
    },
  },
});

export default gameDetails.reducer;
