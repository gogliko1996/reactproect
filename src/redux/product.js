import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../aplicationtools/instance";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productIfo, { dispatch }) => {
    const { productValue, update, id } = productIfo;
    const prId = update ? id : "";
    const method = update ? "put" : "post";
    const product = productValue;
    try {
      const { data } = await instance[method](`/products/${prId}`, { product });
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

export const searchProduct = createAsyncThunk(
  "produtx/searchProduct",
  async (searchValue) => {
    try {
      const { data } = await instance.get(`/products?name=${searchValue}`);
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const categoriesProduct = createAsyncThunk(
  "categores/categoriesProduct",
  async (url) => {
    try {
      const { data } = await instance.get(`/products/categories/${url}`);
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const saveCart = createAsyncThunk(
  "cart/savecart",
  async ({ userId, cartProduct },{dispatch}) => {
    try {
      await instance.put(`/users/${userId}/cart`,{products: cartProduct });
      dispatch(getCart(userId))
    } catch (error) {}
  }
); 

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  try {
    const { data } = await instance.get(`/users/${userId}/cart`);
    return data;
  } catch (error) {}
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    load: false,
    productData: [],
    categoriesData: [],
    categoriesProductData: [],
    getProductData: [],
    searchData: [],
    getCartData: [],
    cartAdd: [],
    totalPage: +null,
    error: null,
  },
  reducers: {
    clearsearch: (state) => {
      state.searchData = [];
    },
    cartAdd: (state, action) => {
      const product = action.payload;
      const productId = product._id;
  
      const cartItem = state.cartAdd?.find(
        (item) => item.product._id === productId
      );

      if (cartItem) {
        const updateCart = state.cartAdd.map((item) =>
          item.product._id === productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
        state.cartAdd = updateCart;
      } else {
        state.cartAdd.push({ product, quantity: 1 });
      }
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
      state.getProductData = action.payload.products;
      state.categoriesData = action.payload.categories;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.load = false;
      state.error = "error get products";
    });
    builder.addCase(searchProduct.pending, (state) => {
      state.load = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.load = false;
      state.searchData = action.payload.products;
    });
    builder.addCase(searchProduct.rejected, (state) => {
      state.load = false;
      state.error = "error get products";
    });
    builder.addCase(categoriesProduct.pending, (state) => {
      state.load = true;
    });
    builder.addCase(categoriesProduct.fulfilled, (state, action) => {
      state.load = false;
      state.totalPage = action.payload.totalPages;
      state.categoriesProductData = action.payload.products;
    });
    builder.addCase(categoriesProduct.rejected, (state) => {
      state.load = false;
      state.error = "error get products";
    });
    builder.addCase(getCart.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.load = false;
      state.getCartData = action.payload.cart;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.load = false;
      state.error = "error get products";
    });
  },
});

export const productReducer = productSlice.reducer;
export const { clearsearch, cartAdd } = productSlice.actions;
