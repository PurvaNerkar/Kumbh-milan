export interface User {
  name: string;
  state: string;
  phone: string;
}

interface BaseReport {
  id: string;
  photoUrl: string;
  reportedByName: string;
  reportedByPhone: string;
  createdAt: string;
}

export interface FoundReport extends BaseReport {
  type: 'found';
  personName: string;
  placeFound: string;
}

export interface LostReport extends BaseReport {
  type: 'lost';
  personName: string;
  parentPhone: string;
  address: string;
}

export type Report = FoundReport | LostReport;
