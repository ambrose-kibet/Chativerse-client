import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import InputComponent from '../components/InputComponent';

import {
  getCurrentUser,
  changeUserInput,
  uploadImage,
  updateProfile,
} from '../redux/features/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PasswordResetForm from '../components/PasswordResetForm';
import validator from 'validator';

import { FaFileUpload } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    currentUser: { avatar, email, name },
    isLoading,
  } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
    dispatch(uploadImage(image));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserInput({ name: e.target.name, value: e.target.value }));
  };
  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('please fill all fields');
      return;
    }
    if (name.length < 3) {
      toast.error('name must be at least 3 characters');
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error('please enter a valid email');
      return;
    }
    dispatch(updateProfile({ avatar, name, email }));
  };

  return (
    <ProfileContainer>
      <form className="userDetails" onSubmit={handleUpdateProfile}>
        <div className="userDetails__avatar">
          <img src={avatar} alt="avatar" />
          <label htmlFor="avatar" className="custom-file-label">
            <span className="upload-icon">
              <FaFileUpload />
            </span>
            change avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleUploadImage}
            disabled={isLoading}
            style={{ display: 'none' }}
          />
        </div>
        <div className="details-container">
          <div className="userDetails__name">
            <h3>Full Name</h3>
            <InputComponent
              value={name}
              name="name"
              placeholder="full name"
              type="text"
              handleChange={handleChange}
            />
          </div>
          <div className="userDetails__email">
            <h3>Email</h3>
            <InputComponent
              name="email"
              placeholder="enter your email"
              type="email"
              value={email}
              handleChange={handleChange}
            />
          </div>
          <div className="btn-container">
            <button
              className="btn btn--primary"
              type="submit"
              disabled={isLoading}
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <PasswordResetForm />
    </ProfileContainer>
  );
};
export default ProfilePage;

const ProfileContainer = styled.section`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
  max-width: 700px;
  margin: 0 auto 0 0;
  align-items: flex-start;
  .userDetails {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    .userDetails__avatar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      label {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-transform: capitalize;
        .upload-icon {
          font-size: 1.5rem;
          color: var(--color-blue-400);
        }
      }
      img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        border: 3px solid var(--color-blue-400);
      }
      input {
        border: none;
        height: fit-content;
        width: fit-content;
        margin: 0 auto;
      }
    }
    .details-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      width: 100%;
      .userDetails__name,
      .userDetails__email,
      .userDetails__password {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.25rem;

        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        input {
          border: none;
          height: fit-content;
          background: var(--color-white-100);
        }
      }
      .btn-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        button {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          text-decoration: none;
          width: 100%;
          margin: auto;
        }
      }
    }
  }
`;
