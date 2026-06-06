import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getAnalytics, adminGetMemories, adminDeleteMemory,
  adminGetComments, adminDeleteComment,
  createInvite, getAllInvites, deleteInvite,
  getAllUsers, deleteUser, setFeatured, adminRefreshCarousel,
} from '../services/api';
import PageWrapper from '../components/PageWrapper';
import toast from 'react-hot-toast';

// ── SVG Icons ────────────────────────────────────────────────────
const IcoUsers  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const IcoCheck  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
const IcoImage  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>;
const IcoHeart  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const IcoChat   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>;
const IcoMail   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const IcoClock  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>;
const IcoTrophy = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>;
const IcoTrash  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>;
const IcoCopy   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>;
const IcoRefresh= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;
const IcoCheckSm= () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
const IcoWarn   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>;
const IcoSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;

// ── Stat Card ────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color = 'text-gold', icon }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm
                  hover:border-gold/20 hover:shadow-md hover:-translate-y-0.5
                  transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <span className={`${color}`}>{icon}</span>
      <span style={{ fontFamily: "'Bebas Neue',sans-serif" }} className="text-3xl text-ink leading-none">
        {value ?? '—'}
      </span>
    </div>
    <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">{label}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
);

// ── Section Header ───────────────────────────────────────────────
const SectionHeader = ({ title, count }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 style={{ fontFamily: "'Bebas Neue',sans-serif" }} className="text-xl sm:text-2xl text-ink tracking-widest">
      {title}
    </h2>
    {count !== undefined && (
      <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
        {count} total
      </span>
    )}
  </div>
);

// ── Panel ────────────────────────────────────────────────────────
const Panel = ({ children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
    {children}
  </div>
);

// ── Row ──────────────────────────────────────────────────────────
const Row = ({ children, className = '' }) => (
  <div className={`px-4 sm:px-5 py-3.5 border-b border-gray-50 last:border-0
                   flex items-center justify-between gap-3 flex-wrap ${className}`}>
    {children}
  </div>
);

// ── Delete Button ────────────────────────────────────────────────
const DelBtn = ({ onClick, label = 'Delete' }) => (
  <button onClick={onClick}
    className="text-xs text-gray-400 border border-gray-200 px-3 py-1.5
               rounded-lg hover:border-red-200 hover:text-red-500 hover:bg-red-50
               transition-all font-medium">
    {label}
  </button>
);

// ── Tab Button ───────────────────────────────────────────────────
const TabBtn = ({ active, onClick, children }) => (
  <button onClick={onClick}
    className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-medium uppercase tracking-widest
                transition-all duration-200 whitespace-nowrap
                ${active
                  ? 'bg-ink text-cream shadow-md shadow-ink/10'
                  : 'text-gray-400 hover:text-ink hover:bg-gray-50'
                }`}>
    {children}
  </button>
);

// ── Status Badge ─────────────────────────────────────────────────
const StatusBadge = ({ complete }) => (
  <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wider border
    ${complete
      ? 'bg-green-50 text-green-600 border-green-200'
      : 'bg-yellow-50 text-yellow-600 border-yellow-200'
    }`}>
    {complete ? 'Complete' : 'Incomplete'}
  </span>
);

// ── Avatar ───────────────────────────────────────────────────────
const Avatar = ({ src, name, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  return (
    <div className={`${sizes[size]} rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200`}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span className="text-gold font-bold">{name?.charAt(0)?.toUpperCase()}</span>
      }
    </div>
  );
};

