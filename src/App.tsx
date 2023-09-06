import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatsPage from './pages/ChatsPage';
import LandingPage from './pages/LandingPage';
import ProtectedPages from './pages/ProtectedPages';
import SharedLayouts from './pages/SharedLayouts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="/chats"
          element={
            <ProtectedPages>
              <SharedLayouts />
            </ProtectedPages>
          }
        >
          <Route index element={<ChatsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
