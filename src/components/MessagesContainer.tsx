import styled from 'styled-components';
import { IMessage, getMessages } from '../redux/features/chatSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useEffect, useRef } from 'react';
import hello from '../assets/say-hello.gif';
import moment from 'moment';
const MessagesContainer = () => {
  const dispatch = useAppDispatch();
  const { currentChatId, currentChatMessages } = useAppSelector(
    (state: RootState) => state.chat
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!currentChatId) return;
    dispatch(getMessages(currentChatId));
  }, [currentChatId, dispatch]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatMessages]);

  return (
    <Messages>
      {(currentChatMessages.length > 0 &&
        currentChatMessages.map((message: IMessage) => {
          return (
            <div
              className={user?.userId === message.sender ? 'chat sent' : 'chat'}
              key={message._id}
            >
              {message.imageUrl && <img src={message.imageUrl} alt="image" />}
              {message.text && <p className="chat-text">{message.text}</p>}
              <p className="date">{moment(message.createdAt).calendar()}</p>
            </div>
          );
        })) || (
        <div className="no-messages">
          <div className="img-container">
            <img src={hello} alt="hello gif" />
          </div>
          <h3>Say hello...</h3>
        </div>
      )}

      <div className="last-item" ref={messagesEndRef}></div>
    </Messages>
  );
};
export default MessagesContainer;
const Messages = styled.div`
  height: calc(100vh - 9.5rem);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.25rem;
  padding: 0 0.5rem;
  width: 100%;

  .chat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 0.5rem;
    max-width: 330px;
    background: var(--color-white-100);
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
    .chat-text {
      margin: 0;
      font-size: 0.75rem;
      color: var(--color-gray);
      text-align: left;
      font-weight: 500;
      letter-spacing: 0.1rem;
    }

    .date {
      margin: 0;
      font-size: 0.5rem;
      color: var(--color-gray);
      text-align: right;
    }
  }
  .sent {
    margin-left: auto;
    align-items: flex-end;
    background: var(--color-blue-400);
    color: var(--color-white-100);
    .chat-text {
      color: var(--color-white-100);
      letter-spacing: 0.15rem;
    }
    .date {
      color: var(--color-white-100);
    }
  }
  .last-item {
    width: 100%;
    height: 0.25rem;
    visibility: hidden;
  }
  .no-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    h3 {
      margin: 0;
      font-size: 1rem;
      color: var(--color-blue-400);
      text-align: center;
      text-transform: capitalize;
      font-weight: 700;
    }
    .img-container {
      width: 100%;
      max-width: 300px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
