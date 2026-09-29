import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ReportCard } from '../components/ReportCard';
import { useAuth } from '../context/AuthContext';
import { getReports } from '../utils/storage';
import type { Report } from '../types';
import './DashboardPage.css';

type Filter = 'all' | 'found' | 'lost';

export function DashboardPage() {
  const { user } = useAuth();
  const [reports] = useState<Report[]>(() => getReports());
  const [filter, setFilter] = useState<Filter>('all');

  const visibleReports = reports.filter((r) => filter === 'all' || r.type === filter);

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-main">
        <h1 className="dashboard-greeting">Welcome, {user?.name}</h1>

        <div className="dashboard-actions">
          <Link to="/report/found" className="dashboard-action dashboard-action--found">
            <span className="dashboard-action__icon">🧒</span>
            <span className="dashboard-action__title">I Found Someone</span>
            <span className="dashboard-action__desc">
              Report a child or person you found in the crowd
            </span>
          </Link>

          <Link to="/report/lost" className="dashboard-action dashboard-action--lost">
            <span className="dashboard-action__icon">🔍</span>
            <span className="dashboard-action__title">I Lost Someone</span>
            <span className="dashboard-action__desc">
              Report a missing child or family member
            </span>
          </Link>
        </div>

        <section className="dashboard-feed">
          <div className="dashboard-feed__header">
            <h2>Reports nearby</h2>
            <div className="dashboard-feed__filters">
              <button
                className={filter === 'all' ? 'is-active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={filter === 'found' ? 'is-active' : ''}
                onClick={() => setFilter('found')}
              >
                Found
              </button>
              <button
                className={filter === 'lost' ? 'is-active' : ''}
                onClick={() => setFilter('lost')}
              >
                Lost
              </button>
            </div>
          </div>

          {visibleReports.length === 0 ? (
            <p className="dashboard-feed__empty">No reports yet.</p>
          ) : (
            <div className="dashboard-feed__list">
              {visibleReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
