// ── NAMSSN Departmental Logo (SVG recreation) ─────────────────────
export const NAMSSNLogo = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="NAMSSN"
  >
    {/* Outer circle ring */}
    <circle cx="100" cy="95" r="88" fill="transparent" stroke="currentColor" strokeWidth="3.5"/>
    <circle cx="100" cy="95" r="80" fill="transparent" stroke="currentColor" strokeWidth="1.2"/>

    <defs>
      <path id="topArc" d="M 20,95 A 80,80 0 0,1 180,95" />
      <path id="bottomArc" d="M 28,115 A 80,80 0 0,0 172,115" />
    </defs>
    <text fontSize="8" fontFamily="Arial, sans-serif" fontWeight="700" fill="currentColor" letterSpacing="1">
      <textPath href="#topArc" startOffset="2%">NATIONAL ASSOCIATION OF MATHEMATICAL SCIENCES STUDENTS</textPath>
    </text>
    <text fontSize="8" fontFamily="Arial, sans-serif" fontWeight="700" fill="currentColor" letterSpacing="1">
      <textPath href="#bottomArc" startOffset="18%">OF NIGERIA</textPath>
    </text>

    {/* Lock body */}
    <rect x="46" y="52" width="38" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="3"/>
    <rect x="50" y="62" width="30" height="26" rx="3" fill="currentColor"/>
    <path d="M54 52 L54 44 Q54 36 65 36 Q76 36 76 44 L76 52" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="65" cy="74" r="8" fill="transparent" stroke="currentColor" strokeWidth="1"/>
    <circle cx="65" cy="74" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="65" y1="69" x2="65" y2="71" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="65" y1="77" x2="65" y2="79" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="60" y1="74" x2="62" y2="74" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="68" y1="74" x2="70" y2="74" stroke="currentColor" strokeWidth="1.2"/>

    {/* Key */}
    <circle cx="118" cy="43" r="10" fill="none" stroke="currentColor" strokeWidth="2.8"/>
    <circle cx="118" cy="43" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="127" y1="51" x2="148" y2="63" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="143" y1="60" x2="143" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="148" y1="57" x2="148" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>

    {/* Open book */}
    <path d="M85 75 Q100 70 115 75 L115 100 Q100 96 85 100 Z" fill="none" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M115 75 Q130 70 145 75 L145 100 Q130 96 115 100 Z" fill="none" stroke="currentColor" strokeWidth="2.2"/>
    <line x1="115" y1="75" x2="115" y2="100" stroke="currentColor" strokeWidth="2"/>
    <line x1="89" y1="82" x2="112" y2="80" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="89" y1="87" x2="112" y2="86" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="89" y1="92" x2="112" y2="91" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="118" y1="80" x2="141" y2="82" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="118" y1="86" x2="141" y2="87" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="118" y1="91" x2="141" y2="92" stroke="currentColor" strokeWidth="1.2"/>

    {/* Red banner — keeps its color always */}
    <rect x="60" y="100" width="82" height="22" rx="2" fill="#cc2222"/>
    <text x="101" y="115" textAnchor="middle" fontSize="6.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="white">Mathematics for critical thoughts,</text>
    <text x="101" y="122" textAnchor="middle" fontSize="6.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="white">innovation and progress</text>

    {/* NAMSSN text */}
    <text x="101" y="138" textAnchor="middle" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900" fill="currentColor" letterSpacing="1">NAMSSN</text>

    {/* Ribbon */}
    <path d="M30 155 L15 163 L30 170 L170 170 L185 163 L170 155 Z" fill="transparent" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M30 155 L25 163 L30 170" fill="transparent" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M170 155 L175 163 L170 170" fill="transparent" stroke="currentColor" strokeWidth="1.5"/>
    <text x="101" y="166" textAnchor="middle" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor" fontWeight="700">Critical Thinkers</text>
  </svg>
);

