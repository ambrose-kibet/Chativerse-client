import InputEmoji from 'react-input-emoji';
import { BiImageAdd } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import { useState } from 'react';
import styled from 'styled-components';
const SendComponent = () => {
  const [text, setText] = useState('');

  function handleOnEnter(text: string) {
    console.log('enter', text);
  }
  return (
    <FormContainer className="chat-input">
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
          accept="image/*"
          // onChange={handleUploadImage}
          // disabled={isLoading}
          style={{ display: 'none' }}
        />
      </div>
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
        height={50}
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
`;
