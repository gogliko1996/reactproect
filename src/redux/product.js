import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { instance } from "../aplicationtools/instance";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productIfo, { dispatch }) => {
    const {productValue ,update, id} = productIfo;
    const prId = update ? id : ""
    const method = update ? "put" : "post";
    const product = productValue;
    try {
      const { data } = await instance[method](`/products/${prId}`,{product});
      dispatch(getProduct());
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    try {
      const { data } = await instance.delete(`/products/${id}`);
      dispatch(getProduct());
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const { data } = await instance.get("/products");
    return data;
  } catch (error) {
    // console.log(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    load: false,
    productData: [],
    getProductData: [],
    error: null,
  },
  reducers: {
    update: (state) => {
      console.log(state.productData);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.load = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.load = false;
      state.productData = action.payload.product;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.loat = false;
      state.error = "error";
    });
    builder.addCase(getProduct.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.load = false;
      state.getProductData = action.payload?.products;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.load = false;
      state.error = "error get products";
    });
  },
});

export const productReducer = productSlice.reducer;
export const { update } = productSlice.actions;
