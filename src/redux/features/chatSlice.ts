import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { authInstance } from '../../utils/axios';
import { logoutUser } from './authSlice';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export type IMessage = {
  [key: string]: string | number | undefined;
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
type IUnreadMessages = {
  [userId: string]: number;
};
export type IChatObject = {
  _id: string;
  member1Details: IMember[];
  member2Details: IMember[];
  messages: IMessage[];
  unreadMessages: IUnreadMessages;
  latestMessage: IMessage;
};
export interface ChatState {
  [key: string]: unknown | null | boolean | string | IMessage[] | IMember[];
  currentChatId: string | null;
  conversations: IChatObject[];
  currentChatMessages: IMessage[];
  currentChatMember: IMember | null;
  isLoading: boolean;
  searchTerm: string;
  tempMessage: IMessage;
  unreadMessagesCount: number;
}
const getCurentChatMember = () => {
  const currentChatMember = localStorage.getItem('currentChatMember');
  if (currentChatMember) {
    return JSON.parse(currentChatMember);
  }
  return null;
};
const tempMessage: IMessage = {
  chat: '',
  recipient: '',
  sender: '',
  imageUrl: '',
  text: '',
  _id: '',
  createdAt: '',
  updatedAt: '',
};
const initialState: ChatState = {
  currentChatId: localStorage.getItem('currentChatId') || null,
  conversations: [],
  currentChatMessages: [],
  currentChatMember: getCurentChatMember(),
  isLoading: false,
  searchTerm: '',
  tempMessage,
  unreadMessagesCount: 0,
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
      dispatch(getConversations());
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
export const uploadFiile = createAsyncThunk(
  'chat/uploadFile',
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
export const sendMessages = createAsyncThunk(
  'chat/sendMessages',
  async (
    tempMessage: {
      chatId: string;
      message: string | undefined;
      imageUrl: string | undefined;
      recipient: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await authInstance.post('/messages', tempMessage);
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
export const markMessagesAsRead = createAsyncThunk(
  'chat/markMessagesAsRead',
  async (chatId: string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authInstance.patch(`/chats/${chatId}`);

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
    setTempMsg: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: string; value: string }>
    ) => {
      return { ...state, tempMessage: { ...state.tempMessage, [name]: value } };
    },
    addCurrentMessages: (state, action: PayloadAction<IMessage>) => {
      state.currentChatMessages.push(action.payload);
    },
    clearCurrentChatInfo: (state) => {
      state.currentChatId = null;
      state.currentChatMember = null;
      state.currentChatMessages = [];
      state.tempMessage = tempMessage;
    },
    getUnreadMessagesCount: (
      state,
      { payload: userId }: PayloadAction<string>
    ) => {
      const unreadMessagesCount = state.conversations.reduce(
        (acc, curr) => acc + curr.unreadMessages[userId] || 0,
        0
      );
      state.unreadMessagesCount = unreadMessagesCount;
    },
    updateConversations: (state, { payload }: PayloadAction<IChatObject[]>) => {
      state.conversations = payload;
    },
    addConversation: (state, { payload }: PayloadAction<IChatObject>) => {
      state.conversations.unshift(payload);
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
    builder
      .addCase(uploadFiile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFiile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tempMessage.imageUrl = payload.url;
        toast.info('Image selected', {
          hideProgressBar: true,
          position: 'bottom-center',
        });
      })
      .addCase(uploadFiile.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(sendMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessages.fulfilled, (state) => {
        state.isLoading = false;

        state.tempMessage = tempMessage;
      })
      .addCase(sendMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
    builder
      .addCase(markMessagesAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markMessagesAsRead.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markMessagesAsRead.rejected, (state, { payload }) => {
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
  setTempMsg,
  addCurrentMessages,
  getUnreadMessagesCount,
  updateConversations,
  addConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
