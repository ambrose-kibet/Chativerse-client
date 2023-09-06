import styled from 'styled-components';
import { useState } from 'react';
import InputComponent from './InputComponent';
import { handleChange } from '../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import type { RootState } from '../redux/store';
import PasswordComponent from './PasswordInput.tsx';
const AuthComponent = () => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {
    tempUser: { confirmPassword, email, fullName, password },
  } = useAppSelector((state: RootState) => state.auth);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };
  const toggleAuth = () => {
    setIsRegister((oldVal) => !oldVal);
  };
  return (
    <AuthContainer>
      <p className="title">welcome {isRegister ? '' : 'back'}</p>

      <form>
        <h4>{isRegister ? 'Create an' : 'Login your'} account</h4>
        {isRegister && (
          <InputComponent
            name="fullName"
            placeholder="full name"
            type="text"
            handleChange={handleInputChange}
            value={fullName}
          />
        )}
        <InputComponent
          name="email"
          placeholder="email"
          type="email"
          handleChange={handleInputChange}
          value={email}
        />
        <PasswordComponent
          name="password"
          placeholder="password"
          handleChange={handleInputChange}
          value={password}
        />
        {isRegister && (
          <PasswordComponent
            name="confirmPassword"
            placeholder="confirm password"
            handleChange={handleInputChange}
            value={confirmPassword}
          />
        )}
        <button type="submit" className="btn submit-btn">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <div>
        <p>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
        </p>
        <button type="button" onClick={toggleAuth} className="btn-toggler">
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </AuthContainer>
  );
};
export default AuthComponent;

const AuthContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;

  .title {
    padding: 0.5rem 1.5rem;
    margin-top: 0.5rem;
    background: linear-gradient(
      45deg,
      var(--color-blue-200),
      var(--color-blue-400)
    );
    border-radius: 2.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: var(--color-white-100);
    position: absolute;
    letter-spacing: 2px;
    top: 0;
    left: 0;
  }

  form {
    width: 100%;
    padding: 1rem 1.5rem;
    max-width: 350px;
    h4 {
      margin-bottom: 1rem;
      text-align: center;
      font-size: 1rem;
    }
    .submit-btn {
      padding: 0.75rem 1.5rem;
      margin: auto;
      margin-top: 1rem;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    p {
      margin: 0;
      margin-right: 0.5rem;
      color: var(--color-gray);
      font-size: 1rem;
    }
    .btn-toggler {
      background: transparent;
      border: none;
      color: var(--color-blue-400);
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    .title {
      display: none;
    }
  }
`;
