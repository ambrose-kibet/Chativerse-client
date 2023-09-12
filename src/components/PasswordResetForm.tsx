import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { changeUserInput, updatePassword } from '../redux/features/userSlice';
import PasswordComponent from './PasswordInput';
const PasswordResetForm = () => {
  const dispatch = useAppDispatch();
  const {
    currentUser: { confirmPassword, newPassword, oldPassword },
    isLoading,
  } = useAppSelector((state: RootState) => state.user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserInput({ name: e.target.name, value: e.target.value }));
  };
  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('please fill all fields');
      return;
    }
    if (
      newPassword.length < 6 ||
      confirmPassword.length < 6 ||
      oldPassword.length < 6
    ) {
      toast.error('password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('passwords do not match');
      return;
    }
    dispatch(updatePassword({ oldPassword, newPassword }));
  };
  return (
    <form className="userDetails" onSubmit={handleUpdatePassword}>
      <div className="details-container">
        <div className="userDetails__password">
          <h3>Old Password</h3>
          <PasswordComponent
            name="oldPassword"
            placeholder="old password"
            value={oldPassword}
            handleChange={handleChange}
          />
        </div>
        <div className="userDetails__password">
          <h3>New Password</h3>
          <PasswordComponent
            name="newPassword"
            placeholder="new password"
            value={newPassword}
            handleChange={handleChange}
          />
        </div>
        <div className="userDetails__password">
          <h3>Confirm Password</h3>
          <PasswordComponent
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            handleChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <button
            className="btn btn--primary"
            type="submit"
            disabled={isLoading}
          >
            Update Password
          </button>
        </div>
      </div>
    </form>
  );
};
export default PasswordResetForm;
