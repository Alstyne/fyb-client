import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllUsers } from '../services/api';
import StudentCard from '../components/StudentCard';
import { SkeletonCard } from '../components/Skeleton';
import PageWrapper from '../components/PageWrapper';
import { NAMSSNLogo, UniJosLogo } from '../components/Logos';
import toast from 'react-hot-toast';

// ── Icons ─────────────────────────────────────────────────────────
const GridIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/>
  </svg>
);
const ListIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z"/>
  </svg>
);
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
  </svg>
);
const CloseIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path strokeLinecap="round" strokeLinecap="round" d="M9 5l7 7-7 7"/>
  </svg>
);

// ── Student Row (List View) ───────────────────────────────────────
const StudentRow = ({ student, index }) => (
  <motion.a
    href={`/profile/${student.id}`}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
    className="group flex items-center gap-4 p-4 bg-white rounded-2xl
               border border-gray-100 hover:border-gold/30
               hover:shadow-lg hover:shadow-gold/5
               active:scale-[0.99] transition-all duration-300"
  >
    {/* Avatar */}
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex-shrink-0 overflow-hidden
                    bg-gradient-to-br from-ink to-gray-800 border border-gray-100
                    group-hover:border-gold/20 transition-colors duration-300">
      {student.profile_image ? (
        <img src={student.profile_image} alt={student.name}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-display text-lg sm:text-xl text-gold/60">{student.name?.charAt(0)}</span>
        </div>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-sm sm:text-base text-ink group-hover:text-gold
                       transition-colors duration-200 truncate">
          {student.name}
        </h3>
        {student.nickname && (
          <span className="hidden sm:inline text-[10px] text-gold/50 italic truncate">
            "{student.nickname}"
          </span>
        )}
      </div>
      <p className="font-body text-xs text-gray-400 truncate mt-0.5">{student.department}</p>
      {student.bio && (
        <p className="hidden sm:block font-body text-xs text-gray-300 truncate mt-1 max-w-md">
          {student.bio}
        </p>
      )}
    </div>

    {/* Action */}
    <div className="flex items-center gap-2 text-gray-300 group-hover:text-gold transition-colors duration-300">
      <span className="hidden sm:inline text-xs font-medium">View</span>
      <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
    </div>
  </motion.a>
);

// ── Skeleton Row ────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
    <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 animate-pulse" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 bg-gray-100 rounded-lg w-40 animate-pulse" />
      <div className="h-3 bg-gray-100 rounded-lg w-24 animate-pulse" />
    </div>
    <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
  </div>
);

// ── Main Component ────────────────────────────────────────────────
const Home = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [dept, setDept] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => { 
    fetchStudents(); 
    // Load signature font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    document.head.appendChild(link);
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getAllUsers();
      setStudents(res.data.users);
    } catch {
      toast.error('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtering
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return students.filter(s => {
      const matchesDept = dept === 'all' || s.department === dept;
      const matchesSearch = !q || 
        s.name?.toLowerCase().includes(q) || 
        s.department?.toLowerCase().includes(q) ||
        s.nickname?.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [search, students, dept]);

  // Departments
  const departments = useMemo(() => 
    ['all', ...new Set(students.map(s => s.department).filter(Boolean))],
    [students]
  );

  const clearSearch = () => {
    setSearch('');
    setDept('all');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6]">

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════ */}
        <div className="relative bg-ink overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

          {/* Rotating rings */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                       rounded-full border border-gold/[0.06] pointer-events-none"
            animate={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} 
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
                       rounded-full border border-gold/[0.04] pointer-events-none"
            animate={{ rotate: -360 }} 
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} 
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">

            {/* Logos */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-gold/20 
                              flex items-center justify-center backdrop-blur-sm">
                <NAMSSNLogo size={32} />
              </div>
              <div className="w-px h-8 bg-gold/20" />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-gold/20 
                              flex items-center justify-center backdrop-blur-sm">
                <UniJosLogo size={32} />
              </div>
            </motion.div>

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-body text-gold/80 text-[11px] uppercase tracking-[0.35em] mb-4"
              >
                University of Jos — Class of 2026
              </motion.p>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[0.9] tracking-tight"
              >
                Final Year
                <span className="block text-gold mt-1">Book</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="font-body text-cream/40 text-sm sm:text-base mt-6 max-w-md mx-auto leading-relaxed"
              >
                A living archive of memories, friendships, and the journey that defined our years together.
              </motion.p>
            </div>

            {/* Search */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="max-w-lg mx-auto mt-10"
            >
              <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 rounded-2xl bg-gold/20 blur-xl transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
                <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden
                                focus-within:border-gold/40 focus-within:bg-white/15 transition-all duration-300">
                  <div className="pl-5 text-cream/30">
                    <SearchIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search by name, department, or nickname..."
                    className="flex-1 bg-transparent py-4 px-3 text-cream text-sm placeholder-cream/25
                               font-body focus:outline-none"
                  />
                  {search && (
                    <button 
                      onClick={clearSearch}
                      className="pr-5 text-cream/30 hover:text-gold transition-colors duration-200"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick filters */}
              {!loading && departments.length > 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-1.5 mt-3 flex-wrap"
                >
                  {departments.slice(0, 5).map(d => (
                    <button
                      key={d}
                      onClick={() => setDept(dept === d ? 'all' : d)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide
                                  transition-all duration-200 border
                                  ${dept === d 
                                    ? 'bg-gold text-ink border-gold' 
                                    : 'bg-white/5 text-cream/40 border-white/10 hover:border-gold/30 hover:text-cream/60'
                                  }`}
                    >
                      {d === 'all' ? 'All Depts' : d.split(' ').slice(0, 2).join(' ')}
                    </button>
                  ))}
                  {departments.length > 5 && (
                    <span className="text-cream/20 text-[11px]">+{departments.length - 5} more</span>
                  )}
                </motion.div>
              )}

              {/* Delta Domain Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 flex flex-col items-center"
              >
                <div className="w-16 h-px bg-gold/20 mb-3" />
                <p
                  className="text-gold/50 text-center"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    lineHeight: 1.2,
                    letterSpacing: '0.02em',
                  }}
                >
                  Delta Domain
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CONTENT SECTION
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

          {loading ? (
            <>
              {/* Toolbar skeleton */}
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse" />
                </div>
              </div>
              {/* Grid skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </>
          ) : filtered.length === 0 ? (
            /* Empty state */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 sm:py-32"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <SearchIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-ink">
                {search ? 'No matches found' : 'No students yet'}
              </h3>
              <p className="font-body text-sm text-gray-400 mt-2 max-w-xs mx-auto">
                {search 
                  ? `We couldn't find anyone matching "${search}". Try a different term.` 
                  : 'The yearbook is empty. Be the first to complete your profile!'}
              </p>
              {search && (
                <button 
                  onClick={clearSearch}
                  className="mt-6 px-6 py-2.5 bg-ink text-cream rounded-xl text-sm font-medium
                             hover:bg-ink/90 transition-colors duration-200"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Toolbar */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
              >
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-ink">
                    {search ? (
                      <>
                        <span className="text-gold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
                      </>
                    ) : (
                      'All Students'
                    )}
                  </h2>
                  <p className="font-body text-xs text-gray-400 mt-1">
                    {dept !== 'all' ? `Filtered by ${dept}` : `Showing all ${students.length} members`}
                    {search && ` matching "${search}"`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Active filters indicator */}
                  {(search || dept !== 'all') && (
                    <button
                      onClick={clearSearch}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                    >
                      <CloseIcon className="w-3 h-3" />
                      Clear filters
                    </button>
                  )}

                  {/* View toggle */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2.5 rounded-lg transition-all duration-200
                                  ${view === 'grid' 
                                    ? 'bg-ink text-cream shadow-md' 
                                    : 'text-gray-400 hover:text-ink hover:bg-gray-50'
                                  }`}
                      title="Grid view"
                    >
                      <GridIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-2.5 rounded-lg transition-all duration-200
                                  ${view === 'list' 
                                    ? 'bg-ink text-cream shadow-md' 
                                    : 'text-gray-400 hover:text-ink hover:bg-gray-50'
                                  }`}
                      title="List view"
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {view === 'grid' ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
                  >
                    {filtered.map((student, i) => (
                      <StudentCard key={student.id} student={student} index={i} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {filtered.map((student, i) => (
                      <StudentRow key={student.id} student={student} index={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom fade */}
              <div className="h-20 bg-gradient-to-t from-[#faf9f6] to-transparent mt-8 pointer-events-none" />
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;