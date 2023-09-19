import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { createChat } from '../redux/features/chatSlice';

import MessagesContainer from '../components/MessagesContainer';
import SendComponent from '../components/SendComponent';

const SingleChat = () => {
  const dispatch = useAppDispatch();
  const { currentChatMember } = useAppSelector(
    (state: RootState) => state.chat
  );
  const { onlineUsers } = useAppSelector((state: RootState) => state.user);
  const isOnline = onlineUsers.find(
    (onlineUser: string) => onlineUser === currentChatMember?._id
  );
  useEffect(() => {
    if (!currentChatMember) return;
    dispatch(createChat({ recipientId: currentChatMember?._id }));
  }, [currentChatMember, dispatch]);

  return (
    <SingleChatContainer>
      <div className="chat-header">
        <Link to="/dashboard/chats">
          <FaArrowLeftLong />
        </Link>
        <div className="user-info">
          <img src={currentChatMember?.avatar} alt="avatar" />
          <div>
            <h3>{currentChatMember?.fullName}</h3>
            <p>
              <span
                className={isOnline ? 'status' : 'status status-gray'}
              ></span>
              {isOnline ? 'online' : 'offline'}
            </p>
          </div>
        </div>
      </div>
      <MessagesContainer />
      <SendComponent />
    </SingleChatContainer>
  );
};
export default SingleChat;

const SingleChatContainer = styled.section`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  padding: 0 0.5rem;
  max-width: 700px;
  margin: 0 auto 0 0;
  align-items: flex-start;
  position: relative;

  .chat-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.3rem;
    position: sticky;
    top: 0;
    left: 0;
    a {
      color: var(--color-blue-400);
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid var(--color-blue-400);
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        text-transform: capitalize;
        color: var(--color-blue-400);
      }
      p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--color-gray);
      }
    }
  }
`;
