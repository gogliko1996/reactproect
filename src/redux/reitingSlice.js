import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../aplicationtools/instance";

export const reiting = createAsyncThunk("reiting/reiting", async({productId,userId,rating}) => {
    try { 
          await instance.post(`products/${productId}/users/${userId}/rate`,{rating})
    } catch (error) {
        
    }
})

const reitingSlice = createSlice({
  name: "reiting",
  initialState: {
    reitingData: null,
  },
  extraReducers: (builder) => {

  },
});

export const reitinRreduser = reitingSlice.reducer;
