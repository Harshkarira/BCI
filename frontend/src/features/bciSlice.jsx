// bciSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  powValues: {
    pow_f3_theta: null,
    pow_f3_beta_l: null,
    pow_f4_theta: null,
    pow_f4_beta_l: null,
  },
  prediction: null,
};

const bciSlice = createSlice({
  name: 'bci',
  initialState,
  reducers: {
    updatePowValues: (state, action) => {
      state.powValues = action.payload;
    },
    updatePrediction: (state, action) => {
      state.prediction = action.payload;
    },
  },
});

export const { updatePowValues, updatePrediction } = bciSlice.actions;

export default bciSlice.reducer;
