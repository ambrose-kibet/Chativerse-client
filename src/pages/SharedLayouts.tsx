import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import socket from '../utils/socketService';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { setOnlineUsers } from '../redux/features/userSlice';
import {
  IChatObject,
  IMember,
  IMessage,
  addConversation,
  addCurrentMessages,
  markMessagesAsRead,
  updateConversations,
} from '../redux/features/chatSlice';

const SharedLayouts = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { currentChatId, conversations } = useAppSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    socket.emit('join', user?.userId);
    return () => {
      socket.off('join');
    };
  }, [user?.userId]);

  useEffect(() => {
    return () => {
      socket.emit('leave', user?.userId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.on('updateOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => {
      socket.off('updateOnlineUsers');
      socket.off('getMessage');
    };
  }, [dispatch]);
  useEffect(() => {
    socket.on('getMessage', (message: IMessage) => {
      const { chat } = message;
      if (currentChatId === chat) {
        dispatch(addCurrentMessages(message));
        dispatch(markMessagesAsRead(chat));
      } else {
        if (conversations.find((conversation) => conversation._id === chat)) {
          const updatedConversations = conversations.map((conversation) => {
            if (conversation._id === chat) {
              return {
                ...conversation,
                unreadMessages: {
                  ...conversation.unreadMessages,
                  [message.recipient]:
                    conversation.unreadMessages[message.recipient] + 1, //revisit this
                },
                messages: [...conversation.messages, message],
                latestMessage: message,
              };
            } else {
              return conversation;
            }
          });
          dispatch(updateConversations(updatedConversations));
        } else {
          const newConversation: IChatObject = {
            _id: chat,
            latestMessage: message,
            member1Details: [message.senderDetails as unknown as IMember],
            member2Details: [
              {
                _id: user?.userId,
                fullName: user?.name,
                avatar: user?.avatar,
              } as IMember,
            ],
            messages: [message],
            unreadMessages: {
              [message.recipient]: 1,
            },
          };
          dispatch(addConversation(newConversation));
        }
      }
    });
    return () => {
      socket.off('getMessage');
    };
  }, [
    dispatch,
    conversations,
    currentChatId,
    user?.avatar,
    user?.name,
    user?.userId,
  ]);
  return (
    <MainContainer>
      <Navbar />
      <Outlet />
    </MainContainer>
  );
};
export default SharedLayouts;

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
