import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import ConversationsContainer from '../components/ConversationsContainer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getConversations } from '../redux/features/chatSlice';
import { RootState } from '../redux/store';
const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector((state: RootState) => state.chat);
  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);
  return (
    <ChatsContainer>
      <div className="chats-header">
        <div className="title-container">
          <h3>Chats</h3>
          <p>Recent Chats</p>
        </div>
        <Link to="/dashboard/contacts" className="btn">
          <FaPlus className="btn-icon" />
          Create Chat
        </Link>
      </div>
      {(conversations.length === 0 && <p>No conversations yet...</p>) || (
        <ConversationsContainer />
      )}
    </ChatsContainer>
  );
};
export default ChatsPage;
const ChatsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  height: 100vh;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 0 0;
  gap: 0rem;
  align-items: flex-start;

  .chats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-container {
      h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--color-blue-400);
      }
      p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--color-blue-400);
      }
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      color: var(--color-white-100);
      .btn-icon {
        margin-right: 0.5rem;
      }
    }
  }
  p {
    margin: 0;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    .chats-header {
      display: none;
    }
  }
`;
