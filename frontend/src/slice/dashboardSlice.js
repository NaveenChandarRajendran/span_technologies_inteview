import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
import axios from 'axios';

const initialState = {
    enities: [],
    loading: false
}


export const getEmployeeList = createAsyncThunk('posts/getEmployeeList', async (thunkAPI) => {
    const response = await axios.get('http://localhost:3001/employeedetails')
    if (response && response.data) {
        return response.data;
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getEmployeeList.pending, (state, action) => {
            state.loading = true
        }).addCase(getEmployeeList.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("payload", payload);
            state.enities = payload
        }).addCase(getEmployeeList.rejected, (state, action) => {
            state.loading = false
        }).addCase(PURGE, () => {
            return initialState;
          });
    }
})


const employeeReducer = employeeSlice.reducer
export default employeeReducer;
