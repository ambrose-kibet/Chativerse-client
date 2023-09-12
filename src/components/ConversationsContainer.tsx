import { styled } from 'styled-components';
import InputComponent from './InputComponent';
import { BsChevronDown } from 'react-icons/bs';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearch } from '../redux/features/chatSlice';
import ConvoComponent from './ConvoComponent';

const ConversationsContainer = () => {
  const { searchTerm, conversations } = useAppSelector(
    (state: RootState) => state.chat
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <ConvoContainer>
      <form onSubmit={handleSubmit}>
        <InputComponent
          placeholder="search"
          value={searchTerm}
          type="text"
          name="searchTerm"
          handleChange={handleChange}
        />
        <button type="submit">
          messages <BsChevronDown />
        </button>
      </form>
      <ul className="conversations-list">
        {conversations.map((conversation, index) => (
          <ConvoComponent conversation={conversation} key={index} user={user} />
        ))}
      </ul>
    </ConvoContainer>
  );
};
export default ConversationsContainer;

const ConvoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0rem;
  width: 100%;
  height: calc(100vh - 6rem);
  max-height: calc(100vh - 6rem);
  overflow-y: scroll;

  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 1rem;
    background: var(--color-white-100);
    input {
      border: none;
      margin: 0;
      padding: 1rem;

      &::placeholder {
        color: var(--color-gray);
      }
    }
    button {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      text-transform: capitalize;
      text-decoration: none;
      color: var(--color-gray);
      background: transparent;
    }
  }
  .conversations-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    justify-content: flex-start;
  }
  @media screen and (max-width: 768px) {
    height: calc(100vh - 3rem);
    max-height: calc(100vh - 3rem);
  }
`;
