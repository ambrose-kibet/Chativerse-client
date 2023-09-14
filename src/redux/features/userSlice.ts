import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { authInstance } from '../../utils/axios';
import { IMember } from './chatSlice';
import { toast } from 'react-toastify';
import { logoutUser, setUser } from './authSlice';
import axios, { AxiosError } from 'axios';
import { saveToLocalStorage } from '../../utils/localStorage';

type ICurrentUser = {
  [key: string]: string;
  avatar: string;
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
type IuserState = {
  [key: string]: boolean | string | IMember[] | ICurrentUser;
  contacts: IMember[];
  contactSerachTerm: string;
  isLoading: boolean;
  currentUser: ICurrentUser;
};

const initialState: IuserState = {
  contacts: [],
  contactSerachTerm: '',
  isLoading: false,
  currentUser: {
    avatar: '',
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
};
export const getContacts = createAsyncThunk(
  'user/getContacts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authInstance.get('/users/contacts');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            dispatch(logoutUser());
            return rejectWithValue('Unauthorized Logging you out...');
          }
          return rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          return rejectWithValue('No response received');
        } else {
          return rejectWithValue('Network error');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authInstance.get('/users');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            dispatch(logoutUser());
            return rejectWithValue('Unauthorized Logging you out...');
          }
          return rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          return rejectWithValue('No response received');
        } else {
          return rejectWithValue('Network error');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (
    data: { oldPassword: string; newPassword: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await authInstance.patch('/users/update-password', data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            dispatch(logoutUser());
            return rejectWithValue('Unauthorized Logging you out...');
          }
          return rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          return rejectWithValue('No response received');
        } else {
          return rejectWithValue('Network error');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async (file: File, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await authInstance.post('/users/upload-image', formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            dispatch(logoutUser());
            return rejectWithValue('Unauthorized Logging you out...');
          }
          return rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          return rejectWithValue('No response received');
        } else {
          return rejectWithValue('Network error');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    data: { avatar: string; name: string; email: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await authInstance.patch('/users', data);
      const setCookieHeaders = response.headers['set-cookie'];
      // Set each cookie in the browser's document.cookie
      if (setCookieHeaders) {
        setCookieHeaders.forEach((cookieHeader) => {
          document.cookie = cookieHeader;
        });
      }
      saveToLocalStorage('chat-user', {
        userId: response.data.user.userId,
        avatar: response.data.user.avatar,
        name: response.data.user.name,
      });
      dispatch(
        setUser({
          userId: response.data.user.userId,
          avatar: response.data.user.avatar,
          name: response.data.user.name,
        })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: string }, unknown>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            dispatch(logoutUser());
            return rejectWithValue('Unauthorized Logging you out...');
          }
          return rejectWithValue(axiosError.response.data.msg);
        } else if (axiosError.request) {
          return rejectWithValue('No response received');
        } else {
          return rejectWithValue('Network error');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearch: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof typeof initialState; value: string }>
    ) => {
      return { ...state, [name]: value };
    },
    changeUserInput: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{
        name: keyof typeof initialState.currentUser;
        value: string;
      }>
    ) => {
      return { ...state, currentUser: { ...state.currentUser, [name]: value } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload.contacts;
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = { ...state.currentUser, ...payload.user };
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Password updated successfully');
        state.currentUser = {
          ...state.currentUser,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        };
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = { ...state.currentUser, avatar: payload.url };
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Profile updated successfully');
        state.currentUser = { ...state.currentUser, ...payload.user };
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setSearch, changeUserInput } = userSlice.actions;
export default userSlice.reducer;
