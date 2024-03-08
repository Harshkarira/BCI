// bciSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  powValues: {
    pow_f3_theta: null,
    pow_f3_beta_l: null,
    pow_f4_theta: null,
    pow_f4_beta_l: null,
    pow_f3_gamma: null,
    pow_f4_gamma: null,
    pow_f7_gamma: null,
    pow_f8_gamma: null,
    pow_t7_gamma: null,
    pow_t8_gamma: null,
    pow_f7_theta: null,
    pow_f8_theta: null,
    pow_t7_theta: null,
    pow_t8_theta: null,
  },
  attention_prediction: null,
  order_prediction: null,
  memory_prediction: null,
};

const bciSlice = createSlice({
  name: 'bci',
  initialState,
  reducers: {
    updatePowValues: (state, action) => {
      state.powValues = action.payload;
    },
    updateAttentionPrediction: (state, action) => {
      state.attention_prediction = action.payload;
    },
    updateOrderPrediction: (state, action) => {
      state.order_prediction = action.payload;
    },
    updateMemoryPrediction: (state, action) => {
      state.memory_prediction = action.payload;
    },
    updatePredictions: (state, action) => { // Add a reducer to update predictions
      state.predictions = action.payload;
    },
  },
});

export const { 
  updatePowValues, 
  updateAttentionPrediction, 
  updateOrderPrediction, 
  updateMemoryPrediction,
} = bciSlice.actions;

export default bciSlice.reducer;
