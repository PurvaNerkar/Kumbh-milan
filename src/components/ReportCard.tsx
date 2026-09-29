import type { Report } from '../types';
import './ReportCard.css';

export function ReportCard({ report }: { report: Report }) {
  const isFound = report.type === 'found';
  const contactPhone = isFound ? report.reportedByPhone : report.parentPhone;

  return (
    <div className="report-card">
      <img src={report.photoUrl} alt={report.personName} className="report-card__photo" />
      <div className="report-card__body">
        <span className={`report-card__badge report-card__badge--${report.type}`}>
          {isFound ? 'Found' : 'Missing'}
        </span>
        <h3 className="report-card__name">{report.personName}</h3>

        {isFound ? (
          <p className="report-card__detail">Found near: {report.placeFound}</p>
        ) : (
          <p className="report-card__detail">Last seen address: {report.address}</p>
        )}

        <p className="report-card__reporter">
          Reported by {report.reportedByName}
        </p>

        <a href={`tel:${contactPhone}`} className="report-card__call">
          Call {contactPhone}
        </a>
      </div>
    </div>
  );
}
