// Medical SVG icon components — clean colored illustrations, no emojis

export function IconWater({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#EFF6FF"/>
      <path d="M24 10C24 10 14 21.5 14 28a10 10 0 0020 0C34 21.5 24 10 24 10z" fill="#60A5FA"/>
      <path d="M24 10C24 10 14 21.5 14 28a10 10 0 0010 10V10z" fill="#3B82F6"/>
      <ellipse cx="19" cy="25" rx="2" ry="3" fill="#BFDBFE" opacity="0.7"/>
    </svg>
  )
}

export function IconMedicine({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FFF1F2"/>
      <rect x="20" y="10" width="8" height="28" rx="4" fill="#F43F5E"/>
      <rect x="10" y="20" width="28" height="8" rx="4" fill="#F43F5E"/>
      <rect x="20" y="10" width="8" height="14" rx="4" fill="#FB7185"/>
      <rect x="10" y="20" width="14" height="8" rx="4" fill="#FB7185"/>
    </svg>
  )
}

export function IconEmergency({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FEF2F2"/>
      <circle cx="24" cy="24" r="13" fill="#EF4444"/>
      <path d="M24 13v6M24 29v6M13 24h6M29 24h6" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="4" fill="white"/>
    </svg>
  )
}

export function IconNurse({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F0FDF4"/>
      <circle cx="24" cy="16" r="7" fill="#86EFAC"/>
      <path d="M24 9h0" stroke="#16A34A" strokeWidth="2"/>
      <rect x="21" y="13" width="6" height="2" rx="1" fill="white"/>
      <rect x="23" y="11" width="2" height="6" rx="1" fill="white"/>
      <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#4ADE80"/>
      <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#22C55E" opacity="0.5"/>
    </svg>
  )
}

export function IconFamily({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F5F3FF"/>
      <circle cx="18" cy="17" r="5" fill="#A78BFA"/>
      <circle cx="30" cy="17" r="5" fill="#8B5CF6"/>
      <path d="M8 38c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="#C4B5FD"/>
      <path d="M20 38c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="#A78BFA"/>
      <circle cx="24" cy="30" r="3" fill="#7C3AED"/>
    </svg>
  )
}

