import styled from 'styled-components';
import chatImage from '../assets/chat-too.svg';
import { Link } from 'react-router-dom';
import { IoCheckbox } from 'react-icons/io5';
const LandingPage = () => {
  return (
    <LandingContainer>
      <div className="bg-gradient"></div>
      <div className="grid-container">
        <article className="landing-text">
          <h2> Chat with random Strangers I am...</h2>
          <div className="agree">
            <button type="button">
              <IoCheckbox />
            </button>
            <small>
              By using chat App you agree to Terms and privacy policy
            </small>
          </div>
          <Link to="/auth">Get Started Now</Link>
        </article>
        <div className="landing-image">
          <img src={chatImage} alt="chat Image" />
        </div>
      </div>
    </LandingContainer>
  );
};
export default LandingPage;

const LandingContainer = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 120vw;
    z-index: -1;
    background: linear-gradient(
      90deg,
      var(--color-blue-600),
      var(--color-blue-200)
    );
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 30%;
    transform: translateX(-12%);
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-items: center;
    color: var(--color-white-100);
    padding: 0 2rem;
    max-width: var(--max-width);
    .landing-text {
      display: grid;
      align-items: center;
      width: 100%;
      h2 {
        margin-bottom: 1.25rem;
        text-transform: capitalize;
      }
      .agree {
        display: flex;
        align-items: center;
        button {
          background: transparent;
          border: none;
          color: var(--color-white-100);
          font-size: 1.5rem;
          margin-right: 0.5rem;
          margin-bottom: 0;
        }
        small {
          font-size: 0.75rem;
          text-transform: capitalize;
          margin: 0;
        }
      }
      a {
        text-decoration: none;
        color: var(--color-white-100);
        width: fit-content;
        background: var(--color-blue-800);
        padding: 0.75rem 1.5rem;
        border-radius: 2.5rem;
        border-bottom-right-radius: 0;
        margin-top: 1rem;
        border: none;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: var(--color-white-200);
          outline: 1px solid var(--color-blue-800);
          outline-offset: 2px;
          color: var(--color-blue-800);
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .landing-image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 95%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .bg-gradient {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      transform: translateX(0);
    }
    .grid-container {
      grid-template-columns: 1fr;
      justify-content: center;

      .landing-text {
        max-width: 500px;
      }
      .landing-image {
        display: none;
      }
    }
  }
`;
