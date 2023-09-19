import styled from 'styled-components';
import happy from '../assets/happy.svg';
import AuthComponent from '../components/AuthComponent';
const AuthPage = () => {
  return (
    <AuthContainer>
      <div className="image-decoration">
        <div className="image-container">
          <img src={happy} alt="happy user" width="100%" />
        </div>
        <p>Unlock the Chativerse: Where Words Become Friends</p>
      </div>
      <AuthComponent />
    </AuthContainer>
  );
};
export default AuthPage;

const AuthContainer = styled.section`
  min-height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 6fr 4fr;
  .image-decoration {
    background: linear-gradient(
      180deg,
      var(--color-blue-200),
      var(--color-blue-400)
    );
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .image-container {
      width: 100%;
      max-width: 500px;
    }
    p {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      color: var(--color-white-100);
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    .image-decoration {
      display: none;
    }
  }
`;
