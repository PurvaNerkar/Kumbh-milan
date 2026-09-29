import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="header__brand">🔱 Kumbh Milan</div>
      {user && (
        <div className="header__user">
          <span className="header__user-name">{user.name}</span>
          <button className="header__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