export function IconDoctor({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FFF7ED"/>
      <circle cx="24" cy="16" r="7" fill="#FDB57D"/>
      <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#FB923C"/>
      <path d="M26 32l2 4h-8l2-4" fill="#EA580C"/>
      <circle cx="30" cy="35" r="3" fill="#FED7AA" stroke="#FB923C" strokeWidth="1.5"/>
      <path d="M29 35h2M30 34v2" stroke="#FB923C" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

export function IconCold({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F0F9FF"/>
      <path d="M24 10v28M17 14l14 8M17 34l14-8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M20 10l4 4 4-4M20 38l4-4 4 4" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="3" fill="#7DD3FC"/>
    </svg>
  )
}

export function IconToilet({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F0FDFA"/>
      <rect x="14" y="22" width="20" height="14" rx="4" fill="#5EEAD4"/>
      <rect x="16" y="18" width="16" height="6" rx="2" fill="#99F6E4"/>
      <rect x="21" y="14" width="6" height="6" rx="1" fill="#2DD4BF"/>
      <circle cx="24" cy="31" r="3" fill="#CCFBF1"/>
    </svg>
  )
}

export function IconDizzy({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FEFCE8"/>
      <circle cx="24" cy="24" r="12" fill="#FDE68A"/>
      <circle cx="24" cy="24" r="12" fill="none" stroke="#F59E0B" strokeWidth="1.5"/>
      <circle cx="19" cy="22" r="2.5" fill="#92400E"/>
      <circle cx="29" cy="22" r="2.5" fill="#92400E"/>
      <path d="M19 30c1.5-2 8.5-2 10 0" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 17c2-3 5-3 6-1M32 17c-2-3-5-3-6-1" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function IconBreathe({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#EEF2FF"/>
      <path d="M24 14c-5 0-8 3-8 7 0 2 1 4 3 5l5 2 5-2c2-1 3-3 3-5 0-4-3-7-8-7z" fill="#818CF8"/>
      <path d="M17 26c-2 1-4 3-4 6 0 2 1 4 4 4h14c3 0 4-2 4-4 0-3-2-5-4-6" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 21h8M22 25h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function IconBed({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FDF2F8"/>
      <rect x="10" y="26" width="28" height="8" rx="3" fill="#F9A8D4"/>
      <rect x="10" y="22" width="28" height="6" rx="2" fill="#FBCFE8"/>
      <rect x="10" y="18" width="8" height="16" rx="2" fill="#EC4899"/>
      <circle cx="26" cy="22" r="4" fill="#FDE68A" stroke="#FBBF24" strokeWidth="1"/>
      <rect x="10" y="32" width="4" height="6" rx="1" fill="#EC4899"/>
      <rect x="34" y="32" width="4" height="6" rx="1" fill="#EC4899"/>
    </svg>
  )
}

export function IconThankYou({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F0FDF4"/>
      <path d="M24 36s-12-7-12-15a7 7 0 0112-4.9A7 7 0 0136 21c0 8-12 15-12 15z" fill="#4ADE80"/>
      <path d="M24 36s-12-7-12-15a7 7 0 0112-4.9" fill="#22C55E"/>
    </svg>
  )
}

// Service icons map
export const serviceIcons = {
  'Need Water':      <IconWater />,
  'Pain Medicine':   <IconMedicine />,
  'Emergency':       <IconEmergency />,
  'Call Nurse':      <IconNurse />,
  'Meet Family':     <IconFamily />,
  'Need Doctor':     <IconDoctor />,
  'Feel Cold':       <IconCold />,
  'Need Toilet':     <IconToilet />,
  'Feeling Dizzy':   <IconDizzy />,
  'Breathe Problem': <IconBreathe />,
  'Adjust Position': <IconBed />,
  'Thank You':       <IconThankYou />,
}

// Patient avatar
export function PatientAvatar({ gender, size = 48 }) {
  const bg   = gender === 'Male' ? '#DBEAFE' : '#FCE7F3'
  const skin = gender === 'Male' ? '#FDB57D' : '#FECACA'
  const hair = gender === 'Male' ? '#1E3A5F' : '#7C3AED'
  const coat = gender === 'Male' ? '#3B82F6' : '#EC4899'
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill={bg}/>
      {/* Body / coat */}
      <path d="M12 44c0-6.627 5.373-12 12-12s12 5.373 12 12" fill={coat}/>
      {/* Collar white */}
      <path d="M21 32l3 4 3-4" fill="white"/>
      {/* Stethoscope */}
      <path d="M28 34c2 0 4 1.5 4 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="24" cy="19" r="8" fill={skin}/>
      {/* Hair */}
      {gender === 'Male' ? (
        <path d="M16 18c0-4.418 3.582-8 8-8s8 3.582 8 8" fill={hair}/>
      ) : (
        <>
          <path d="M16 18c0-4.418 3.582-8 8-8s8 3.582 8 8" fill={hair}/>
          <path d="M16 18c-1 3-1 6 0 8" stroke={hair} strokeWidth="3" strokeLinecap="round"/>
          <path d="M32 18c1 3 1 6 0 8" stroke={hair} strokeWidth="3" strokeLinecap="round"/>
        </>
      )}
      {/* Eyes */}
      <circle cx="21" cy="20" r="1.2" fill="#1E293B"/>
      <circle cx="27" cy="20" r="1.2" fill="#1E293B"/>
      {/* Smile */}
      <path d="M21 24c1 1.5 5 1.5 6 0" stroke="#9A3412" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

// Vital icons
export function IconHeart({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-9-5.25-9-11.25A5.25 5.25 0 0112 6.68 5.25 5.25 0 0121 9.75C21 15.75 12 21 12 21z" fill="#EF4444"/>
    </svg>
  )
}

export function IconLung({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v6M8 10C5 10 3 12 3 15c0 2.5 1.5 4 4 4h3v-9z" fill="#3B82F6"/>
      <path d="M16 10c3 0 5 2 5 5 0 2.5-1.5 4-4 4h-3v-9z" fill="#60A5FA"/>
    </svg>
  )
}

export function IconTherm({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="10" y="3" width="4" height="13" rx="2" fill="#FED7AA"/>
      <circle cx="12" cy="18" r="3" fill="#F97316"/>
      <rect x="11" y="8" width="2" height="8" rx="1" fill="#F97316"/>
    </svg>
  )
}

export function IconBP({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#A855F7" strokeWidth="2" fill="#F3E8FF"/>
      <path d="M7 12h2l1.5-3 2 6 1.5-4L15 12h2" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Dashboard stat icons
export function IconHospital({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#EFF6FF"/>
      <rect x="10" y="20" width="28" height="22" rx="2" fill="#3B82F6"/>
      <rect x="18" y="10" width="12" height="12" rx="2" fill="#60A5FA"/>
      <rect x="20" y="12" width="3" height="8" rx="1" fill="white"/>
      <rect x="17" y="15" width="9" height="3" rx="1" fill="white"/>
      <rect x="14" y="30" width="6" height="12" rx="1" fill="#BFDBFE"/>
      <rect x="28" y="30" width="6" height="12" rx="1" fill="#BFDBFE"/>
      <rect x="21" y="28" width="6" height="6" rx="1" fill="white"/>
    </svg>
  )
}

export function IconStethoscope({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#F0FDF4"/>
      <circle cx="32" cy="32" r="6" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="2.5" fill="white"/>
      <path d="M14 14c0 8 10 14 18 10" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="3" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5"/>
      <circle cx="20" cy="14" r="3" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5"/>
    </svg>
  )
}

export function IconEye({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#EEF2FF"/>
      <path d="M8 24s6-10 16-10 16 10 16 10-6 10-16 10S8 24 8 24z" fill="#818CF8"/>
      <circle cx="24" cy="24" r="6" fill="#4F46E5"/>
      <circle cx="24" cy="24" r="3" fill="#1E1B4B"/>
      <circle cx="26" cy="22" r="1.5" fill="white"/>
    </svg>
  )
}

export function IconShield({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#FFF7ED"/>
      <path d="M24 10l12 5v9c0 7-5 12-12 14C17 36 12 31 12 24v-9l12-5z" fill="#FB923C"/>
      <path d="M24 10l12 5v9c0 7-5 12-12 14" fill="#F97316"/>
      <path d="M18 24l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
