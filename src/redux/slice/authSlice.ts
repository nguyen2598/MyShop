import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '../../api/auth';

type FormValuesRegis = {
    name: string;
    email: string;
    password: string;
};
interface ResponseData {
    err: number;
    // other properties
}

interface Response {
    data: ResponseData;
    // other properties
}

export const CompleteRegister: any = createAsyncThunk<any>('auth/CompleteRegister', async (data: any) => {
    try {
        const response: any = await auth.completedRegister(data);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const LoginApi: any = createAsyncThunk('auth/Login', async (data: any) => {
    try {
        const response: any = await auth.login(data);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        msg: '',
    },
    reducers: {
        logout(state, action) {
            state.token = null;
            state.msg = '';
            state.isLoggedIn = false;
        },
        setMSG(state, action) {
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(CompleteRegister.pending, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(CompleteRegister.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.isLoggedIn = true;
                    state.token = action.payload.token;
                } else {
                    state.isLoggedIn = false;
                    state.msg = action.payload.msg;
                    state.token = null;
                }
            })
            .addCase(CompleteRegister.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
            })

            // login
            .addCase(LoginApi.pending, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(LoginApi.fulfilled, (state, action) => {
                if (action?.payload?.err === 0) {
                    state.isLoggedIn = true;
                    state.token = action.payload.token;
                    state.msg = '';
                } else {
                    state.isLoggedIn = false;
                    state.msg = action.payload?.msg;
                    state.token = null;
                }
            })
            .addCase(LoginApi.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
            });
    },
});

const { actions, reducer } = authSlice;
export const { logout, setMSG } = actions;
export default reducer;
