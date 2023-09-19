import axios, { AxiosError } from 'axios';
import { logoutUser } from '../redux/features/authSlice';

type DispatchType = (action: unknown) => void;

type RejectWithValueType = (reason: string) => unknown;

export const handleAsyncThunkError = (
  error: unknown,
  dispatch: DispatchType,
  rejectWithValue: RejectWithValueType
) => {
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
};
