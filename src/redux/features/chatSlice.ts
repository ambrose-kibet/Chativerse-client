import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { authInstance } from '../../utils/axios';
import { logoutUser } from './authSlice';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type IMessage = {
  _id?: string;
  sender: string;
  recipient: string;
  text?: string;
  imageUrl?: string;
  chat: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type IMember = {
  _id: string;
  fullName: string;
  avatar: string;
};

export type IChatObject = {
  _id: string;
  messages: IMessage[];
  createdAt: string;
  otherMembers: IMember[];
  latestMessageCreatedAt: string;
};
export interface ChatState {
  [key: string]: unknown | null | boolean | string | IMessage[] | IMember[];
  currentChatId: string | null;
  conversations: IChatObject[];
  currentChatMessages: IMessage[];
  currentChatMember: IMember | null;
  isLoading: boolean;
  searchTerm: string;
}
const getCurentChatMember = () => {
  const currentChatMember = localStorage.getItem('currentChatMember');
  if (currentChatMember) {
    return JSON.parse(currentChatMember);
  }
  return null;
};

const initialState: ChatState = {
  currentChatId: localStorage.getItem('currentChatId') || null,
  conversations: [],
  currentChatMessages: [],
  currentChatMember: getCurentChatMember(),
  isLoading: false,
  searchTerm: '',
};
export const getConversations = createAsyncThunk(
  'chat/getConversations',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authInstance.get('/chats');
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
export const createChat = createAsyncThunk(
  'chat/createChat',
  async (
    { recipientId }: { recipientId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await authInstance.post('/chats', { recipientId });

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

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (chatId: string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authInstance.get(`/messages/${chatId}`);
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
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSearch(
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof typeof initialState; value: string }>
    ) {
      return { ...state, [name]: value };
    },
    setCurrentChatId(state, action: PayloadAction<string>) {
      state.currentChatId = action.payload;
      localStorage.setItem('currentChatId', action.payload);
    },

    setCurrentChatMember: (state, { payload }: PayloadAction<IMember>) => {
      state.currentChatMember = payload;
      localStorage.setItem('currentChatMember', JSON.stringify(payload));
    },

    clearCurrentChatInfo: (state) => {
      state.currentChatId = null;
      state.currentChatMember = null;
      state.currentChatMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.conversations = payload.chats;
      })
      .addCase(getConversations.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentChatId = payload.chat._id;
      })
      .addCase(createChat.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentChatMessages = payload.messages;
      })
      .addCase(getMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const {
  setSearch,
  setCurrentChatId,
  clearCurrentChatInfo,
  setCurrentChatMember,
} = chatSlice.actions;
export default chatSlice.reducer;
