import { Tuser } from '../redux/features/authSlice';

export const saveToLocalStorage = (key: string, value: Tuser): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key: string): Tuser | null => {
  const user = localStorage.getItem(key);
  if (!user) return null;
  return JSON.parse(user);
};
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
