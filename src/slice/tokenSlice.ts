/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../guards/jwtDecode";

export const decodeToken = createAsyncThunk(
  "token/decodeToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("_token");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        return rejectWithValue("Invalid token");
      }
    }
    return rejectWithValue("No token found");
  }
);

const initialState: { data: DecodedToken | null } = { data: null };

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      decodeToken.fulfilled,
      (state, action: PayloadAction<DecodedToken>) => {
        state.data = action.payload;
      }
    );
  },
});

export const selectToken = (state: any) => state.token.data;
export const tokenReducer = tokenSlice.reducer;
