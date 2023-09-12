import styled from 'styled-components';
import Contact from '../components/Contact';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getContacts, setSearch } from '../redux/features/userSlice';
import InputComponent from '../components/InputComponent';
import { RootState } from '../redux/store';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  const { contacts, contactSerachTerm } = useAppSelector(
    (state: RootState) => state.user
  );
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
      <div className="contacts-container">
        {contacts.map((contact) => (
          <Contact key={contact._id} contact={contact} />
        ))}
      </div>
    </ContactsContainer>
  );
};
export default ContactsPage;

const ContactsContainer = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
  max-width: 700px;
  margin: 0 auto 0 0;
  align-items: flex-start;
  input {
    width: 100%;
    background: var(--color-white-100);
    border: none;
    height: fit-content;
  }
  .contacts-container {
    height: calc(100vh - 6rem);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.25rem;
  }
`;
