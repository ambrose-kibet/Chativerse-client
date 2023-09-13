import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { clearCurrentChatInfo, createChat } from '../redux/features/chatSlice';

const SingleChat = () => {
  const dispatch = useAppDispatch();
  const { currentChatId, currentChatMember } = useAppSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    if (currentChatId) return;
    if (!currentChatMember) return;
    dispatch(createChat({ recipientId: currentChatMember?._id }));
  }, [currentChatId, currentChatMember, dispatch]);
  const clearMember = () => {
    dispatch(clearCurrentChatInfo());
  };
  return (
    <SingleChatContainer>
      <div className="chat-header">
        <Link to="/dashboard/chats" onClick={clearMember}>
          <FaArrowLeftLong />
        </Link>
        <div className="user-info">
          <img src={currentChatMember?.avatar} alt="avatar" />
          <div>
            <h3>{currentChatMember?.fullName}</h3>
            <p>
              <span className="status"></span>online
            </p>
          </div>
        </div>
      </div>
      <div className="chat-body">
        <div className="chat">
          <p className="chat-text">Hello</p>
        </div>
        <div className="chat">
          <p className="chat-text">Hello</p>
        </div>
        <div className="chat"></div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
    </SingleChatContainer>
  );
};
export default SingleChat;

const SingleChatContainer = styled.section`
  display: flex;

  .chat-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--color-gray-300);
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
        .status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-green);
          display: inline-block;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
