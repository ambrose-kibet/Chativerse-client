import { createSlice } from '@reduxjs/toolkit';

type ItempUser = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type Tuser = {
  _id: string;
  name: string;
  avatar: string;
};
type authState = {
  tempUser: ItempUser;
  user: null | Tuser;
};
const tempUser: ItempUser = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialState: authState = {
  tempUser,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.tempUser = { ...state.tempUser, [name]: value };
    },
  },
});

export const { handleChange } = authSlice.actions;
export default authSlice.reducer;
