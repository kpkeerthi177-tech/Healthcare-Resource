export const mockHospitals = [
  {
    id: 'h1',
    name: 'City General Hospital',
    distance: '2.3 km',
    eta: '8 min',
    icuBeds: { total: 20, available: 5 },
    generalBeds: { total: 100, available: 23 },
    oxygen: true,
    ventilators: { total: 15, available: 3 },
    traumaCare: true,
    teams: {
      trauma: { status: 'ready' as string, members: 6 },
      or: { status: 'preparing' as string, members: 4 },
      emergency: { status: 'ready' as string, members: 8 },
    },
  },
  {
    id: 'h2',
    name: 'St. Mary Medical Center',
    distance: '4.1 km',
    eta: '14 min',
    icuBeds: { total: 12, available: 2 },
    generalBeds: { total: 60, available: 8 },
    oxygen: true,
    ventilators: { total: 8, available: 1 },
    traumaCare: true,
    teams: {
      trauma: { status: 'preparing' as string, members: 5 },
      or: { status: 'ready' as string, members: 3 },
      emergency: { status: 'ready' as string, members: 6 },
    },
  },
  {
    id: 'h3',
    name: 'Rural Health Center',
    distance: '12.5 km',
    eta: '25 min',
    icuBeds: { total: 4, available: 2 },
    generalBeds: { total: 20, available: 12 },
    oxygen: true,
    ventilators: { total: 2, available: 2 },
    traumaCare: false,
    teams: {
      trauma: { status: 'preparing' as string, members: 2 },
      or: { status: 'preparing' as string, members: 2 },
      emergency: { status: 'ready' as string, members: 3 },
    },
  },
];

export const mockPatient = {
  id: 'p1',
  name: 'Alex Thompson',
  age: 45,
  gender: 'Male',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  emergencyContact: '+1-555-0123',
  vitals: {
    heartRate: 92,
    systolicBP: 140,
    diastolicBP: 90,
    oxygenSat: 96,
    temperature: 37.2,
    respiratoryRate: 18,
    glucose: 180,
  },
  chiefComplaint: 'Chest pain and shortness of breath',
  observations: 'Patient presents with acute chest pain radiating to left arm. Diaphoretic. History of MI.',
  medications: ['Aspirin 325mg', 'Nitroglycerin SL'],
};

export const mockAmbulance = {
  id: 'a1',
  unit: 'AMB-042',
  paramedic: 'James Rodriguez',
  status: 'en-route' as const,
  currentLocation: { lat: 28.6139, lng: 77.2090 },
  destination: { lat: 28.6329, lng: 77.2195 },
  eta: '8 min',
  distance: '3.2 km',
  progress: 62,
};

export const mockTrackingUpdates = [
  { time: '14:32', event: 'SOS Alert received', type: 'alert' as const },
  { time: '14:33', event: 'Ambulance AMB-042 dispatched', type: 'dispatch' as const },
  { time: '14:35', event: 'Ambulance en route to patient', type: 'update' as const },
  { time: '14:38', event: 'Patient picked up', type: 'update' as const },
  { time: '14:39', event: 'Heading to City General Hospital', type: 'update' as const },
  { time: '14:40', event: 'Hospital notified - trauma team preparing', type: 'hospital' as const },
  { time: '14:42', event: 'ETA updated: 8 minutes', type: 'update' as const },
];

export const mockVitalsHistory = Array.from({ length: 20 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${(i % 2) * 30 || '00'}`,
  heartRate: 85 + Math.floor(Math.random() * 15),
  systolicBP: 130 + Math.floor(Math.random() * 20),
  oxygenSat: 94 + Math.floor(Math.random() * 5),
}));

export const mockAppointments = [
  { id: 'ap1', doctor: 'Dr. Sarah Chen', specialty: 'Cardiology', date: '2026-03-18', time: '10:00 AM', status: 'confirmed' as const },
  { id: 'ap2', doctor: 'Dr. Patel', specialty: 'General Medicine', date: '2026-03-22', time: '2:30 PM', status: 'pending' as const },
];
