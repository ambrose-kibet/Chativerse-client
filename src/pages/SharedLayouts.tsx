import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
const SharedLayouts = () => {
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
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
