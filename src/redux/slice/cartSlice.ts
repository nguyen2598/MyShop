import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cart from '../../api/cart';
export const getCountCart: any = createAsyncThunk('cart/getCountCart', async (id: number) => {
    try {
        const response: any = await cart.getCountCartApi(id);
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
    name: 'cart',
    initialState: {
        counts: 0,
        msgCount: '',
    },
    reducers: {
        setCartCount(state, action) {
            state.counts = state.counts + 1;
        },
        reSetCartCount(state, action) {
            state.counts = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // getProducts
            .addCase(getCountCart.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getCountCart.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.counts = action.payload.count;
                    state.msgCount = action.payload?.msg || '';
                } else {
                    state.msgCount = action.payload?.msg;
                }
            })
            .addCase(getCountCart.rejected, (state, action) => {
                state.counts = 0;
            });
    },
});

const { actions, reducer } = productSlice;
export const { setCartCount, reSetCartCount } = actions;
export default reducer;