// ── University of Jos Logo ────────────────────────────────────────
export const UniJosLogo = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 220"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="University of Jos"
  >
    {/* Shield — keeps its blue color */}
    <path d="M10 10 L190 10 L190 140 Q190 200 100 215 Q10 200 10 140 Z"
          fill="#1a6fbf" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="10" width="180" height="30" fill="white"/>
    <rect x="10" y="80" width="180" height="22" fill="white"/>
    <rect x="10" y="122" width="180" height="20" fill="#1a6fbf"/>

    <text x="100" y="31" textAnchor="middle" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="900" fill="#1a1a1a" letterSpacing="0.5">UNIVERSITY OF JOS</text>

    {/* Book */}
    <path d="M78 48 Q100 42 122 48 L122 70 Q100 65 78 70 Z" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M78 48 L78 70" stroke="white" strokeWidth="1.5"/>
    <path d="M122 48 L122 70" stroke="white" strokeWidth="1.5"/>
    <line x1="100" y1="45" x2="100" y2="71" stroke="white" strokeWidth="2"/>
    <path d="M82 54 Q88 52 96 53" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M82 59 Q88 57 96 58" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M104 53 Q112 52 118 54" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M104 58 Q112 57 118 59" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Mine emblem */}
    <circle cx="100" cy="103" r="28" fill="white" stroke="#8b5c2a" strokeWidth="2"/>
    <rect x="88" y="86" width="6" height="22" fill="#8b5c2a"/>
    <line x1="91" y1="86" x2="113" y2="90" stroke="#8b5c2a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="113" y1="90" x2="113" y2="100" stroke="#8b5c2a" strokeWidth="2" strokeLinecap="round"/>
    <rect x="109" y="99" width="8" height="5" fill="#8b5c2a"/>
    <path d="M73 112 Q100 105 127 112 L127 125 Q100 128 73 125 Z" fill="#8b3a1a"/>
    <ellipse cx="100" cy="119" rx="15" ry="6" fill="#5a9bbf"/>
    <line x1="88" y1="112" x2="74" y2="128" stroke="#8b5c2a" strokeWidth="3" strokeLinecap="round"/>

    {/* Lower shield */}
    <path d="M10 142 L190 142 L190 160 Q190 200 100 215 Q10 200 10 160 Z" fill="#8b3a1a"/>
    {[55,70,85,100,115,130,145].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="162" r="7" fill="#2d6e1a"/>
        <circle cx={x} cy="170" r="5" fill="#2d6e1a"/>
      </g>
    ))}

    {/* Gold ribbon — keeps its color */}
    <path d="M15 178 L5 185 L15 192 L185 192 L195 185 L185 178 Z"
          fill="#c8a832" stroke="#8b7020" strokeWidth="1.2"/>
    <path d="M15 178 L10 185 L15 192" fill="#c8a832" stroke="#8b7020" strokeWidth="1.2"/>
    <path d="M185 178 L190 185 L185 192" fill="#c8a832" stroke="#8b7020" strokeWidth="1.2"/>
    <text x="100" y="189" textAnchor="middle" fontSize="9.5" fontFamily="Arial, sans-serif" fontWeight="800" fill="#3a2800" fontStyle="italic" letterSpacing="1">DISCIPLINE AND DEDICATION</text>
  </svg>
);

// ── Combined logo header ───────────────────────────────────────────
export const AuthLogoHeader = () => (
  <div className="flex items-center justify-center gap-5 mb-6">
    <NAMSSNLogo size={72} className="text-ink dark:text-cream" />
    <div className="text-center">
      <div className="text-xs text-muted uppercase tracking-widest mb-0.5">
        FYB 2026
      </div>
      <div className="text-sm font-bold text-ink dark:text-cream tracking-wide">
        Final Year Book
      </div>
    </div>
    <UniJosLogo size={72} className="text-ink dark:text-cream" />
  </div>
);

export default { NAMSSNLogo, UniJosLogo, AuthLogoHeader };