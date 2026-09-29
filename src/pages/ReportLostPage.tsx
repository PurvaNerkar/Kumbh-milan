import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { PhotoUpload } from '../components/PhotoUpload';
import { useAuth } from '../context/AuthContext';
import { addReport } from '../utils/storage';
import type { LostReport } from '../types';
import './ReportLostPage.css';

export function ReportLostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [personName, setPersonName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !personName.trim() ||
      parentPhone.trim().length !== 10 ||
      !address.trim() ||
      !photoUrl ||
      !user
    ) {
      setError('Please add a name, a valid 10-digit contact number, address, and a photo.');
      return;
    }

    const report: LostReport = {
      id: crypto.randomUUID(),
      type: 'lost',
      personName: personName.trim(),
      parentPhone: parentPhone.trim(),
      address: address.trim(),
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
        <h1 className="report-title">I Lost Someone</h1>
        <p className="report-subtitle">
          Add their details so anyone who finds them can reach you right away.
        </p>

        <form onSubmit={handleSubmit} className="report-form">
          <PhotoUpload label="Photo of the missing person" onPhotoSelected={setPhotoUrl} />

          <label className="report-form__field">
            <span>Their name</span>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
          </label>

          <label className="report-form__field">
            <span>Parent / guardian phone number</span>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={parentPhone}
              maxLength={10}
              onChange={(e) => setParentPhone(e.target.value.replace(/\D/g, ''))}
            />
          </label>

          <label className="report-form__field">
            <span>Address to contact</span>
            <input
              type="text"
              placeholder="e.g. Tent 12, Sector 3, near main gate"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
