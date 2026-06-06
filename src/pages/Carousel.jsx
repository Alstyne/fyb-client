import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFeatured } from '../services/api';
import PageWrapper from '../components/PageWrapper';
import { NAMSSNLogo, UniJosLogo } from '../components/Logos';
import toast from 'react-hot-toast';

// ── SVG Icons (outline style, matching the Feed) ───────────────────
const Icon = {
  Book:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
  Trophy:() => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v1.5c0 .621-.504 1.125-1.125 1.125M18 10.5h-15M18 10.5c0-1.898 1.012-3.813 2.5-5.25M3.75 10.5c0-1.898 1.012-3.813 2.5-5.25m12.5 5.25v3.375c0 .621-.504 1.125-1.125 1.125M3.75 10.5v3.375c0 .621.504 1.125 1.125 1.125m0 0h12.75m-12.75 0c0 1.898 1.012 3.813 2.5 5.25m12.5-5.25c0 1.898-1.012 3.813-2.5 5.25M15.75 10.5V18m0-7.5v3.375c0 .621-.504 1.125-1.125 1.125H4.125c-.621 0-1.125-.504-1.125-1.125V10.5m15.75 0c0-.621-.504-1.125-1.125-1.125H4.125c-.621 0-1.125.504-1.125 1.125" /></svg>,
  Chart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  Quote: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  Star:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  Prev:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  Next:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  User:  () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gray-300"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
};

// ── Stat Tile ─────────────────────────────────────────────────────
const StatTile = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
    <span className="text-gold">{icon}</span>
    <span className="text-xl sm:text-2xl text-ink leading-none font-display">{value || '—'}</span>
    <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide leading-tight">{label}</span>
  </div>
);

// ── Progress Row ────────────────────────────────────────────────
const ProgressRow = ({ label }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-[10px] text-gray-500 truncate max-w-[80%]">{label}</span>
      <span className="text-[10px] text-gold font-medium">100%</span>
    </div>
    <div className="h-1 bg-gray-100 rounded-full">
      <div className="h-full w-full bg-gradient-to-r from-ink to-gold rounded-full" />
    </div>
  </div>
);

// ── Info Block ────────────────────────────────────────────────────
const InfoBlock = ({ icon, title, value }) => (
  <div className="flex gap-3 items-start p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
    <span className="bg-gray-100 rounded-lg p-2 text-ink flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <div className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1">{title}</div>
      <div className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">{value || '—'}</div>
    </div>
  </div>
);

// ── Card Header ───────────────────────────────────────────────────
const CardHeader = ({ student }) => (
  <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between gap-3">
    {/* Left — dept logo */}
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
        {student.assoc_logo
          ? <img src={student.assoc_logo} alt="Dept" className="w-full h-full object-cover" />
          : <NAMSSNLogo size={28} />}
      </div>
      <div className="hidden sm:block min-w-0">
        <div className="text-xs text-ink font-bold tracking-wider font-display">FYB 2026</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wide truncate max-w-[100px]">{student.department}</div>
      </div>
    </div>

    {/* Center label */}
    <div className="text-center flex-shrink-0">
      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-display">Finalist of the Day</div>
    </div>

    {/* Right — uni logo */}
    <div className="flex items-center gap-3 min-w-0 justify-end">
      <div className="hidden sm:block min-w-0 text-right">
        <div className="text-xs text-ink font-bold tracking-wider font-display">Class of 2026</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wide truncate max-w-[100px]">{student.department}</div>
      </div>
      <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
        {student.uni_logo
          ? <img src={student.uni_logo} alt="Uni" className="w-full h-full object-cover" />
          : <UniJosLogo size={28} />}
      </div>
    </div>
  </div>
);

