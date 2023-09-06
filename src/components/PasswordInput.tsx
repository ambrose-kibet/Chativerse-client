import styled from 'styled-components';
import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';

type InputComponentProps = {
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordComponent = ({
  name,
  placeholder,
  value,
  handleChange,
}: InputComponentProps) => {
  const [isPassword, setIsPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPassword((oldVal) => !oldVal);
  };

  return (
    <Input>
      <input
        type={isPassword ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <button type="button" onClick={togglePasswordVisibility}>
        {isPassword ? <BiShow /> : <BiHide />}
      </button>
    </Input>
  );
};

export default PasswordComponent;

const Input = styled.div`
  position: relative;
  background: transparent;
  margin-bottom: 1rem;
  input {
    width: 100%;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-primary);
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--color-gray);
    &::placeholder {
      color: var(--color-primary);
      text-transform: capitalize;
      color: var(--color-gray);
      letter-spacing: 0.1rem;
    }
  }
  button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    background: transparent;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: var(--color-gray);
  }
`;
