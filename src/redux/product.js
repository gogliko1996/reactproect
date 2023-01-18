import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProduct = createAsyncThunk("product/fetchProduct", async(product) => {
    try {
        console.log("product", product);
        const {data} = await axios.post(`http://localhost:3001/`)

        return data;
    } catch (error) {
        // console.log(error);
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        load: false,
        productData: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.load = true
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.load = false
            state.productData = action.payload;
        });
        builder.addCase(fetchProduct.rejected, (state) => {
            state.loat = false
           .state.error = "error"
        });
    },
});

export const productReducer = productSlice.reducer;
