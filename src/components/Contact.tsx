import styled from 'styled-components';
import { IMember } from '../redux/features/chatSlice';
import { Link } from 'react-router-dom';

const Contact = ({ contact }: { contact: IMember }) => {
  const { avatar, fullName, _id } = contact;
  return (
    <ContactContainer to={`/dashboard/chats/${_id}`}>
      <div className="avatar-container">
        <img src={avatar} alt={fullName} />
      </div>
      <div className="contact-info">
        <h3>{fullName}</h3>
        {/* remeber to change this */}
        <p>online</p>
      </div>
    </ContactContainer>
  );
};
export default Contact;
const ContactContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  .avatar-container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--color-blue-400);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .contact-info {
    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-blue-400);
      text-transform: capitalize;
    }
    p {
      margin: 0;
      font-size: 0.75rem;
      color: var(--color-blue-400);
    }
  }
`;
