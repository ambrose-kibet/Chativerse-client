import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatsPage from './pages/ChatsPage';
import LandingPage from './pages/LandingPage';

import ProtectedPages from './pages/ProtectedPages';
import SharedLayouts from './pages/SharedLayouts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleChat from './pages/SingleChat';
import ContactsPage from './pages/ContactsPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedPages>
              <SharedLayouts />
            </ProtectedPages>
          }
        >
          <Route path="/dashboard/chats" element={<ChatsPage />} />
          <Route path="/dashboard/contacts" element={<ContactsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/chats/:chatId" element={<SingleChat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
