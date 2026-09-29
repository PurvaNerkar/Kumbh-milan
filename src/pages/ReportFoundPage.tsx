import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { PhotoUpload } from '../components/PhotoUpload';
import { useAuth } from '../context/AuthContext';
import { addReport } from '../utils/storage';
import type { FoundReport } from '../types';
import './ReportFoundPage.css';

export function ReportFoundPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [personName, setPersonName] = useState('');
  const [placeFound, setPlaceFound] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!personName.trim() || !placeFound.trim() || !photoUrl || !user) {
      setError('Please add a name, the place they were found, and a photo.');
      return;
    }

    const report: FoundReport = {
      id: crypto.randomUUID(),
      type: 'found',
      personName: personName.trim(),
      placeFound: placeFound.trim(),
      photoUrl,
      reportedByName: user.name,
      reportedByPhone: user.phone,
      createdAt: new Date().toISOString(),
    };

    addReport(report);
    navigate('/dashboard');
  }

  return (
    <div className="report-page">
      <Header />

      <main className="report-main">
        <h1 className="report-title">I Found Someone</h1>
        <p className="report-subtitle">
          Add their details so the family can find this report and reach you.
        </p>

        <form onSubmit={handleSubmit} className="report-form">
          <PhotoUpload label="Photo of the person" onPhotoSelected={setPhotoUrl} />

          <label className="report-form__field">
            <span>Their name (if known)</span>
            <input
              type="text"
              placeholder="e.g. Unknown boy, ~6 years old"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
          </label>

          <label className="report-form__field">
            <span>Where you found them</span>
            <input
              type="text"
              placeholder="e.g. Near Sector 5 help desk"
              value={placeFound}
              onChange={(e) => setPlaceFound(e.target.value)}
            />
          </label>

          {error && <p className="report-form__error">{error}</p>}

          <button type="submit" className="report-form__submit">
            Submit Report
          </button>
        </form>
      </main>
    </div>
  );
}