// ── Social Link Icons ─────────────────────────────────────────────
const SocialLinks = ({ student }) => {
  const links = [
    { href: student.link_x,        color: '#1a1a1a', label: 'X',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { href: student.link_whatsapp ? (student.link_whatsapp.startsWith('http') ? student.link_whatsapp : `https://wa.me/${student.link_whatsapp.replace(/[^0-9]/g,'')}`) : null,
      color: '#22c55e', label: 'WA',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { href: student.link_facebook, color: '#3b82f6', label: 'FB',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { href: student.link_instagram, color: '#e1306c', label: 'IG',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  ].filter(l => l.href);
  if (!links.length) return null;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {links.map(({ href, color, label, icon }) => (
        <a key={label} href={href.startsWith('http') ? href : `https://${href}`}
           target="_blank" rel="noopener noreferrer"
           className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:scale-110 transition-all hover:text-gold hover:border-gold/30"
           style={{ '--hover-color': color }}
           onMouseOver={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '60'; }}
           onMouseOut={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}>
          {icon}
        </a>
      ))}
    </div>
  );
};

// ── Finalist Card ──────────────────────────────────────────────────
const FinalistCard = ({ student }) => {
  const glance = student.at_a_glance?.length > 0 ? student.at_a_glance : [
    { label: 'Fav. Courses',     value: student.num_favourite_courses || '—' },
    { label: 'Top Level',        value: '500L' },
    { label: 'Experience',       value: student.experience ? '✓' : '—' },
    { label: 'Memorable Day',    value: student.most_memorable_day ? '✓' : '—' },
    { label: 'Parting Words',    value: student.parting_words ? '✓' : '—' },
    { label: 'If not Stats?',    value: student.if_not_stats ? '→' : '?' },
  ];
  const icons = [<Icon.Book/>,<Icon.Trophy/>,<Icon.Chart/>,<Icon.Trophy/>,<Icon.Quote/>,<Icon.Star/>];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
      {/* Header */}
      <CardHeader student={student} />

      {/* Body — stacks on mobile, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row">
        {/* ── Left panel ── */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-5 flex flex-col gap-5">
          {/* Photo + basic info: side by side on mobile, stacked on md */}
          <div className="flex flex-row md:flex-col gap-4">
            {/* Photo */}
            <div className="w-28 h-36 sm:w-32 sm:h-40 md:w-full md:h-auto md:aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
              {student.profile_image
                ? <img src={student.profile_image} alt={student.name} className="w-full h-full object-cover" />
                : <Icon.User />}
            </div>

            {/* Info rows */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {[
                { label: 'Name',      value: student.name },
                { label: 'Nickname',  value: student.nickname },
                { label: 'Birthday',  value: student.date_of_birth },
                { label: 'Status',    value: student.relationship_status },
                { label: 'Fav. Food', value: student.favourite_food },
                { label: 'Dream',     value: student.childhood_dream },
              ].map(({ label, value }) => (
                <div key={label} className="border-b border-gray-100 pb-1.5 min-w-0">
                  <div className="text-[8px] text-gray-400 uppercase tracking-widest">{label}</div>
                  <div className="text-[10px] sm:text-xs text-ink font-medium truncate">{value || '—'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic progress block */}
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="text-[10px] text-gold uppercase tracking-widest font-bold text-center mb-3 pb-3 border-b border-gray-100">
              Academic
            </div>
            <ProgressRow label={`Fav: ${student.favourite_course || '—'}`} />
            <ProgressRow label={`Worst: ${student.worst_course || '—'}`} />
            <ProgressRow label={`Lecturer: ${student.favourite_lecturer || '—'}`} />
            <ProgressRow label={`Hardest: ${student.most_difficult_topic || '—'}`} />
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col gap-5">
          {/* Title row */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl sm:text-4xl lg:text-5xl text-ink leading-none font-display">FINALIST</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl text-gold leading-none font-display">OF THE DAY</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Celebrating{' '}
              <span className="text-ink font-medium">{student.celebrating_name || student.name}</span>
              {' '}and excellence in{' '}
              <span className="text-gold">{student.celebrating_dept || student.department || 'Statistics'}</span>.
            </p>
          </div>

          {/* At a Glance */}
          <div>
            <div className="text-[10px] text-gold uppercase tracking-widest font-bold mb-3">At a Glance</div>
            <div className="grid grid-cols-3 gap-2">
              {glance.slice(0, 6).map((item, i) => (
                <StatTile key={i} icon={icons[i % icons.length]} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          {/* Info blocks */}
          <div className="flex flex-col gap-2">
            <InfoBlock icon={<Icon.Chart />}  title="Statistics Experience" value={student.experience} />
            <InfoBlock icon={<Icon.Trophy />} title="Most Memorable Day"   value={student.most_memorable_day} />
            <InfoBlock icon={<Icon.Quote />}  title="Parting Words"
                       value={student.parting_words ? `"${student.parting_words}"` : '—'} />
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
            <SocialLinks student={student} />
            <span className="text-[10px] text-gray-300 uppercase tracking-widest ml-auto">FYB 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Countdown ─────────────────────────────────────────────────────
const useCountdown = () => {
  const [t, setT] = useState('');
  useEffect(() => {
    const calc = () => {
      const now = new Date(), next = new Date(now);
      next.setDate(next.getDate() + 1); next.setHours(0,0,0,0);
      const d = next - now;
      const h = Math.floor(d/3600000).toString().padStart(2,'0');
      const m = Math.floor((d%3600000)/60000).toString().padStart(2,'0');
      const s = Math.floor((d%60000)/1000).toString().padStart(2,'0');
      setT(`${h} : ${m} : ${s}`);
    };
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id);
  }, []);
  return t;
};

// ── Main Page ─────────────────────────────────────────────────────
const CarouselPage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [index, setIndex]       = useState(0);
  const [dir, setDir]           = useState('next');
  const autoRef = useRef();
  const countdown = useCountdown();
  const INTERVAL  = 8000;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
    (async () => {
      setLoading(true);
      try { const r = await getFeatured(); setFeatured(r.data.featured); }
      catch { toast.error('Failed to load.'); }
      finally { setLoading(false); }
    })();
  }, []);

  const advance = useCallback((direction) => {
    setDir(direction);
    setIndex(p => direction === 'next'
      ? (p + 1) % featured.length
      : (p - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    if (featured.length <= 1) return;
    autoRef.current = setInterval(() => advance('next'), INTERVAL);
    return () => clearInterval(autoRef.current);
  }, [advance, featured.length]);

  const go = (d) => {
    clearInterval(autoRef.current); advance(d);
    autoRef.current = setInterval(() => advance('next'), INTERVAL);
  };

  if (loading) return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="text-gold text-xl animate-pulse tracking-[0.3em] font-display">Loading…</div>
      </div>
    </PageWrapper>
  );

  if (!featured.length) return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center gap-3 px-6">
        <div className="text-3xl text-ink tracking-widest text-center font-display">No Featured Students Yet</div>
        <p className="text-gray-400 text-sm text-center max-w-xs">Students need to complete their profiles first.</p>
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ═══════════════════════════════════════════════════════════
            HERO HEADER
        ═══════════════════════════════════════════════════════════ */}
        <div className="relative bg-ink overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-gold/80 text-[11px] uppercase tracking-[0.35em] mb-2"
                >
                  FYB 2026
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl text-cream leading-[0.9] tracking-tight"
                >
                  FINALIST <span className="text-gold">OF THE DAY</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-cream/40 text-sm mt-4 max-w-md leading-relaxed"
                >
                  2 students featured daily · Rotates every 24 hours
                </motion.p>
              </div>

              <div className="text-right">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[10px] text-cream/40 uppercase tracking-widest mb-2 flex items-center gap-1 justify-end"
                >
                  <Icon.Clock /> Next rotation
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl sm:text-4xl text-gold tracking-widest font-display"
                >
                  {countdown}
                </motion.div>
                <p className="text-[10px] text-cream/30 mt-1 tracking-widest">HH : MM : SS</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            MAIN CONTENT
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">

          {/* Slot tabs + progress bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {featured.map((s, i) => (
              <button key={i}
                onClick={() => { clearInterval(autoRef.current); setDir('next'); setIndex(i); autoRef.current = setInterval(() => advance('next'), INTERVAL); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-medium transition-all duration-300
                            ${index === i
                              ? 'bg-ink text-cream shadow-md border-ink'
                              : 'bg-white border-gray-200 text-gray-400 hover:text-ink hover:border-gold/30'
                            }`}>
                <span className="font-semibold">Slot {i + 1}</span>
                <span className="opacity-60 hidden sm:inline">· {s.name?.split(' ')[0]}</span>
              </button>
            ))}
            <div className="flex-1 h-px bg-gray-100 rounded-full overflow-hidden min-w-[40px]">
              <div key={index} className="h-full bg-gold rounded-full" style={{ animation: `progressFill ${INTERVAL}ms linear forwards` }} />
            </div>
          </div>

          {/* ── Card ── */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: dir === 'next' ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === 'next' ? -40 : 40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <FinalistCard student={featured[index]} />
              </motion.div>
            </AnimatePresence>

            {/* Desktop arrows */}
            {featured.length > 1 && <>
              <button onClick={() => go('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12
                           w-10 h-10 rounded-full border border-gray-200 bg-white
                           text-gray-400 items-center justify-center
                           hover:text-gold hover:border-gold/30 transition-all hidden lg:flex shadow-sm">
                <Icon.Prev />
              </button>
              <button onClick={() => go('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
                           w-10 h-10 rounded-full border border-gray-200 bg-white
                           text-gray-400 items-center justify-center
                           hover:text-gold hover:border-gold/30 transition-all hidden lg:flex shadow-sm">
                <Icon.Next />
              </button>
            </>}
          </div>

          {/* Mobile nav buttons */}
          {featured.length > 1 && (
            <div className="flex justify-center gap-4 mt-2 lg:hidden">
              <button onClick={() => go('prev')}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white
                           text-gray-400 flex items-center justify-center
                           hover:text-gold hover:border-gold/30 transition-all active:scale-95 shadow-sm">
                <Icon.Prev />
              </button>
              <div className="flex items-center gap-1.5">
                {featured.map((_, i) => (
                  <button key={i} onClick={() => { clearInterval(autoRef.current); setDir('next'); setIndex(i); autoRef.current = setInterval(() => advance('next'), INTERVAL); }}
                    className={`rounded-full transition-all
                                ${index === i ? 'w-4 h-2 bg-gold' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'}`} />
                ))}
              </div>
              <button onClick={() => go('next')}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white
                           text-gray-400 flex items-center justify-center
                           hover:text-gold hover:border-gold/30 transition-all active:scale-95 shadow-sm">
                <Icon.Next />
              </button>
            </div>
          )}

          {/* Counter */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl text-gold font-display">{String(index + 1).padStart(2,'0')}</span>
            <span className="text-gray-300">/</span>
            <span className="text-2xl text-gray-300 font-display">{String(featured.length).padStart(2,'0')}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressFill { from{width:0%} to{width:100%} }
      `}</style>
    </PageWrapper>
  );
};

export default CarouselPage;