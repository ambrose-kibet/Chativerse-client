import InputEmoji from 'react-input-emoji';
import { BiImageAdd } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import {
  addCurrentMessages,
  sendMessages,
  setTempMsg,
  uploadFiile,
} from '../redux/features/chatSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import socket from '../utils/socketService';
const SendComponent = () => {
  const dispatch = useAppDispatch();
  const { tempMessage, isLoading } = useAppSelector(
    (state: RootState) => state.chat
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { currentChatId, currentChatMember } = useAppSelector(
    (state: RootState) => state.chat
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (text: string) => {
    dispatch(setTempMsg({ name: 'text', value: text }));
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.files);

    if (!e.target.files?.item(0)) {
      toast.error('no file selected');
      return;
    }
    const image = e.target.files.item(0);
    if (!image?.type.startsWith('image')) {
      toast.error('please select a valid image');
      return;
    }
    const oneMb = 1024 * 1024;
    if (image?.size > oneMb) {
      toast.error('image size must be less than 1mb');
      return;
    }
    dispatch(uploadFiile(image));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tempMessage.text?.trim() && !tempMessage.imageUrl) {
      toast.error('please type a message or select an image');
      return;
    }

    // update current messages
    dispatch(addCurrentMessages(tempMessage));
    // send to websocket
    socket.emit('sendMessage', {
      ...tempMessage,
      senderDetails: {
        _id: user?.userId,
        fullName: user?.name,
        avatar: user?.avatar,
      },
    });

    // send message to server
    dispatch(
      sendMessages({
        chatId: tempMessage.chat,
        message: tempMessage.text,
        imageUrl: tempMessage.imageUrl,
        recipient: tempMessage.recipient,
      })
    );
  }
  useEffect(() => {
    if (!user?.userId || !currentChatMember?._id || !currentChatId) return;
    dispatch(setTempMsg({ name: 'sender', value: user.userId }));
    dispatch(setTempMsg({ name: 'recipient', value: currentChatMember._id }));
    dispatch(setTempMsg({ name: 'chat', value: currentChatId }));
    dispatch(setTempMsg({ name: '_id', value: uuidv4() }));
    dispatch(
      setTempMsg({
        name: 'createdAt',
        value: new Date(Date.now()).toISOString(),
      })
    );
    dispatch(
      setTempMsg({
        name: 'updatedAt',
        value: new Date(Date.now()).toISOString(),
      })
    );
  }, [
    currentChatId,
    currentChatMember,
    user,
    tempMessage.text,
    tempMessage.imageUrl,
    dispatch,
  ]);
  return (
    <FormContainer className="chat-input" onSubmit={handleSubmit}>
      <div className="image-container">
        <label htmlFor="avatar" className="custom-file-label">
          <span className="upload-icon">
            <BiImageAdd />
          </span>
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleFileUpload}
          disabled={isLoading}
          style={{ display: 'none' }}
        />
      </div>
      <InputEmoji
        value={tempMessage.text as string}
        onChange={handleChange}
        placeholder="Type a message"
        height={40}
        theme="light"
      />

      <button type="submit" className="send-btn">
        <IoIosSend />
      </button>
    </FormContainer>
  );
};
export default SendComponent;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0rem;
  .image-container {
    position: relative;
    label {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      .upload-icon {
        font-size: 2rem;
        color: var(--color-blue-400);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-gray-300);
    outline: none;
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background: transparent;
    color: var(--color-blue-400);
    font-weight: 600;
    cursor: pointer;
    outline: none;
  }
  .send-btn {
    background: var(--color-blue-400);
    color: var(--color-white-100);
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    border-radius: 50%;
    border: none;
    outline: none;
  }
  .react-emoji-picker--wrapper {
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 100;
    width: 100%;
    max-width: 340px;
    background: var(--color-white-100);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
  .react-input-emoji--input {
    max-height: 3rem;
  }
  @media screen and (max-height: 500px) {
    .react-emoji-picker--wrapper {
      max-height: 300px;
      width: 100%;
      max-width: 350px;
      overflow-y: auto;
      transform: translateY(-115%);
    }
  }
`;