// ── Main Admin Component ─────────────────────────────────────────
const Admin = () => {
  const [tab, setTab] = useState('analytics');
  const [analytics, setAnalytics]   = useState(null);
  const [memories, setMemories]     = useState([]);
  const [comments, setComments]     = useState([]);
  const [users, setUsers]           = useState([]);
  const [invites, setInvites]       = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [creatingInvite, setCreatingInvite] = useState(false);
  const [newLink, setNewLink]       = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [savingCarousel, setSavingCarousel] = useState(false);
  const [loading, setLoading]       = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600&family=Great+Vibes&display=swap';
    document.head.appendChild(link);
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [ana, mem, com, usr, inv] = await Promise.all([
        getAnalytics(),
        adminGetMemories(),
        adminGetComments(),
        getAllUsers(),
        getAllInvites(),
      ]);
      setAnalytics(ana.data);
      setMemories(mem.data.memories);
      setComments(com.data.comments);
      setUsers(usr.data.users);
      setInvites(inv.data.invites);
    } catch {
      toast.error('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMemory = async (id) => {
    if (!window.confirm('Remove this memory permanently?')) return;
    try {
      await adminDeleteMemory(id);
      setMemories(prev => prev.filter(m => m.id !== id));
      toast.success('Memory removed.');
    } catch { toast.error('Failed.'); }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Remove this comment?')) return;
    try {
      await adminDeleteComment(id);
      setComments(prev => prev.filter(c => c.id !== id));
      toast.success('Comment removed.');
    } catch { toast.error('Failed.'); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted.');
    } catch { toast.error('Failed.'); }
  };

  const handleCreateInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setCreatingInvite(true);
    try {
      const res = await createInvite({ email: inviteEmail });
      setInvites(prev => [res.data.invite, ...prev]);
      setNewLink(res.data.inviteLink);
      setInviteEmail('');
      toast.success('Invite created!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed.');
    } finally {
      setCreatingInvite(false);
    }
  };

  const handleDeleteInvite = async (id) => {
    try {
      await deleteInvite(id);
      setInvites(prev => prev.filter(i => i.id !== id));
      toast.success('Invite deleted.');
    } catch { toast.error('Failed.'); }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleSetCarousel = async () => {
    if (selectedIds.length !== 3) {
      return toast.error('Select exactly 3 students.');
    }
    setSavingCarousel(true);
    try {
      await setFeatured({ user_ids: selectedIds });
      setSelectedIds([]);
      toast.success("Finalist of the Day updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed.');
    } finally {
      setSavingCarousel(false);
    }
  };

  const handleRefreshCarousel = async () => {
    if (!window.confirm("Clear today's featured? New ones will be picked randomly on next visit.")) return;
    try {
      await adminRefreshCarousel();
      toast.success("Carousel cleared. Will repick automatically.");
    } catch { toast.error('Failed.'); }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMemories = memories.filter(m =>
    m.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.uploader?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredComments = comments.filter(c =>
    c.commenter_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.profile_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvites = invites.filter(i =>
    i.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <div className="text-gold text-2xl animate-pulse"
               style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 4 }}>
            Loading Dashboard…
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ── Header ── */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs text-gold uppercase tracking-[0.3em] mb-2 font-medium">
                  Admin Console
                </p>
                <h1 style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                    className="text-4xl sm:text-5xl text-ink tracking-wider leading-none">
                  FYB <span className="text-gold">Dashboard</span>
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                  Manage students, content, invites and featured finalists.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72 flex-shrink-0">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <IcoSearch />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search students, memories, comments..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                             text-sm text-ink outline-none focus:border-gold/50
                             transition-colors placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="border-b border-gray-100 bg-white/80 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-1 overflow-x-auto no-scrollbar">
            {[
              { key: 'analytics', label: 'Analytics' },
              { key: 'finalist',  label: 'Finalist'  },
              { key: 'students',  label: 'Students'  },
              { key: 'invites',   label: 'Invites'   },
              { key: 'memories',  label: 'Memories'  },
              { key: 'comments',  label: 'Comments'  },
            ].map(({ key, label }) => (
              <TabBtn key={key} active={tab === key} onClick={() => setTab(key)}>
                {label}
              </TabBtn>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <AnimatePresence mode="wait">

            {/* ══ ANALYTICS ══════════════════════════════════════════ */}
            {tab === 'analytics' && analytics && (
              <motion.div key="analytics"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} className="space-y-8 sm:space-y-10">

                {/* Stat cards */}
                <div>
                  <SectionHeader title="Overview" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    <StatCard icon={<IcoUsers />}  label="Total Students"    value={analytics.totals.students}  color="text-ink" />
                    <StatCard icon={<IcoCheck />}  label="Complete Profiles" value={analytics.totals.complete}  color="text-green-500"
                      sub={`${analytics.totals.incomplete} incomplete`} />
                    <StatCard icon={<IcoImage />}  label="Memories"          value={analytics.totals.memories}  color="text-gold" />
                    <StatCard icon={<IcoHeart />}  label="Total Likes"       value={analytics.totals.likes}     color="text-red-400" />
                    <StatCard icon={<IcoChat />}   label="Comments"          value={analytics.totals.comments}  color="text-blue-400" />
                  </div>
                </div>

                {/* Invite stats */}
                <div>
                  <SectionHeader title="Invite Stats" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <StatCard icon={<IcoMail />}  label="Total Invites"  value={analytics.totals.invites_total}  color="text-ink" />
                    <StatCard icon={<IcoCheck />}  label="Used"           value={analytics.totals.invites_used}   color="text-green-500" />
                    <StatCard icon={<IcoClock />}  label="Active"         value={analytics.totals.invites_active} color="text-gold" />
                  </div>
                </div>

                {/* Profile completion bar */}
                <div>
                  <SectionHeader title="Profile Completion Rate" />
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {analytics.totals.complete} of {analytics.totals.students} profiles complete
                      </span>
                      <span className="text-gold font-mono text-sm font-semibold">
                        {analytics.totals.students > 0
                          ? Math.round((analytics.totals.complete / analytics.totals.students) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold/40 to-gold rounded-full transition-all duration-700"
                        style={{
                          width: analytics.totals.students > 0
                            ? `${(analytics.totals.complete / analytics.totals.students) * 100}%`
                            : '0%'
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                      {analytics.deptBreakdown.map(d => (
                        <div key={d.department}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                          <div className="text-xs text-gray-400 truncate">{d.department || 'Unknown'}</div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                               className="text-2xl text-ink mt-0.5">{d.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top liked memories */}
                <div>
                  <SectionHeader title="Top Liked Memories" count={analytics.topLiked.length} />
                  <Panel>
                    {analytics.topLiked.length === 0
                      ? <Row><span className="text-gray-400 text-sm">No memories yet.</span></Row>
                      : analytics.topLiked.map((m, i) => (
                        <Row key={m.id}>
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <span style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                                  className="text-xl text-gray-300 w-6 flex-shrink-0">{i + 1}</span>
                            {m.image_url && (
                              <img src={m.image_url} alt=""
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <div className="text-sm text-ink truncate">{m.caption || 'No caption'}</div>
                              <div className="text-xs text-gray-400">by {m.uploader}</div>
                            </div>
                          </div>
                          <span className="text-xs text-red-400 font-mono flex-shrink-0">{m.like_count} likes</span>
                        </Row>
                      ))
                    }
                  </Panel>
                </div>

                {/* Recent joins */}
                <div>
                  <SectionHeader title="Recently Joined" />
                  <Panel>
                    {analytics.recentJoins.map(u => (
                      <Row key={u.id}>
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar src={u.profile_image} name={u.name} size="sm" />
                          <div className="min-w-0">
                            <div className="text-sm text-ink font-medium truncate">{u.name}</div>
                            <div className="text-xs text-gray-400">{u.department}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <StatusBadge complete={u.profile_complete} />
                          <span className="text-xs text-gray-400 font-mono hidden sm:block">
                            {new Date(u.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </Row>
                    ))}
                  </Panel>
                </div>
              </motion.div>
            )}

            {/* ══ FINALIST OVERRIDE ══════════════════════════════════ */}
            {tab === 'finalist' && (
              <motion.div key="finalist"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} className="space-y-6 sm:space-y-8">

                <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h2 style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                      className="text-xl sm:text-2xl text-ink tracking-widest mb-1">
                    Manual Override
                  </h2>
                  <p className="text-gray-400 text-sm mb-5 sm:mb-6">
                    Select exactly <span className="text-gold font-semibold">3 students</span> to
                    feature as today's Finalist of the Day. This overrides the random pick.
                  </p>

                  {/* Selected slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
                    {[0, 1, 2].map(slot => {
                      const sid = selectedIds[slot];
                      const stu = users.find(u => u.id === sid);
                      return (
                        <div key={slot}
                          className={`rounded-xl border p-4 text-center transition-all
                            ${stu
                              ? 'border-gold/40 bg-gold/5'
                              : 'border-gray-100 bg-gray-50/50'
                            }`}>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                               className="text-xs text-gray-400 tracking-widest mb-2">
                            SLOT {slot + 1}
                          </div>
                          {stu ? (
                            <>
                              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2
                                              flex items-center justify-center overflow-hidden border border-gray-200">
                                {stu.profile_image
                                  ? <img src={stu.profile_image} alt="" className="w-full h-full object-cover" />
                                  : <span className="text-gold font-bold text-lg">{stu.name?.charAt(0)}</span>
                                }
                              </div>
                              <div className="text-sm text-ink font-medium truncate px-2">
                                {stu.name?.split(' ')[0]}
                              </div>
                              <div className="text-xs text-gray-400 truncate px-2">{stu.department}</div>
                              <button onClick={() => toggleSelect(sid)}
                                className="text-xs text-gray-400 mt-2 hover:text-red-500 transition-colors">
                                Remove
                              </button>
                            </>
                          ) : (
                            <div className="text-gray-300 text-xs py-4">Empty — select below</div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <button onClick={handleSetCarousel} disabled={savingCarousel || selectedIds.length !== 3}
                      className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-ink text-cream
                                 rounded-xl text-sm hover:bg-ink/90 transition-all
                                 disabled:opacity-40 disabled:cursor-not-allowed
                                 shadow-lg shadow-ink/10 font-medium">
                      {savingCarousel ? '…' : 'Set Finalists'}
                      <span className="text-cream/60 text-xs">({selectedIds.length}/3)</span>
                    </button>
                    <button onClick={handleRefreshCarousel}
                      className="flex items-center gap-2 px-5 sm:px-6 py-2.5 border border-gray-200 text-gray-500 rounded-xl
                                 text-sm hover:border-gold/40 hover:text-gold transition-all font-medium">
                      <IcoRefresh /> Reset to Random
                    </button>
                  </div>
                </div>

                {/* Search for students */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <IcoSearch />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search students by name or department..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl
                               text-sm text-ink outline-none focus:border-gold/50
                               transition-colors placeholder-gray-300 shadow-sm"
                  />
                </div>

                {/* Student picker */}
                <div>
                  <SectionHeader title="Pick Students" count={filteredUsers.length} />
                  <Panel>
                    {filteredUsers.map(u => {
                      const isSelected = selectedIds.includes(u.id);
                      return (
                        <div key={u.id}
                          onClick={() => toggleSelect(u.id)}
                          className={`px-4 sm:px-5 py-3.5 border-b border-gray-50 last:border-0
                                      flex items-center justify-between gap-3 cursor-pointer
                                      transition-all duration-200
                                      ${isSelected
                                        ? 'bg-gold/5'
                                        : 'hover:bg-gray-50/50'
                                      }`}>
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Checkbox */}
                            <div className={`w-5 h-5 rounded-md border flex items-center
                                            justify-center transition-all flex-shrink-0
                                            ${isSelected
                                              ? 'bg-ink border-ink'
                                              : 'border-gray-200'
                                            }`}>
                              {isSelected && <IcoCheckSm />}
                            </div>

                            <Avatar src={u.profile_image} name={u.name} size="sm" />

                            <div className="min-w-0">
                              <div className="text-sm text-ink font-medium truncate">{u.name}</div>
                              <div className="text-xs text-gray-400">{u.department}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <StatusBadge complete={u.profile_complete} />
                            {isSelected && (
                              <span style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                                    className="text-gold text-sm hidden sm:block">
                                SLOT {selectedIds.indexOf(u.id) + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </Panel>
                </div>
              </motion.div>
            )}

            {/* ══ STUDENTS ═══════════════════════════════════════════ */}
            {tab === 'students' && (
              <motion.div key="students"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}>
                <SectionHeader title="All Students" count={filteredUsers.length} />
                <Panel>
                  {filteredUsers.length === 0
                    ? <Row><span className="text-gray-400 text-sm">No students found.</span></Row>
                    : filteredUsers.map(u => (
                      <Row key={u.id}>
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar src={u.profile_image} name={u.name} />
                          <div className="min-w-0">
                            <div className="text-sm text-ink font-medium truncate">{u.name}</div>
                            <div className="text-xs text-gray-400">{u.department}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <StatusBadge complete={u.profile_complete} />
                          <span className="text-xs text-gray-400 font-mono hidden sm:block">
                            {new Date(u.created_at).toLocaleDateString()}
                          </span>
                          <DelBtn onClick={() => handleDeleteUser(u.id)} label="Remove" />
                        </div>
                      </Row>
                    ))
                  }
                </Panel>
              </motion.div>
            )}

            {/* ══ INVITES ════════════════════════════════════════════ */}
            {tab === 'invites' && (
              <motion.div key="invites"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} className="space-y-6">

                {/* Create invite */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h2 style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                      className="text-xl sm:text-2xl text-ink tracking-widest mb-4">
                    Create Invite
                  </h2>
                  <form onSubmit={handleCreateInvite} className="flex gap-3 flex-wrap sm:flex-nowrap">
                    <input
                      type="email" value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      placeholder="student@school.edu" required
                      className="flex-1 min-w-0 px-4 py-2.5 bg-gray-50 border border-gray-200
                                 rounded-xl text-sm text-ink outline-none
                                 focus:border-gold/50 transition-colors
                                 placeholder-gray-300"
                    />
                    <button type="submit" disabled={creatingInvite}
                      className="px-5 sm:px-6 py-2.5 bg-ink text-cream rounded-xl text-sm
                                 hover:bg-ink/90 transition-all disabled:opacity-50 font-medium
                                 shadow-md shadow-ink/10 whitespace-nowrap">
                      {creatingInvite ? '…' : 'Send Invite'}
                    </button>
                  </form>

                  {newLink && (
                    <div className="mt-4 flex items-center gap-3 bg-gray-50
                                    border border-gray-100 rounded-xl px-4 py-3">
                      <span className="text-xs text-gray-400 truncate flex-1 font-mono">
                        {newLink}
                      </span>
                      <button onClick={() => { navigator.clipboard.writeText(newLink); toast.success('Copied!'); }}
                        className="text-xs text-gold border border-gold/30 px-3 py-1.5
                                   rounded-lg hover:bg-gold/5 transition-all whitespace-nowrap
                                   flex items-center gap-1 font-medium">
                        <IcoCopy /> Copy
                      </button>
                    </div>
                  )}
                </div>

                {/* Invite list */}
                <div>
                  <SectionHeader title="All Invites" count={filteredInvites.length} />
                  <Panel>
                    {filteredInvites.length === 0
                      ? <Row><span className="text-gray-400 text-sm">No invites found.</span></Row>
                      : filteredInvites.map(inv => (
                        <Row key={inv.id}>
                          <div className="min-w-0">
                            <div className="text-sm text-ink font-mono truncate">{inv.email}</div>
                            <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                              <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium border
                                ${inv.used
                                  ? 'bg-gray-50 text-gray-400 border-gray-100'
                                  : 'bg-green-50 text-green-600 border-green-200'
                                }`}>
                                {inv.used ? 'Used' : 'Active'}
                              </span>
                              <span className="text-xs text-gray-400 font-mono">
                                Expires {new Date(inv.expires_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!inv.used && (
                              <button
                                onClick={() => {
                                  const link = `${window.location.origin}/register?token=${inv.token}`;
                                  navigator.clipboard.writeText(link);
                                  toast.success('Link copied!');
                                }}
                                className="text-xs text-gold border border-gold/30
                                           px-3 py-1.5 rounded-lg hover:bg-gold/5
                                           transition-all flex items-center gap-1 font-medium">
                                <IcoCopy /> Copy
                              </button>
                            )}
                            <DelBtn onClick={() => handleDeleteInvite(inv.id)} />
                          </div>
                        </Row>
                      ))
                    }
                  </Panel>
                </div>
              </motion.div>
            )}

            {/* ══ MEMORIES ═══════════════════════════════════════════ */}
            {tab === 'memories' && (
              <motion.div key="memories"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}>
                <SectionHeader title="All Memories" count={filteredMemories.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMemories.length === 0
                    ? <p className="text-gray-400 text-sm col-span-full">No memories found.</p>
                    : filteredMemories.map(m => (
                      <div key={m.id}
                        className="bg-white border border-gray-100 rounded-2xl
                                   overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-48 sm:h-44 bg-gray-50 overflow-hidden">
                          <img src={m.image_url} alt={m.caption}
                            className="w-full h-full object-cover group-hover:scale-105
                                       transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30
                                          transition-all duration-300 flex items-center justify-center">
                            <button onClick={() => handleDeleteMemory(m.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity
                                         px-4 py-2 bg-red-500 text-white text-xs rounded-xl
                                         hover:bg-red-600 font-medium shadow-lg">
                              Remove
                            </button>
                          </div>
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-400
                                          text-xs px-2 py-0.5 rounded-full border border-gray-100 font-medium">
                            {m.like_count} likes
                          </div>
                        </div>
                        <div className="p-3 sm:p-4">
                          <p className="text-xs text-gray-500 truncate">{m.caption || 'No caption'}</p>
                          <p className="text-xs text-gray-400 mt-1">by {m.uploader}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </motion.div>
            )}

            {/* ══ COMMENTS ═══════════════════════════════════════════ */}
            {tab === 'comments' && (
              <motion.div key="comments"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}>
                <SectionHeader title="All Comments" count={filteredComments.length} />
                <Panel>
                  {filteredComments.length === 0
                    ? <Row><span className="text-gray-400 text-sm">No comments found.</span></Row>
                    : filteredComments.map(c => (
                      <Row key={c.id} className="!items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm text-ink font-medium">{c.commenter_name}</span>
                            <span className="text-xs text-gray-300">→</span>
                            <span className="text-sm text-gold">{c.profile_name}</span>
                            <span className="text-xs text-gray-300 font-mono ml-auto hidden sm:block">
                              {new Date(c.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
                            {c.comment}
                          </p>
                          <span className="text-xs text-gray-300 font-mono mt-1 block sm:hidden">
                            {new Date(c.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <DelBtn onClick={() => handleDeleteComment(c.id)} />
                      </Row>
                    ))
                  }
                </Panel>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Footer Signature ── */}
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-px bg-gold/30" />
              <p
                className="text-gold/60 text-center"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  lineHeight: 1.2,
                  letterSpacing: '0.02em',
                }}
              >
                Delta Domain
              </p>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-medium">
                Crafted with care
              </p>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};

export default Admin;