import type { Report, User } from '../types';

const USER_KEY = 'kumbhMilan_user';
const REPORTS_KEY = 'kumbhMilan_reports';

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function getReports(): Report[] {
  const raw = localStorage.getItem(REPORTS_KEY);
  return raw ? (JSON.parse(raw) as Report[]) : [];
}

export function addReport(report: Report): void {
  const reports = getReports();
  reports.unshift(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}
