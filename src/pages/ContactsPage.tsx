import styled from 'styled-components';
import Contact from '../components/Contact';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getContacts, setSearch } from '../redux/features/userSlice';
import InputComponent from '../components/InputComponent';
import { RootState } from '../redux/store';
import { clearCurrentChatInfo } from '../redux/features/chatSlice';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  const { contacts, contactSerachTerm } = useAppSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    dispatch(clearCurrentChatInfo());
  }, [dispatch]);
  return (
    <ContactsContainer>
      <InputComponent
        type="text"
        placeholder="search contact"
        name="contactSerachTerm"
        value={contactSerachTerm}
        handleChange={(e) => {
          dispatch(setSearch({ name: e.target.name, value: e.target.value }));
        }}
      />
      {(contacts.length > 0 && (
        <div className="contacts-container">
          {contacts.map((contact) => (
            <Contact key={contact._id} contact={contact} />
          ))}
        </div>
      )) || (
        <div className="no-contacts">
          <h3>no contacts</h3>
        </div>
      )}
    </ContactsContainer>
  );
};
export default ContactsPage;

const ContactsContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem;
  max-width: 700px;
  margin: 0 auto 0 0;

  input {
    width: 100%;
    background: var(--color-white-100);
    border: none;
    height: fit-content;
  }
  .no-contacts {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    h3 {
      margin: 0;
      font-size: 1rem;
      color: var(--color-gray);
    }
  }

  .contacts-container {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.25rem;
  }
`;
