import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import product from '../../api/product';
export const getProducts = createAsyncThunk('product/getProducts', async () => {
    try {
        const response: any = await product.getProductsApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getProductsLimit = createAsyncThunk('product/getProductsLimit', async (query: string) => {
    try {
        const response: any = await product.getProductsLimitApi(query);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getNewProducts = createAsyncThunk('product/getNewProducts', async () => {
    try {
        const response: any = 1;
        // await product.getNewproductsApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        Products: [],
        msg: '',
        count: 0,
        newProducts: [],
    },
    reducers: {
        // getProducts(state, action) {
        //     state.token = null;
        //     state.msg = '';
        //     state.isLoggedIn = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            // getProducts
            .addCase(getProducts.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.Products = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.Products = [];
            })
            .addCase(getProductsLimit.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getProductsLimit.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.Products = action.payload.response?.rows || [];
                    state.msg = action.payload?.msg || '';
                    state.count = action.payload?.response?.count || 0;
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getProductsLimit.rejected, (state, action) => {
                state.Products = [];
            })

            .addCase(getNewProducts.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getNewProducts.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.newProducts = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getNewProducts.rejected, (state, action) => {
                state.newProducts = [];
            });
    },
});

const { actions, reducer } = productSlice;
export const {} = actions;
export default reducer;
