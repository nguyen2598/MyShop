import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const titleSlice = createSlice({
    name: 'title',
    initialState: {
        headerName:''
    },
    reducers: {
        setTitleHeaderName(state, action) {
            state.headerName = action.payload
        },
    },
    
});

const { actions, reducer } = titleSlice;
export const {setTitleHeaderName} = actions;
export default reducer;
