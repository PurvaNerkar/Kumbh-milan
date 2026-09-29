import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES } from '../data/indianStates';
import './LoginPage.css';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim() || !state || phone.trim().length !== 10) {
      setError('Please fill your name, state, and a valid 10-digit phone number.');
      return;
    }

    login({ name: name.trim(), state, phone: phone.trim() });
    navigate('/dashboard');
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__logo">🔱</div>
        <h1 className="login-card__title">Kumbh Milan</h1>
        <p className="login-card__subtitle">
          Lost &amp; found reporting for the mela. Report someone you've found, or
          report someone missing — everyone nearby can see it.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-form__field">
            <span>Your name</span>
            <input
              type="text"
              placeholder="e.g. Ramesh Yadav"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="login-form__field">
            <span>Your state</span>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select your state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="login-form__field">
            <span>Your phone number</span>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            />
          </label>

          {error && <p className="login-form__error">{error}</p>}

          <button type="submit" className="login-form__submit">
            Continue
          </button>
        </form>

        <p className="login-card__footer">
          Your name, state and phone are shown to people you help, so they can
          reach you about a match.
        </p>
      </div>
    </div>
  );
}
