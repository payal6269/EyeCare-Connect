export const patients = [
  // ── Dr. Sarah Khan – Neurology ICU ──────────────────────────────────
  {
    id: 1, name: 'Muhammad Ali', age: 54, gender: 'Male',
    bed: 'Bed 4', room: 'Room 201', ward: 'Neurology ICU',
    diagnosis: 'Locked-in Syndrome', admitted: '28 May 2026',
    doctor: 'Dr. Sarah Khan', nurse: 'Nurse Ayesha', status: 'critical',
    vitals: { hr: '82 bpm', spo2: '97%', temp: '37.1°C', bp: '118/76' },
  },
  {
    id: 2, name: 'Tariq Mehmood', age: 72, gender: 'Male',
    bed: 'Bed 1', room: 'Room 401', ward: 'Neurology ICU',
    diagnosis: 'Guillain-Barré Syndrome', admitted: '30 May 2026',
    doctor: 'Dr. Sarah Khan', nurse: 'Nurse Ayesha', status: 'observation',
    vitals: { hr: '84 bpm', spo2: '96%', temp: '37.2°C', bp: '130/82' },
  },
  {
    id: 3, name: 'Nadia Hussain', age: 41, gender: 'Female',
    bed: 'Bed 6', room: 'Room 205', ward: 'Neurology ICU',
    diagnosis: 'Multiple Sclerosis (Acute)', admitted: '03 Jun 2026',
    doctor: 'Dr. Sarah Khan', nurse: 'Nurse Rabia', status: 'stable',
    vitals: { hr: '74 bpm', spo2: '98%', temp: '36.9°C', bp: '110/72' },
  },

  // ── Dr. Usman Tariq – General ICU ───────────────────────────────────
  {
    id: 4, name: 'Fatima Zahra', age: 38, gender: 'Female',
    bed: 'Bed 7', room: 'Room 105', ward: 'General ICU',
    diagnosis: 'Spinal Cord Injury (C4)', admitted: '01 Jun 2026',
    doctor: 'Dr. Usman Tariq', nurse: 'Nurse Sana', status: 'stable',
    vitals: { hr: '76 bpm', spo2: '98%', temp: '36.8°C', bp: '112/70' },
  },
  {
    id: 5, name: 'Sadia Bibi', age: 45, gender: 'Female',
    bed: 'Bed 9', room: 'Room 112', ward: 'General ICU',
    diagnosis: 'Severe Head Trauma', admitted: '02 Jun 2026',
    doctor: 'Dr. Usman Tariq', nurse: 'Nurse Sana', status: 'critical',
    vitals: { hr: '98 bpm', spo2: '94%', temp: '38.1°C', bp: '155/98' },
  },
  {
    id: 6, name: 'Imran Baig', age: 60, gender: 'Male',
    bed: 'Bed 3', room: 'Room 108', ward: 'General ICU',
    diagnosis: 'Septic Encephalopathy', admitted: '04 Jun 2026',
    doctor: 'Dr. Usman Tariq', nurse: 'Nurse Bilal', status: 'critical',
    vitals: { hr: '104 bpm', spo2: '92%', temp: '38.7°C', bp: '160/100' },
  },

  // ── Dr. Hina Malik – Stroke Unit ────────────────────────────────────
  {
    id: 7, name: 'Ahmed Raza', age: 67, gender: 'Male',
    bed: 'Bed 2', room: 'Room 310', ward: 'Stroke Unit',
    diagnosis: 'Brainstem Stroke', admitted: '25 May 2026',
    doctor: 'Dr. Hina Malik', nurse: 'Nurse Bilal', status: 'critical',
    vitals: { hr: '91 bpm', spo2: '95%', temp: '37.5°C', bp: '145/92' },
  },
  {
    id: 8, name: 'Rukhsana Begum', age: 70, gender: 'Female',
    bed: 'Bed 5', room: 'Room 312', ward: 'Stroke Unit',
    diagnosis: 'Ischemic Stroke', admitted: '29 May 2026',
    doctor: 'Dr. Hina Malik', nurse: 'Nurse Fatima', status: 'observation',
    vitals: { hr: '78 bpm', spo2: '96%', temp: '37.0°C', bp: '138/86' },
  },
  {
    id: 9, name: 'Khalid Mahmood', age: 58, gender: 'Male',
    bed: 'Bed 8', room: 'Room 315', ward: 'Stroke Unit',
    diagnosis: 'Hemorrhagic Stroke', admitted: '31 May 2026',
    doctor: 'Dr. Hina Malik', nurse: 'Nurse Bilal', status: 'critical',
    vitals: { hr: '95 bpm', spo2: '93%', temp: '37.8°C', bp: '168/105' },
  },

  // ── Dr. Kamran Shah – Neuro Ward ────────────────────────────────────
  {
    id: 10, name: 'Zainab Noor', age: 29, gender: 'Female',
    bed: 'Bed 11', room: 'Room 208', ward: 'Neuro Ward',
    diagnosis: 'ALS (Advanced)', admitted: '15 May 2026',
    doctor: 'Dr. Kamran Shah', nurse: 'Nurse Rabia', status: 'stable',
    vitals: { hr: '70 bpm', spo2: '99%', temp: '36.6°C', bp: '108/68' },
  },
  {
    id: 11, name: 'Hassan Riaz', age: 35, gender: 'Male',
    bed: 'Bed 12', room: 'Room 210', ward: 'Neuro Ward',
    diagnosis: "Parkinson's Disease (Stage 4)", admitted: '20 May 2026',
    doctor: 'Dr. Kamran Shah', nurse: 'Nurse Zara', status: 'observation',
    vitals: { hr: '72 bpm', spo2: '97%', temp: '36.7°C', bp: '122/78' },
  },
  {
    id: 12, name: 'Saima Akhtar', age: 48, gender: 'Female',
    bed: 'Bed 13', room: 'Room 212', ward: 'Neuro Ward',
    diagnosis: 'Huntington Disease', admitted: '22 May 2026',
    doctor: 'Dr. Kamran Shah', nurse: 'Nurse Zara', status: 'stable',
    vitals: { hr: '68 bpm', spo2: '98%', temp: '36.5°C', bp: '114/74' },
  },

  // ── Dr. Ayesha Siddiqui – Rehab Unit ────────────────────────────────
  {
    id: 13, name: 'Omar Farooq', age: 32, gender: 'Male',
    bed: 'Bed 15', room: 'Room 502', ward: 'Rehab Unit',
    diagnosis: 'Post-Stroke Rehabilitation', admitted: '10 May 2026',
    doctor: 'Dr. Ayesha Siddiqui', nurse: 'Nurse Hira', status: 'stable',
    vitals: { hr: '67 bpm', spo2: '99%', temp: '36.4°C', bp: '106/66' },
  },
  {
    id: 14, name: 'Maryam Qureshi', age: 55, gender: 'Female',
    bed: 'Bed 16', room: 'Room 504', ward: 'Rehab Unit',
    diagnosis: 'Spinal Cord Injury Rehab', admitted: '12 May 2026',
    doctor: 'Dr. Ayesha Siddiqui', nurse: 'Nurse Hira', status: 'observation',
    vitals: { hr: '73 bpm', spo2: '98%', temp: '36.8°C', bp: '120/76' },
  },

  // ── Dr. Bilal Chaudhry – Respiratory ICU ────────────────────────────
  {
    id: 15, name: 'Asif Nawaz', age: 63, gender: 'Male',
    bed: 'Bed 18', room: 'Room 601', ward: 'Respiratory ICU',
    diagnosis: 'Respiratory Failure (ALS)', admitted: '18 May 2026',
    doctor: 'Dr. Bilal Chaudhry', nurse: 'Nurse Kamil', status: 'critical',
    vitals: { hr: '93 bpm', spo2: '91%', temp: '37.9°C', bp: '148/94' },
  },
  {
    id: 16, name: 'Lubna Sheikh', age: 50, gender: 'Female',
    bed: 'Bed 19', room: 'Room 603', ward: 'Respiratory ICU',
    diagnosis: 'Ventilator-Dependent Quadriplegia', admitted: '21 May 2026',
    doctor: 'Dr. Bilal Chaudhry', nurse: 'Nurse Kamil', status: 'critical',
    vitals: { hr: '88 bpm', spo2: '93%', temp: '37.6°C', bp: '140/88' },
  },
]
