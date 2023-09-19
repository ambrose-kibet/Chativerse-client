import { styled } from 'styled-components';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import ConvoComponent from './ConvoComponent';

const ConversationsContainer = () => {
  const { conversations } = useAppSelector((state: RootState) => state.chat);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <ConvoContainer>
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
  width: 100%;
  height: 100%;

  .conversations-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    justify-content: flex-start;
  }
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;
