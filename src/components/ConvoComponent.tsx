import { styled } from 'styled-components';
import { Tuser } from '../redux/features/authSlice';
import { IChatObject, setCurrentChatMember } from '../redux/features/chatSlice';
import { Link } from 'react-router-dom';
import { BsImageFill } from 'react-icons/bs';
import moment from 'moment';
import { useAppDispatch } from '../redux/hooks';

const ConvoComponent = ({
  conversation,
  user,
}: {
  conversation: IChatObject;
  user: Tuser | null;
}) => {
  const dispatch = useAppDispatch();
  const { _id, latestMessageCreatedAt, messages, otherMembers } = conversation;
  const otherMember = otherMembers.find(
    (member) => member._id !== user?.userId
  );
  const setChatValues = () => {
    dispatch(setCurrentChatMember(otherMember!));
  };
  return (
    <ConvoContainer>
      <Link to={`/dashboard/chats/${_id}`} onClick={setChatValues}>
        <div className="convo-header">
          <div className="header-convo-container">
            <img src={otherMember?.avatar} alt="avatar" width={'40px'} />
            <div className="convo-header-text">
              <h5>{otherMember?.fullName}</h5>
              <h6>
                {/* remember to change this */}
                <span className="status"></span> online
              </h6>
            </div>
          </div>
          <h6>{moment(latestMessageCreatedAt).startOf('day').fromNow()}</h6>
        </div>
        <div className="convo-body">
          <div className="preview-msg">
            {messages[messages.length - 1].text && (
              <p className="preview-text">
                {messages[messages.length - 1].text}
              </p>
            )}
            {messages[messages.length - 1].imageUrl && (
              <p className="preview-img ">
                <BsImageFill className="img-icon" />
                image
              </p>
            )}
          </div>
          <div className="pill pill--small">2</div>
        </div>
      </Link>
    </ConvoContainer>
  );
};
export default ConvoComponent;

const ConvoContainer = styled.li`
  background: var(--color-white-100);
  a {
    padding: 1rem;
    text-decoration: none;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    .convo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-convo-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
        img {
          border-radius: 50%;
          border: 3px solid var(--color-blue-400);
          width: 3rem;
          height: 3rem;
        }
        .convo-header-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 0.25rem;
          h5 {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: var(--color-blue-400);
            text-transform: capitalize;
          }
          h6 {
            margin: 0;
            font-size: 0.75rem;
            color: var(--color-gray);
          }
        }
      }
      h6 {
        margin: 0;
        font-size: 0.75rem;
        color: var(--color-gray);
      }
    }
    .convo-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      .preview-msg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.25rem;
        .preview-text {
          margin: 0;
          font-size: 0.75rem;
          color: var(--color-gray);
        }
        .preview-img {
          margin: 0;
          font-size: 0.75rem;
          color: var(--color-blue-400);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--color-blue-100);
          .img-icon {
            font-size: 1rem;
          }
        }
      }
      .pill {
        color: var(--color-white-100);
      }
    }
  }
`;
