import styled from 'styled-components';
import { FaPowerOff } from 'react-icons/fa';
import { AiFillWechat } from 'react-icons/ai';
import { IoMdContacts, IoMdPerson } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logoutUser } from '../redux/features/authSlice';
import { RootState } from '../redux/store';
import Count from './Count';
const Navbar = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <NavbarContainer>
      <div className="nav-header">
        <img src={user?.avatar} alt="avatar" />
        <h3>{user?.name}</h3>
      </div>

      <ul className="nav-body">
        <li>
          <NavLink
            to="/dashboard/contacts"
            className="link"
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#8338ec',
                    background: ' #e6ecfe',
                    borderLeft: '3px solid var(--color-blue-400)',
                  }
                : { color: 'white', background: 'transparent' }
            }
          >
            <IoMdContacts className="link-icon" />
            <span>Contacts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/chats"
            className="link"
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#8338ec',
                    background: ' #e6ecfe',
                    borderLeft: '3px solid var(--color-blue-400)',
                  }
                : { color: 'white', background: 'transparent' }
            }
          >
            <AiFillWechat className="link-icon" />
            <span>
              Chats <Count />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className="link"
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#8338ec',
                    background: ' #e6ecfe',
                    borderLeft: '3px solid var(--color-blue-400)',
                  }
                : { color: 'white', background: 'transparent' }
            }
          >
            <IoMdPerson className="link-icon" />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
      <div className="footer">
        <button type="button" onClick={handleLogout}>
          <FaPowerOff className="link-icon" /> <span>Log out</span>
        </button>
      </div>
    </NavbarContainer>
  );
};
export default Navbar;

const NavbarContainer = styled.nav`
  width: 250px;
  min-height: 100vh;
  margin-right: 1rem;
  padding: 1rem 0;
  background: linear-gradient(
    45deg,
    var(--color-blue-600),
    var(--color-blue-400)
  );
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .nav-header {
    color: var(--color-white-100);

    img {
      border-radius: 50%;
      border: 3px solid var(--color-blue-400);
      width: 4rem;
      height: 4rem;
    }
    h3 {
      color: var(--color-white-100);
      text-transform: capitalize;
      margin: 0;

      font-size: 0.75rem;
      text-align: center;
    }
  }
  .nav-body {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    li {
      list-style: none;
      a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0.5rem 2rem;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--color-white-100);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: var(--color-background);
          color: var(--color-white-100);
          font-weight: 600;
          border-left: 3px solid var(--color-blue-400);
          span {
            color: var(--color-blue-400);
          }
          .link-icon {
            color: var(--color-blue-400);
          }
        }
        span {
          margin-left: 1.5rem;
          display: flex;
          align-items: center;
          span {
            margin-left: 0.25rem;
          }
        }
        .link-icon {
          font-size: 1.2rem;
          display: flex;
        }
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    color: var(--color-white-100);
    align-items: center;
    padding: 0 1rem;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      font-size: 0.75rem;
      color: var(--color-white-100);
      padding: 0.5rem 1rem;
      cursor: pointer;
      span {
        margin-left: 1.5rem;
        text-transform: uppercase;
      }
      .link-icon {
        font-size: 1rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    width: unset;
    min-height: unset;
    margin-right: unset;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    border-radius: 0;
    padding-right: 0;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    .nav-header {
      display: none;
    }
    .nav-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        a {
          padding: 0.5rem 1rem;
          span {
            margin-left: 0;
          }
          .link-icon {
            display: none;
          }
        }
      }
    }
    .footer {
      width: unset;
      padding: 0;
      button {
        span {
          display: none;
        }
      }
    }
  }
`;
