// src/redux/slices/FormDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otpInput: false,
  courseCreation: {
    creation: false,
    creationStep: null,
  },
};

export const GlobalVarSlice = createSlice({
  name: 'globalVars',
  initialState,
  reducers: {
    setOtpInput(state, action) {
      state.otpInput = action.payload;
    },

  },
});

export const { setOtpInput, setCourseCreation, setCourseCreationStep, setCourseId } = GlobalVarSlice.actions;

export default GlobalVarSlice.reducer;
