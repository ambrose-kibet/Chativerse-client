import { getUnreadMessagesCount } from '../redux/features/chatSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
const Count = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { unreadMessagesCount, conversations } = useAppSelector(
    (state: RootState) => state.chat
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) return;
    dispatch(getUnreadMessagesCount(user.userId));
  }, [conversations, user, dispatch]);
  if (unreadMessagesCount === 0) return null;
  return (
    <span className="pill" style={{ color: 'white' }}>
      {unreadMessagesCount}
    </span>
  );
};
export default Count;
