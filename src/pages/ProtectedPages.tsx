import { ReactElement } from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
const ProtectedPages = ({ children }: { children: ReactElement }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};
export default ProtectedPages;
