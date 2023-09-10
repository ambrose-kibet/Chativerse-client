import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { authInstance } from '../../utils/axios';

type ItempUser = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type Tuser = {
  userId: string;
  name: string;
  avatar: string;
};
type authState = {
  tempUser: ItempUser;
  user: null | Tuser;
  isLoading: boolean;
};
const tempUser: ItempUser = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
type IhandleChange = {
  [key: string]: string;
};

const initialState: authState = {
  tempUser,
  user: getFromLocalStorage('chat-user'),
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: Partial<ItempUser>, thunkAPI) => {
    try {
      const response = await authInstance.post('/auth/register', payload);
      const setCookieHeaders = response.headers['set-cookie'];

      // Set each cookie in the browser's document.cookie
      if (setCookieHeaders) {
        setCookieHeaders.forEach((cookieHeader) => {
          document.cookie = cookieHeader;
        });
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type control Axios error
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          // Handle HTTP error
          return thunkAPI.rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          // Handle request made but no response received
          return thunkAPI.rejectWithValue('No response received');
        } else {
          // Handle generic network error
          return thunkAPI.rejectWithValue('Network error');
        }
      }
      // Handle non-Axios error
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authInstance.post('/auth/login', payload);
      const setCookieHeaders = response.headers['set-cookie'];
      // Set each cookie in the browser's document.cookie
      if (setCookieHeaders) {
        setCookieHeaders.forEach((cookieHeader) => {
          document.cookie = cookieHeader;
        });
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type control Axios error
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          // Handle HTTP error
          return thunkAPI.rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          // Handle request made but no response received
          return thunkAPI.rejectWithValue('No response received');
        } else {
          // Handle generic network error
          return thunkAPI.rejectWithValue('Network error');
        }
      }
      // Handle non-Axios error
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await authInstance.delete('/auth/logout');
      const setCookieHeaders = response.headers['set-cookie'];
      // Set each cookie in the browser's document.cookie
      if (setCookieHeaders) {
        setCookieHeaders.forEach((cookieHeader) => {
          document.cookie = cookieHeader;
        });
      }
      removeFromLocalStorage('chat-user');
      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type control Axios error
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          // Handle HTTP error
          return thunkAPI.rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          // Handle request made but no response received
          return thunkAPI.rejectWithValue('No response received');
        } else {
          // Handle generic network error
          return thunkAPI.rejectWithValue('Network error');
        }
      }
      // Handle non-Axios error
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload: { name, value } }: PayloadAction<IhandleChange>
    ) => {
      state.tempUser = { ...state.tempUser, [name]: value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        saveToLocalStorage('chat-user', payload.user);
        state.user = payload.user;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        saveToLocalStorage('chat-user', payload.user);
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        toast.error(payload as string);
      });
  },
});

export const { handleChange } = authSlice.actions;
export default authSlice.reducer;
