import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});

export const { addCustomer } = customersSlice.actions;

export default customersSlice.reducer;
