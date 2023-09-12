import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { authInstance } from '../../utils/axios';
import { logoutUser } from './authSlice';
import axios, { AxiosError } from 'axios';

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
const initialState: ChatState = {
  currentChatId: null,
  conversations: [],
  currentChatMessages: [],
  currentChatMember: null,
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
    },
    clearCurrentChatId(state) {
      state.currentChatId = null;
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
      .addCase(getConversations.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearch, setCurrentChatId, clearCurrentChatId } =
  chatSlice.actions;
export default chatSlice.reducer;
