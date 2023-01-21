import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../aplicationtools/instance";


export const fetchProduct = createAsyncThunk("product/fetchProduct", async(product,{dispatch}) => {
    try {
        const {data} = await instance.post("/products", {product});
        dispatch(getProduct());
        return data;
    } catch (error) {
        // console.log(error);
    }
})

export const getProduct = createAsyncThunk("product/getProduct", async () => {
    try {
        const {data} = await instance.get("/products");
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
        getProductData: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.load = true
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.load = false
            state.productData = action.payload.product
        });
        builder.addCase(fetchProduct.rejected, (state) => {
            state.loat = false
            state.error = "error"
        });
        builder.addCase(getProduct.pending, (state) => {
            state.load = true 
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            console.log({action});
            state.load = false
            state.getProductData = action.payload?.products
        });
        builder.addCase(getProduct.rejected, (state) => {
            state.load = false
            state.error = "error get products"
        })
    }
});

export const productReducer = productSlice.reducer;

