// import { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {
//   getUserById, updateFullProfile,
//   addMemory, deleteMemory,
//   addComment, deleteComment,
//   toggleLike, checkLike,
//   uploadProfileImage, uploadMemoryImage,
// } from '../services/api';
// import PageWrapper from '../components/PageWrapper';
// import ImageUploader from '../components/ImageUploader';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { NAMSSNLogo, UniJosLogo } from '../components/Logos';

// const PERSONALITY_TAGS = [
//   'The Quiet Storm', 'Class Clown', 'The Overthinker', 'Always Late',
//   'First to Leave', 'Group Chat Admin', 'Never Studies', 'Always Studying',
//   'The Motivator', 'Certified Foodie', 'Night Owl', 'Early Bird',
//   'The Networker', 'Introverted Extrovert', 'The Fixer', 'Drama Free',
//   'Main Character', 'Side Character', 'The Planner', 'Goes with the Flow',
//   'Gym Rat', 'Professional Napper', 'The Philosopher', 'Trend Setter',
//   'Old Soul', 'Free Spirit', 'The Realist', 'Hopeless Romantic',
//   'The Optimist', 'The Pessimist', 'The Empath', 'The Strategist',
//   'Born Leader', 'Team Player', 'The Negotiator', 'The Peacemaker',
//   'Risk Taker', 'Plays it Safe', 'The Creative', 'The Analyst',
//   'Jack of All Trades', 'Master of One', 'The Storyteller', 'The Listener',
//   'The Connector', 'The Disruptor', 'The Loyalist', 'The Visionary',
//   'The Grinder', 'The Legend',
// ];

// // ── Inline SVG Icons ─────────────────────────────────────────────
// const Icon = {
//   User:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
//   Calendar: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>,
//   Heart:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
//   Food:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-4.5-6.72-5-8.99-5C4.14 9.99 1 10.5 1 14.99v1h15.03v-1z"/></svg>,
//   Star:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
//   Book:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/></svg>,
//   Chart:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>,
//   Trophy:   () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
//   Quote:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
//   Edit:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
//   Save:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>,
//   Download: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>,
//   Close:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
//   Card:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 8h16v2H4z"/></svg>,
//   Photo:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
//   Chat:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>,
// };

// // ── Stat Card ────────────────────────────────────────────────────
// const StatCard = ({ icon, value, label }) => (
//   <div className="flex flex-col items-center gap-1 p-3 rounded-xl
//                   border border-gray-100 bg-white shadow-sm
//                   hover:border-gold/30 hover:-translate-y-1
//                   transition-all duration-300">
//     <span className="text-gold">{icon}</span>
//     <span style={{ fontFamily: "'Bebas Neue', sans-serif" }}
//           className="text-3xl text-ink leading-none">{value || '—'}</span>
//     <span className="text-xs text-gray-400 uppercase tracking-wider text-center leading-tight">
//       {label}
//     </span>
//   </div>
// );

// // ── Info Row ─────────────────────────────────────────────────────
// const InfoRow = ({ icon, label, value }) => (
//   <div className="flex items-start gap-3 py-2 border-b border-gray-100">
//     <span className="bg-gold/10 rounded-md p-1.5 text-gold flex-shrink-0 mt-0.5">
//       {icon}
//     </span>
//     <div className="min-w-0">
//       <div className="text-xs text-gray-400 uppercase tracking-widest">{label}</div>
//       <div className="text-xs text-ink font-medium mt-0.5 break-words">{value || '—'}</div>
//     </div>
//   </div>
// );

// // ── Info Block ───────────────────────────────────────────────────
// const InfoBlock = ({ icon, title, children }) => (
//   <div className="flex gap-3 items-start p-3 rounded-xl
//                   bg-gray-50/50 border border-gray-100">
//     <span className="bg-gold/10 rounded-lg p-2 text-gold flex-shrink-0">{icon}</span>
//     <div className="min-w-0">
//       <div className="text-xs text-gold uppercase tracking-wider font-bold mb-1">{title}</div>
//       <div className="text-sm text-gray-600 leading-relaxed break-words">{children}</div>
//     </div>
//   </div>
// );

// // ── Progress Row ─────────────────────────────────────────────────
// const ProgressRow = ({ label }) => (
//   <div className="mb-2.5">
//     <div className="flex justify-between mb-1">
//       <span className="text-xs text-gray-500 uppercase tracking-wide truncate max-w-[80%]">{label}</span>
//       <span className="text-xs text-gold">100%</span>
//     </div>
//     <div className="h-0.5 bg-gray-100 rounded-full">
//       <div className="h-full w-full bg-gradient-to-r from-gold/40 to-gold rounded-full" />
//     </div>
//   </div>
// );

// // ── Edit Field ───────────────────────────────────────────────────
// const EditField = ({ label, name, value, onChange, type = 'text', rows }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-xs text-gray-400 uppercase tracking-widest">{label}</label>
//     {rows ? (
//       <textarea
//         name={name} value={value || ''} onChange={onChange} rows={rows}
//         className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2
//                    text-sm text-ink outline-none resize-none
//                    focus:border-gold/50 transition-colors"
//       />
//     ) : (
//       <input
//         type={type} name={name} value={value || ''} onChange={onChange}
//         className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2
//                    text-sm text-ink outline-none
//                    focus:border-gold/50 transition-colors"
//       />
//     )}
//   </div>
// );

// // ── Main Profile Component ────────────────────────────────────────
// const Profile = () => {
//   const { id } = useParams();
//   const { user: currentUser } = useAuth();
//   const isOwner = currentUser?.id === id;
//   const isAdmin = currentUser?.role === 'admin';
//   const cardRef = useRef();

//   const [profile, setProfile] = useState(null);
//   const [memories, setMemories] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState({});
//   const [likedMap, setLikedMap] = useState({});
//   const [commentText, setCommentText] = useState('');
//   const [memoryForm, setMemoryForm] = useState({ image_url: '', caption: '' });
//   const [uploadingMemory, setUploadingMemory] = useState(false);
//   const [uploadingProfile, setUploadingProfile] = useState(false);
//   const [addingMemory, setAddingMemory] = useState(false);
//   const [submittingComment, setSubmittingComment] = useState(false);
//   const [activeTab, setActiveTab] = useState('card'); // 'card' | 'memories' | 'messages'

//   // Load Bebas Neue font
//   useEffect(() => {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
//     document.head.appendChild(link);
//   }, []);

//   useEffect(() => { fetchProfile(); }, [id]);

//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await getUserById(id);
//       setProfile(res.data.user);
//       setMemories(res.data.memories);
//       setComments(res.data.comments);
//       setForm(res.data.user);

//       const likeChecks = await Promise.all(
//         res.data.memories.map(m =>
//           checkLike(m.id).then(r => ({ id: m.id, liked: r.data.liked }))
//         )
//       );
//       const map = {};
//       likeChecks.forEach(({ id, liked }) => { map[id] = liked; });
//       setLikedMap(map);
//     } catch {
//       toast.error('Failed to load profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const res = await updateFullProfile(id, form);
//       setProfile(res.data.user);
//       setEditing(false);
//       toast.success('Profile saved!');
//     } catch {
//       toast.error('Failed to save profile.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleToggleLike = async memId => {
//     try {
//       const res = await toggleLike({ memory_id: memId });
//       setLikedMap(prev => ({ ...prev, [memId]: res.data.liked }));
//       setMemories(prev =>
//         prev.map(m => m.id === memId ? { ...m, like_count: res.data.like_count } : m)
//       );
//     } catch { toast.error('Failed to update like.'); }
//   };

//   const handleAddMemory = async e => {
//     e.preventDefault();
//     if (!memoryForm.image_url) return toast.error('Upload an image first.');
//     setAddingMemory(true);
//     try {
//       const res = await addMemory(memoryForm);
//       setMemories(prev => [res.data.memory, ...prev]);
//       setMemoryForm({ image_url: '', caption: '' });
//       toast.success('Memory added!');
//     } catch { toast.error('Failed to add memory.'); }
//     finally { setAddingMemory(false); }
//   };

//   const handleDeleteMemory = async memId => {
//     if (!window.confirm('Delete this memory?')) return;
//     try {
//       await deleteMemory(memId);
//       setMemories(prev => prev.filter(m => m.id !== memId));
//       toast.success('Memory deleted.');
//     } catch { toast.error('Failed to delete.'); }
//   };

//   const handleAddComment = async e => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
//     setSubmittingComment(true);
//     try {
//       const res = await addComment({ profile_id: id, comment: commentText });
//       setComments(prev => [res.data.comment, ...prev]);
//       setCommentText('');
//       toast.success('Comment added!');
//     } catch { toast.error('Failed to comment.'); }
//     finally { setSubmittingComment(false); }
//   };

//   const handleDeleteComment = async cId => {
//     try {
//       await deleteComment(cId);
//       setComments(prev => prev.filter(c => c.id !== cId));
//       toast.success('Comment deleted.');
//     } catch { toast.error('Failed to delete.'); }
//   };

//   const handleDownload = async () => {
//     if (!cardRef.current) return;
//     try {
//       const html2canvas = (await import('html2canvas')).default;
//       const canvas = await html2canvas(cardRef.current, {
//         scale: 2, backgroundColor: '#faf9f6', useCORS: true,
//       });
//       const link = document.createElement('a');
//       link.download = `${profile.name?.replace(/ /g, '_')}_FYB.png`;
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//       toast.success('Profile downloaded!');
//     } catch {
//       toast.error('Download failed. Make sure html2canvas is installed.');
//     }
//   };

//   if (loading) {
//     return (
//       <PageWrapper>
//         <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
//           <div className="text-gold text-2xl animate-pulse"
//                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4 }}>
//             Loading Profile...
//           </div>
//         </div>
//       </PageWrapper>
//     );
//   }

//   if (!profile) {
//     return (
//       <PageWrapper>
//         <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
//           <p className="text-gray-400">Profile not found.</p>
//         </div>
//       </PageWrapper>
//     );
//   }

//   const hasSocialLinks = profile.link_x || profile.link_whatsapp || profile.link_facebook || profile.link_instagram;

//   const tabs = [
//     { id: 'card', label: 'Card', icon: <Icon.Card /> },
//     { id: 'memories', label: 'Memories', icon: <Icon.Photo /> },
//     { id: 'messages', label: 'Messages', icon: <Icon.Chat /> },
//   ];

//   return (
//     <PageWrapper>
//       <div className="min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Outfit', sans-serif" }}>

//         {/* ── Page Header ── */}
//         <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4
//                         flex flex-col sm:flex-row sm:items-start md:items-center
//                         justify-between gap-3 sticky top-16 z-40">
//           <div className="min-w-0">
//             <h1 style={{ fontFamily: "'Bebas Neue', sans-serif" }}
//                 className="text-2xl text-ink tracking-widest">
//               {isOwner ? 'MY PROFILE' : profile.name?.toUpperCase()}
//             </h1>
//             <div className="mt-1.5">
//               {profile.profile_complete ? (
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-green-500/10 text-green-600 border border-green-500/20">
//                   Completed
//                 </span>
//               ) : (
//                 isOwner && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
//                     Uncompleted
//                   </span>
//                 )
//               )}
//             </div>
//           </div>
//           {(profile.personality_tags || []).length > 0 && (
//             <div className="flex gap-2 flex-wrap justify-start sm:justify-center">
//               {profile.personality_tags.map(tag => (
//                 <span key={tag}
//                   className="bg-gold/10 border border-gold/20 text-gold text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wide">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}
//           <div className="flex items-center gap-3 flex-wrap justify-end">
//             {/* Tab switcher — icon-only on mobile */}
//             <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
//               {tabs.map(t => (
//                 <button key={t.id} onClick={() => setActiveTab(t.id)}
//                   className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all flex items-center gap-1.5
//                     ${activeTab === t.id
//                       ? 'bg-ink text-cream shadow-md'
//                       : 'text-gray-400 hover:text-ink hover:bg-gray-50'
//                     }`}>
//                   {t.icon}
//                   <span className="hidden sm:inline">{t.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Edit / Save — icon-only on mobile */}
//             {(isOwner || isAdmin) && activeTab === 'card' && (
//               editing ? (
//                 <div className="flex gap-2 flex-wrap">
//                   <button onClick={() => setEditing(false)}
//                     className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-500 rounded-xl
//                                text-sm hover:border-gray-300 transition-all">
//                     <span className="sm:hidden"><Icon.Close /></span>
//                     <span className="hidden sm:inline">Cancel</span>
//                   </button>
//                   <button onClick={handleSave} disabled={saving}
//                     className="flex items-center gap-2 px-3 py-2 bg-ink
//                                text-cream rounded-xl text-sm hover:bg-ink/90
//                                transition-all disabled:opacity-50 shadow-md">
//                     <Icon.Save />
//                     <span className="hidden sm:inline">{saving ? 'Saving…' : 'Save Profile'}</span>
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => setEditing(true)}
//                   className="flex items-center gap-2 px-3 py-2 border border-gold/40
//                              text-gold rounded-xl text-sm hover:bg-gold/5 transition-all">
//                   <Icon.Edit />
//                   <span className="hidden sm:inline">Edit Profile</span>
//                 </button>
//               )
//             )}

//             {/* Download — icon-only on mobile */}
//             {activeTab === 'card' && (
//               <button onClick={handleDownload}
//                 className="flex items-center gap-2 px-3 py-2 bg-ink text-cream
//                            rounded-xl text-sm hover:bg-ink/90 transition-all
//                            shadow-lg shadow-ink/10">
//                 <Icon.Download />
//                 <span className="hidden sm:inline">Download</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ── CARD TAB ── */}
//         <AnimatePresence mode="wait">
//           {activeTab === 'card' && (
//             <motion.div
//               key="card"
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -16 }}
//               className="max-w-5xl mx-auto px-4 py-8"
//             >
//               {editing ? (
//                 /* ── EDIT MODE ── */
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                   {/* Left column */}
//                   <div className="space-y-4 bg-white border border-gray-100
//                                   rounded-2xl p-6 shadow-sm">
//                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">
//                       Personal Info
//                     </h3>

//                     {/* Profile photo */}
//                     <div>
//                       <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
//                         Profile Photo
//                       </label>
//                       <ImageUploader
//                         type="profile"
//                         uploading={uploadingProfile}
//                         setUploading={setUploadingProfile}
//                         onUpload={url => setForm(prev => ({ ...prev, profile_image: url }))}
//                       />
//                     </div>

//                     <EditField label="Full Name"       name="name"                value={form.name}                onChange={handleChange} />
//                     <EditField label="Nickname"        name="nickname"            value={form.nickname}            onChange={handleChange} />
//                     <EditField label="Department"      name="department"          value={form.department}          onChange={handleChange} />
//                     <EditField label="Date of Birth"   name="date_of_birth"       value={form.date_of_birth}       onChange={handleChange} />
//                     <EditField label="Relationship Status" name="relationship_status" value={form.relationship_status} onChange={handleChange} />
//                     <EditField label="Favourite Food"  name="favourite_food"      value={form.favourite_food}      onChange={handleChange} />
//                     <EditField label="Childhood Dream" name="childhood_dream"     value={form.childhood_dream}     onChange={handleChange} />
//                     <EditField label="X (Twitter) Profile URL"    name="link_x"         value={form.link_x}         onChange={handleChange} />
//                     <EditField label="WhatsApp Number or Link"     name="link_whatsapp"  value={form.link_whatsapp}  onChange={handleChange} />
//                     <EditField label="Facebook Profile URL"        name="link_facebook"  value={form.link_facebook}  onChange={handleChange} />
//                     <EditField label="Instagram Profile URL"       name="link_instagram" value={form.link_instagram} onChange={handleChange} />
//                   </div>

//                   {/* Right column */}
//                   <div className="space-y-4 bg-white border border-gray-100
//                                   rounded-2xl p-6 shadow-sm">
//                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">
//                       Academic & Finalist Info
//                     </h3>
//                     <EditField label="Bio (short tagline)" name="bio"             value={form.bio}                onChange={handleChange} />
//                     <EditField label="Favourite Course"    name="favourite_course" value={form.favourite_course}  onChange={handleChange} />
//                     <EditField label="Worst Course"        name="worst_course"     value={form.worst_course}      onChange={handleChange} />
//                     <EditField label="Favourite Lecturer"  name="favourite_lecturer" value={form.favourite_lecturer} onChange={handleChange} />
//                     <EditField label="Most Difficult Topic" name="most_difficult_topic" value={form.most_difficult_topic} onChange={handleChange} />
//                     <EditField label="No. of Favourite Courses" name="num_favourite_courses" type="number"
//                                value={form.num_favourite_courses} onChange={handleChange} />
//                     <EditField label="Statistics Experience" name="experience"    value={form.experience}         onChange={handleChange} rows={3} />
//                     <EditField label="Most Memorable Day"   name="most_memorable_day" value={form.most_memorable_day} onChange={handleChange} rows={2} />
//                     <EditField label="Parting Words"        name="parting_words"  value={form.parting_words}      onChange={handleChange} rows={3} />
//                   </div>

//                   {/* Personality Tags */}
//                   <div className="md:col-span-2">
//                     <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
//                       Personality Tags
//                       <span className="text-gray-400 ml-2 normal-case">
//                         ({(form.personality_tags || []).length}/3 selected)
//                       </span>
//                     </label>
//                     <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-gray-100">
//                       {PERSONALITY_TAGS.map(tag => {
//                         const selected = (form.personality_tags || []).includes(tag);
//                         return (
//                           <button key={tag} type="button"
//                             onClick={() => {
//                               const current = form.personality_tags || [];
//                               if (selected) {
//                                 setForm(p => ({ ...p, personality_tags: current.filter(t => t !== tag) }));
//                               } else if (current.length < 3) {
//                                 setForm(p => ({ ...p, personality_tags: [...current, tag] }));
//                               } else {
//                                 toast.error('Max 3 tags allowed.');
//                               }
//                             }}
//                             className={`px-3 py-1 rounded-full text-xs transition-all
//                               ${selected
//                                 ? 'bg-ink text-cream border border-ink shadow-sm'
//                                 : 'bg-white border border-gray-200 text-gray-500 hover:border-gold/40 hover:text-gold'
//                               }`}>
//                             {tag}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* ── At a Glance Editor ── */}
//                   <div className="md:col-span-2">
//                     <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
//                       At a Glance
//                       <span className="text-gray-400 ml-2 normal-case">(up to 6 stats you want shown on your card)</span>
//                     </label>
//                     <div className="space-y-2">
//                       {(form.at_a_glance || [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }]).map((item, idx) => (
//                         <div key={idx} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
//                           <span className="text-xs text-gray-400 w-4 flex-shrink-0">{idx + 1}.</span>
//                           <input
//                             value={item.label}
//                             onChange={e => {
//                               const updated = [...(form.at_a_glance || [])];
//                               updated[idx] = { ...updated[idx], label: e.target.value };
//                               setForm(p => ({ ...p, at_a_glance: updated }));
//                             }}
//                             placeholder="Label (e.g. Best Level)"
//                             className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg
//                                        px-3 py-1.5 text-xs text-ink outline-none
//                                        focus:border-gold/50 transition-colors placeholder-gray-400"
//                           />
//                           <input
//                             value={item.value}
//                             onChange={e => {
//                               const updated = [...(form.at_a_glance || [])];
//                               updated[idx] = { ...updated[idx], value: e.target.value };
//                               setForm(p => ({ ...p, at_a_glance: updated }));
//                             }}
//                             placeholder="Value (e.g. 500L)"
//                             className="w-full sm:w-28 min-w-0 bg-gray-50 border border-gray-200 rounded-lg
//                                        px-3 py-1.5 text-xs text-ink outline-none
//                                        focus:border-gold/50 transition-colors placeholder-gray-400"
//                           />
//                           <button type="button"
//                             onClick={() => {
//                               const updated = (form.at_a_glance || []).filter((_, i) => i !== idx);
//                               setForm(p => ({ ...p, at_a_glance: updated }));
//                             }}
//                             className="text-gray-400 hover:text-red-500 transition-colors text-xs px-1">
//                             ✕
//                           </button>
//                         </div>
//                       ))}
//                       {(form.at_a_glance || []).length < 6 && (
//                         <button type="button"
//                           onClick={() => setForm(p => ({
//                             ...p,
//                             at_a_glance: [...(p.at_a_glance || []), { label: '', value: '' }]
//                           }))}
//                           className="text-xs text-gold hover:text-ink transition-colors mt-1">
//                           + Add stat
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Celebrating fields */}
//                   <div className="md:col-span-2 space-y-4">
//                     <EditField
//                       label="Celebrating (your name as you want it shown)"
//                       name="celebrating_name"
//                       value={form.celebrating_name}
//                       onChange={handleChange}
//                     />
//                     <EditField
//                       label="Celebrating excellence in ___"
//                       name="celebrating_dept"
//                       value={form.celebrating_dept}
//                       onChange={handleChange}
//                     />

//                     {/* If not stats */}
//                     <EditField
//                       label="If not Stats or Math, then what?"
//                       name="if_not_stats"
//                       value={form.if_not_stats}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 /* ── VIEW MODE — FINALIST CARD ── */
//                 <div
//                   ref={cardRef}
//                   className="bg-white border border-gold/20 rounded-2xl shadow-xl overflow-hidden"
//                 >
//                   {/* Card Header */}
//                   <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-br from-gray-50 to-[#faf9f6] border-b border-gray-100">
//                     {/* Left */}
//                     <div className="flex items-center gap-2 sm:gap-2.5">
//                       <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center overflow-hidden flex-shrink-0">
//                         {profile.assoc_logo
//                           ? <img src={profile.assoc_logo} alt="Logo" className="w-full h-full object-cover" />
//                           : <NAMSSNLogo size={28} />
//                         }
//                       </div>
//                       <div>
//                         <div className="font-['Bebas_Neue'] text-[11px] sm:text-[13px] text-gold tracking-widest">FYB 2026</div>
//                         <div className="hidden sm:block text-[9px] text-gray-400 uppercase tracking-widest">{profile.department}</div>
//                       </div>
//                     </div>

//                     {/* Center */}
//                     <div className="text-center px-1">
//                       <div className="font-['Bebas_Neue'] text-[9px] sm:text-[11px] text-gray-400 tracking-[0.2em]">FINALIST OF THE DAY</div>
//                     </div>

//                     {/* Right */}
//                     <div className="flex items-center gap-2 sm:gap-2.5">
//                       <div className="text-right">
//                         <div className="font-['Bebas_Neue'] text-[11px] sm:text-[13px] text-ink tracking-widest">CLASS OF 2026</div>
//                         <div className="hidden sm:block text-[9px] text-gray-400 uppercase tracking-widest">{profile.department}</div>
//                       </div>
//                       <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center flex-shrink-0">
//                         <UniJosLogo size={30} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="flex flex-col md:flex-row">

//                     {/* Left */}
//                     <div className="md:w-60 lg:w-72 flex-shrink-0 flex flex-col gap-3.5 p-4 sm:p-5 bg-gradient-to-b from-gray-50/50 to-white border-b md:border-b-0 md:border-r border-gray-100">
//                       {/* Photo */}
//                       <div className="flex flex-col sm:flex-row md:flex-col gap-3">
//                         <div className="w-full aspect-[4/5] sm:w-36 sm:h-44 md:w-full md:aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden border-2 border-gold/20 bg-gray-50 flex items-center justify-center">
//                           {profile.profile_image
//                             ? <img src={profile.profile_image} alt={profile.name} className="w-full h-full object-cover" />
//                             : <div className="flex flex-col items-center gap-1.5">
//                                 <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-dashed border-gold/30 flex items-center justify-center">
//                                   <Icon.User />
//                                 </div>
//                                 <span className="text-[9px] text-gray-400">No Photo</span>
//                               </div>
//                           }
//                         </div>

//                         {/* Personal info */}
//                         <div className="flex-1 flex flex-col min-w-0">
//                           <InfoRow icon={<Icon.User />}     label="Name"                value={profile.name} />
//                           <InfoRow icon={<Icon.User />}     label="Nickname"            value={profile.nickname} />
//                           <InfoRow icon={<Icon.Calendar />} label="Date of Birth"       value={profile.date_of_birth} />
//                           <InfoRow icon={<Icon.Heart />}    label="Relationship"        value={profile.relationship_status} />
//                           <InfoRow icon={<Icon.Food />}     label="Favourite Food"      value={profile.favourite_food} />
//                           <InfoRow icon={<Icon.Star />}     label="Childhood Dream"     value={profile.childhood_dream} />
//                         </div>
//                       </div>

//                       {/* Academic preferences */}
//                       <div className="bg-gold/5 rounded-xl border border-gold/10 p-2.5">
//                         <div className="text-[9px] text-gold uppercase tracking-[0.15em] font-bold text-center mb-2 pb-1.5 border-b border-gold/10">
//                           Academic Preferences
//                         </div>
//                         <ProgressRow label={`Fav: ${profile.favourite_course || '—'}`} />
//                         <ProgressRow label={`Worst: ${profile.worst_course || '—'}`} />
//                         <ProgressRow label={`Lecturer: ${profile.favourite_lecturer || '—'}`} />
//                         <ProgressRow label={`Hardest: ${profile.most_difficult_topic || '—'}`} />
//                         <ProgressRow label={`Social: ${profile.social_handle || '—'}`} />
//                       </div>
//                     </div>

//                     {/* Right */}
//                     <div className="flex-1 min-w-0 flex flex-col gap-4 p-4 sm:p-5">

//                       {/* Title */}
//                       <div className="border-b border-gray-100 pb-3">
//                         <div className="flex items-baseline gap-2.5 flex-wrap">
//                           <span className="font-['Bebas_Neue'] text-[clamp(24px,4vw,42px)] text-ink tracking-[0.04em] leading-none">FINALIST</span>
//                           <span className="font-['Bebas_Neue'] text-[clamp(24px,4vw,42px)] text-gold tracking-[0.04em] leading-none">OF THE DAY</span>
//                         </div>
//                         <div className="text-[11px] text-gray-500 mt-1">
//                           Celebrating{' '}
//                           <span className="text-ink font-medium">{profile.celebrating_name || profile.name}</span>
//                           {' '}and excellence in{' '}
//                           <span className="text-gold">
//                             {profile.celebrating_dept || profile.department?.toLowerCase() || 'statistics'}
//                           </span>.
//                         </div>
//                       </div>

//                       {/* Stats */}
//                       <div>
//                         <div className="text-[9px] text-gold uppercase tracking-[0.2em] font-bold mb-2">At a Glance</div>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                           {(profile.at_a_glance && profile.at_a_glance.length > 0
//                             ? profile.at_a_glance
//                             : [
//                                 { label: 'Favourite Courses', value: profile.num_favourite_courses || '—' },
//                                 { label: 'Most Difficult Level', value: '500L' },
//                                 { label: 'Stats Experience', value: profile.experience ? '✓' : '—' },
//                                 { label: 'Memorable Day', value: profile.most_memorable_day ? '✓' : '—' },
//                                 { label: 'Parting Words', value: profile.parting_words ? '✓' : '—' },
//                                 { label: 'If not Stats?', value: profile.if_not_stats ? '→' : '?' },
//                               ]
//                           ).map((item, idx) => {
//                             const icons = [<Icon.Book />, <Icon.Trophy />, <Icon.Chart />, <Icon.Trophy />, <Icon.Quote />, <Icon.Star />];
//                             return (
//                               <StatCard key={idx} icon={icons[idx % icons.length]}
//                                         value={item.value || '—'} label={item.label || '—'} />
//                             );
//                           })}
//                         </div>
//                       </div>

//                       {/* Info blocks */}
//                       <div className="flex flex-col gap-2">
//                         <InfoBlock icon={<Icon.Chart />}  title="Statistics Experience">
//                           {profile.experience || '—'}
//                         </InfoBlock>
//                         <InfoBlock icon={<Icon.Trophy />} title="Most Memorable Day">
//                           {profile.most_memorable_day || '—'}
//                         </InfoBlock>
//                         <InfoBlock icon={<Icon.Quote />}  title="Parting Words">
//                           <em className="text-ink">"{profile.parting_words || '—'}"</em>
//                         </InfoBlock>
//                       </div>

//                       {/* Footer — Social Media Links */}
//                       <div className="mt-auto border-t border-gray-100 pt-2.5 flex items-center gap-2 flex-wrap">
//                         {!hasSocialLinks && (
//                           <span className="text-[9px] text-gray-400 tracking-[0.15em] uppercase">
//                             No social links added
//                           </span>
//                         )}
//                         {profile.link_x && (
//                           <a href={profile.link_x.startsWith('http') ? profile.link_x : `https://${profile.link_x}`}
//                              target="_blank" rel="noopener noreferrer" title="X / Twitter"
//                              className="text-gray-400 hover:text-ink flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
//                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//                               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//                             </svg>
//                           </a>
//                         )}
//                         {profile.link_whatsapp && (
//                           <a href={profile.link_whatsapp.startsWith('http') ? profile.link_whatsapp : `https://wa.me/${profile.link_whatsapp.replace(/[^0-9]/g,'')}`}
//                              target="_blank" rel="noopener noreferrer" title="WhatsApp"
//                              className="text-gray-400 hover:text-green-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-green-50 transition-colors">
//                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//                               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                             </svg>
//                           </a>
//                         )}
//                         {profile.link_facebook && (
//                           <a href={profile.link_facebook.startsWith('http') ? profile.link_facebook : `https://${profile.link_facebook}`}
//                              target="_blank" rel="noopener noreferrer" title="Facebook"
//                              className="text-gray-400 hover:text-blue-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-blue-50 transition-colors">
//                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//                               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                             </svg>
//                           </a>
//                         )}
//                         {profile.link_instagram && (
//                           <a href={profile.link_instagram.startsWith('http') ? profile.link_instagram : `https://${profile.link_instagram}`}
//                              target="_blank" rel="noopener noreferrer" title="Instagram"
//                              className="text-gray-400 hover:text-pink-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-pink-50 transition-colors">
//                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//                               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                             </svg>
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* ── MEMORIES TAB ── */}
//           {activeTab === 'memories' && (
//             <motion.div key="memories" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -16 }} className="max-w-4xl mx-auto px-4 py-8">

//               {isOwner && (
//                 <form onSubmit={handleAddMemory}
//                   className="mb-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
//                   <p className="text-xs text-gold uppercase tracking-widest font-bold">Add a Memory</p>
//                   <ImageUploader
//                     type="memory" uploading={uploadingMemory} setUploading={setUploadingMemory}
//                     onUpload={url => setMemoryForm(prev => ({ ...prev, image_url: url }))}
//                   />
//                   {memoryForm.image_url && <p className="text-xs text-green-600">✓ Image ready</p>}
//                   <input type="text" value={memoryForm.caption}
//                     onChange={e => setMemoryForm(prev => ({ ...prev, caption: e.target.value }))}
//                     placeholder="Caption (optional)"
//                     className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
//                                text-sm text-ink outline-none focus:border-gold/50 transition-colors placeholder-gray-400" />
//                   <button type="submit" disabled={addingMemory || !memoryForm.image_url}
//                     className="px-5 py-2 bg-ink text-cream text-sm rounded-xl
//                                hover:bg-ink/90 transition-all disabled:opacity-40 shadow-md">
//                     {addingMemory ? 'Uploading…' : '+ Add Memory'}
//                   </button>
//                 </form>
//               )}

//               {memories.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
//                     <Icon.Photo />
//                   </div>
//                   <h3 className="text-ink font-medium text-lg">No memories yet</h3>
//                   <p className="text-gray-400 text-sm mt-1">Share photos from your finalist year.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {memories.map(memory => (
//                     <div key={memory.id}
//                       className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
//                       <img src={memory.image_url} alt={memory.caption}
//                         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
//                                       transition-all duration-300 flex flex-col justify-end p-3">
//                         <p className="text-white text-xs opacity-0 group-hover:opacity-100
//                                       transition-opacity duration-300 line-clamp-2">
//                           {memory.caption}
//                         </p>
//                       </div>
//                       <div className="absolute top-2 right-2 flex gap-2">
//                         <button onClick={() => handleToggleLike(memory.id)}
//                           className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full
//                                      text-xs shadow hover:scale-105 transition-transform">
//                           <span>{likedMap[memory.id] ? '❤️' : '🤍'}</span>
//                           <span className="text-ink">{memory.like_count}</span>
//                         </button>
//                         {(isOwner || isAdmin) && (
//                           <button onClick={() => handleDeleteMemory(memory.id)}
//                             className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs
//                                        shadow hover:bg-red-50 transition-colors">🗑</button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* ── MESSAGES TAB ── */}
//           {activeTab === 'messages' && (
//             <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -16 }} className="max-w-3xl mx-auto px-4 py-8">

//               <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
//                 <input type="text" value={commentText}
//                   onChange={e => setCommentText(e.target.value)}
//                   placeholder="Write something kind…"
//                   className="flex-1 min-w-0 px-4 py-3 bg-white border border-gray-200 rounded-xl
//                              text-sm text-ink outline-none focus:border-gold/50
//                              transition-colors placeholder-gray-400" />
//                 <button type="submit" disabled={submittingComment || !commentText.trim()}
//                   className="px-5 py-3 bg-ink text-cream text-sm rounded-xl
//                              hover:bg-ink/90 transition-all disabled:opacity-40 flex-shrink-0 shadow-md">
//                   {submittingComment ? '…' : 'Post'}
//                 </button>
//               </form>

//               {comments.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
//                     <Icon.Chat />
//                   </div>
//                   <h3 className="text-ink font-medium text-lg">No messages yet</h3>
//                   <p className="text-gray-400 text-sm mt-1">Be the first to leave a message!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {comments.map(comment => (
//                     <div key={comment.id}
//                       className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
//                       <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0
//                                       flex items-center justify-center overflow-hidden">
//                         {comment.commenter_image
//                           ? <img src={comment.commenter_image} alt="" className="w-full h-full object-cover" />
//                           : <span className="text-gold text-sm font-bold">
//                               {comment.commenter_name?.charAt(0)}
//                             </span>
//                         }
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between gap-2">
//                           <p className="text-sm font-medium text-ink truncate">{comment.commenter_name}</p>
//                           <div className="flex items-center gap-3 flex-shrink-0">
//                             <p className="text-xs text-gray-400">
//                               {new Date(comment.created_at).toLocaleDateString()}
//                             </p>
//                             {(isOwner || isAdmin || currentUser?.id === comment.user_id) && (
//                               <button onClick={() => handleDeleteComment(comment.id)}
//                                 className="text-xs text-gray-400 hover:text-red-500 transition-colors">✕</button>
//                             )}
//                           </div>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-0.5 leading-relaxed break-words">{comment.comment}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </PageWrapper>
//   );
// };

// export default Profile;

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getUserById, updateFullProfile,
  addMemory, deleteMemory,
  addComment, deleteComment,
  toggleLike, checkLike,
  uploadProfileImage, uploadMemoryImage,
} from '../services/api';
import PageWrapper from '../components/PageWrapper';
import ImageUploader from '../components/ImageUploader';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { NAMSSNLogo, UniJosLogo } from '../components/Logos';

const PERSONALITY_TAGS = [
  'The Quiet Storm', 'Class Clown', 'The Overthinker', 'Always Late',
  'First to Leave', 'Group Chat Admin', 'Never Studies', 'Always Studying',
  'The Motivator', 'Certified Foodie', 'Night Owl', 'Early Bird',
  'The Networker', 'Introverted Extrovert', 'The Fixer', 'Drama Free',
  'Main Character', 'Side Character', 'The Planner', 'Goes with the Flow',
  'Gym Rat', 'Professional Napper', 'The Philosopher', 'Trend Setter',
  'Old Soul', 'Free Spirit', 'The Realist', 'Hopeless Romantic',
  'The Optimist', 'The Pessimist', 'The Empath', 'The Strategist',
  'Born Leader', 'Team Player', 'The Negotiator', 'The Peacemaker',
  'Risk Taker', 'Plays it Safe', 'The Creative', 'The Analyst',
  'Jack of All Trades', 'Master of One', 'The Storyteller', 'The Listener',
  'The Connector', 'The Disruptor', 'The Loyalist', 'The Visionary',
  'The Grinder', 'The Legend',
];

// ── Inline SVG Icons ─────────────────────────────────────────────
const Icon = {
  User:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>,
  Heart:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Food:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-4.5-6.72-5-8.99-5C4.14 9.99 1 10.5 1 14.99v1h15.03v-1z"/></svg>,
  Star:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
  Book:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/></svg>,
  Chart:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>,
  Trophy:   () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
  Quote:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
  Edit:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
  Save:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>,
  Close:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  Card:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 8h16v2H4z"/></svg>,
  Photo:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  Chat:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>,
};

// ── Stat Card ────────────────────────────────────────────────────
const StatCard = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1 p-3 rounded-xl
                  border border-gray-100 bg-white shadow-sm
                  hover:border-gold/30 hover:-translate-y-1
                  transition-all duration-300">
    <span className="text-gold">{icon}</span>
    <span style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          className="text-3xl text-ink leading-none">{value || '—'}</span>
    <span className="text-xs text-gray-400 uppercase tracking-wider text-center leading-tight">
      {label}
    </span>
  </div>
);

// ── Info Row ─────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-2 border-b border-gray-100">
    <span className="bg-gold/10 rounded-md p-1.5 text-gold flex-shrink-0 mt-0.5">
      {icon}
    </span>
    <div className="min-w-0">
      <div className="text-xs text-gray-400 uppercase tracking-widest">{label}</div>
      <div className="text-xs text-ink font-medium mt-0.5 break-words">{value || '—'}</div>
    </div>
  </div>
);

// ── Info Block ───────────────────────────────────────────────────
const InfoBlock = ({ icon, title, children }) => (
  <div className="flex gap-3 items-start p-3 rounded-xl
                  bg-gray-50/50 border border-gray-100">
    <span className="bg-gold/10 rounded-lg p-2 text-gold flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <div className="text-xs text-gold uppercase tracking-wider font-bold mb-1">{title}</div>
      <div className="text-sm text-gray-600 leading-relaxed break-words">{children}</div>
    </div>
  </div>
);

// ── Progress Row ─────────────────────────────────────────────────
const ProgressRow = ({ label }) => (
  <div className="mb-2.5">
    <div className="flex justify-between mb-1">
      <span className="text-xs text-gray-500 uppercase tracking-wide truncate max-w-[80%]">{label}</span>
      <span className="text-xs text-gold">100%</span>
    </div>
    <div className="h-0.5 bg-gray-100 rounded-full">
      <div className="h-full w-full bg-gradient-to-r from-gold/40 to-gold rounded-full" />
    </div>
  </div>
);

// ── Edit Field ───────────────────────────────────────────────────
const EditField = ({ label, name, value, onChange, type = 'text', rows }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400 uppercase tracking-widest">{label}</label>
    {rows ? (
      <textarea
        name={name} value={value || ''} onChange={onChange} rows={rows}
        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2
                   text-sm text-ink outline-none resize-none
                   focus:border-gold/50 transition-colors"
      />
    ) : (
      <input
        type={type} name={name} value={value || ''} onChange={onChange}
        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2
                   text-sm text-ink outline-none
                   focus:border-gold/50 transition-colors"
      />
    )}
  </div>
);

// ── Main Profile Component ────────────────────────────────────────
const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const isOwner = currentUser?.id === id;
  const isAdmin = currentUser?.role === 'admin';
  const cardRef = useRef();

  const [profile, setProfile] = useState(null);
  const [memories, setMemories] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [likedMap, setLikedMap] = useState({});
  const [commentText, setCommentText] = useState('');
  const [memoryForm, setMemoryForm] = useState({ image_url: '', caption: '' });
  const [uploadingMemory, setUploadingMemory] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [addingMemory, setAddingMemory] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'memories' | 'messages'

  // Load Bebas Neue font
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => { fetchProfile(); }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserById(id);
      setProfile(res.data.user);
      setMemories(res.data.memories);
      setComments(res.data.comments);
      setForm(res.data.user);

      const likeChecks = await Promise.all(
        res.data.memories.map(m =>
          checkLike(m.id).then(r => ({ id: m.id, liked: r.data.liked }))
        )
      );
      const map = {};
      likeChecks.forEach(({ id, liked }) => { map[id] = liked; });
      setLikedMap(map);
    } catch {
      toast.error('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateFullProfile(id, form);
      setProfile(res.data.user);
      setEditing(false);
      toast.success('Profile saved!');
    } catch {
      toast.error('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleLike = async memId => {
    try {
      const res = await toggleLike({ memory_id: memId });
      setLikedMap(prev => ({ ...prev, [memId]: res.data.liked }));
      setMemories(prev =>
        prev.map(m => m.id === memId ? { ...m, like_count: res.data.like_count } : m)
      );
    } catch { toast.error('Failed to update like.'); }
  };

  const handleAddMemory = async e => {
    e.preventDefault();
    if (!memoryForm.image_url) return toast.error('Upload an image first.');
    setAddingMemory(true);
    try {
      const res = await addMemory(memoryForm);
      setMemories(prev => [res.data.memory, ...prev]);
      setMemoryForm({ image_url: '', caption: '' });
      toast.success('Memory added!');
    } catch { toast.error('Failed to add memory.'); }
    finally { setAddingMemory(false); }
  };

  const handleDeleteMemory = async memId => {
    if (!window.confirm('Delete this memory?')) return;
    try {
      await deleteMemory(memId);
      setMemories(prev => prev.filter(m => m.id !== memId));
      toast.success('Memory deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const handleAddComment = async e => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await addComment({ profile_id: id, comment: commentText });
      setComments(prev => [res.data.comment, ...prev]);
      setCommentText('');
      toast.success('Comment added!');
    } catch { toast.error('Failed to comment.'); }
    finally { setSubmittingComment(false); }
  };

  const handleDeleteComment = async cId => {
    try {
      await deleteComment(cId);
      setComments(prev => prev.filter(c => c.id !== cId));
      toast.success('Comment deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, backgroundColor: '#faf9f6', useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `${profile.name?.replace(/ /g, '_')}_FYB.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Profile downloaded!');
    } catch {
      toast.error('Download failed. Make sure html2canvas is installed.');
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <div className="text-gold text-2xl animate-pulse"
               style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4 }}>
            Loading Profile...
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!profile) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <p className="text-gray-400">Profile not found.</p>
        </div>
      </PageWrapper>
    );
  }

  const hasSocialLinks = profile.link_x || profile.link_whatsapp || profile.link_facebook || profile.link_instagram;

  const tabs = [
    { id: 'card', label: 'Card', icon: <Icon.Card /> },
    { id: 'memories', label: 'Memories', icon: <Icon.Photo /> },
    { id: 'messages', label: 'Messages', icon: <Icon.Chat /> },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ── Page Header ── */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4
                        flex flex-col sm:flex-row sm:items-start md:items-center
                        justify-between gap-3 sticky top-16 z-40">
          <div className="min-w-0">
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-2xl text-ink tracking-widest">
              {isOwner ? 'MY PROFILE' : profile.name?.toUpperCase()}
            </h1>
            <div className="mt-1.5">
              {profile.profile_complete ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-green-500/10 text-green-600 border border-green-500/20">
                  Completed
                </span>
              ) : (
                isOwner && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                    Uncompleted
                  </span>
                )
              )}
            </div>
          </div>
          {(profile.personality_tags || []).length > 0 && (
            <div className="flex gap-2 flex-wrap justify-start sm:justify-center">
              {profile.personality_tags.map(tag => (
                <span key={tag}
                  className="bg-gold/10 border border-gold/20 text-gold text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* Tab switcher — icon-only on mobile */}
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all flex items-center gap-1.5
                    ${activeTab === t.id
                      ? 'bg-ink text-cream shadow-md'
                      : 'text-gray-400 hover:text-ink hover:bg-gray-50'
                    }`}>
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Edit / Save — icon-only on mobile */}
            {(isOwner || isAdmin) && activeTab === 'card' && (
              editing ? (
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setEditing(false)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-500 rounded-xl
                               text-sm hover:border-gray-300 transition-all">
                    <span className="sm:hidden"><Icon.Close /></span>
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-3 py-2 bg-ink
                               text-cream rounded-xl text-sm hover:bg-ink/90
                               transition-all disabled:opacity-50 shadow-md">
                    <Icon.Save />
                    <span className="hidden sm:inline">{saving ? 'Saving…' : 'Save Profile'}</span>
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 border border-gold/40
                             text-gold rounded-xl text-sm hover:bg-gold/5 transition-all">
                  <Icon.Edit />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
              )
            )}

            {/* Download — icon-only on mobile */}
            {activeTab === 'card' && (
              <button onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 bg-ink text-cream
                           rounded-xl text-sm hover:bg-ink/90 transition-all
                           shadow-lg shadow-ink/10">
                <Icon.Download />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}
          </div>
        </div>

        {/* ── CARD TAB ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="max-w-5xl mx-auto px-4 py-8"
            >
              {editing ? (
                /* ── EDIT MODE ── */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Left column */}
                  <div className="space-y-4 bg-white border border-gray-100
                                  rounded-2xl p-6 shadow-sm">
                    <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">
                      Personal Info
                    </h3>

                    {/* Profile photo */}
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                        Profile Photo
                      </label>
                      <ImageUploader
                        type="profile"
                        uploading={uploadingProfile}
                        setUploading={setUploadingProfile}
                        onUpload={url => setForm(prev => ({ ...prev, profile_image: url }))}
                      />
                    </div>

                    <EditField label="Full Name"       name="name"                value={form.name}                onChange={handleChange} />
                    <EditField label="Nickname"        name="nickname"            value={form.nickname}            onChange={handleChange} />
                    <EditField label="Department"      name="department"          value={form.department}          onChange={handleChange} />
                    <EditField label="Date of Birth"   name="date_of_birth"       value={form.date_of_birth}       onChange={handleChange} />
                    <EditField label="Relationship Status" name="relationship_status" value={form.relationship_status} onChange={handleChange} />
                    <EditField label="Favourite Food"  name="favourite_food"      value={form.favourite_food}      onChange={handleChange} />
                    <EditField label="Childhood Dream" name="childhood_dream"     value={form.childhood_dream}     onChange={handleChange} />
                    <EditField label="X (Twitter) Profile URL"    name="link_x"         value={form.link_x}         onChange={handleChange} />
                    <EditField label="WhatsApp Number or Link"     name="link_whatsapp"  value={form.link_whatsapp}  onChange={handleChange} />
                    <EditField label="Facebook Profile URL"        name="link_facebook"  value={form.link_facebook}  onChange={handleChange} />
                    <EditField label="Instagram Profile URL"       name="link_instagram" value={form.link_instagram} onChange={handleChange} />
                  </div>

                  {/* Right column */}
                  <div className="space-y-4 bg-white border border-gray-100
                                  rounded-2xl p-6 shadow-sm">
                    <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">
                      Academic & Finalist Info
                    </h3>
                    <EditField label="Bio (short tagline)" name="bio"             value={form.bio}                onChange={handleChange} />
                    <EditField label="Favourite Course"    name="favourite_course" value={form.favourite_course}  onChange={handleChange} />
                    <EditField label="Worst Course"        name="worst_course"     value={form.worst_course}      onChange={handleChange} />
                    <EditField label="Favourite Lecturer"  name="favourite_lecturer" value={form.favourite_lecturer} onChange={handleChange} />
                    <EditField label="Most Difficult Topic" name="most_difficult_topic" value={form.most_difficult_topic} onChange={handleChange} />
                    <EditField label="No. of Favourite Courses" name="num_favourite_courses" type="number"
                               value={form.num_favourite_courses} onChange={handleChange} />
                    <EditField label="Statistics Experience" name="experience"    value={form.experience}         onChange={handleChange} rows={3} />
                    <EditField label="Most Memorable Day"   name="most_memorable_day" value={form.most_memorable_day} onChange={handleChange} rows={2} />
                    <EditField label="Parting Words"        name="parting_words"  value={form.parting_words}      onChange={handleChange} rows={3} />
                  </div>

                  {/* Personality Tags */}
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                      Personality Tags
                      <span className="text-gray-400 ml-2 normal-case">
                        ({(form.personality_tags || []).length}/3 selected)
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-gray-100">
                      {PERSONALITY_TAGS.map(tag => {
                        const selected = (form.personality_tags || []).includes(tag);
                        return (
                          <button key={tag} type="button"
                            onClick={() => {
                              const current = form.personality_tags || [];
                              if (selected) {
                                setForm(p => ({ ...p, personality_tags: current.filter(t => t !== tag) }));
                              } else if (current.length < 3) {
                                setForm(p => ({ ...p, personality_tags: [...current, tag] }));
                              } else {
                                toast.error('Max 3 tags allowed.');
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-all
                              ${selected
                                ? 'bg-ink text-cream border border-ink shadow-sm'
                                : 'bg-white border border-gray-200 text-gray-500 hover:border-gold/40 hover:text-gold'
                              }`}>
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── At a Glance Editor ── */}
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                      At a Glance
                      <span className="text-gray-400 ml-2 normal-case">(up to 6 stats you want shown on your card)</span>
                    </label>
                    <div className="space-y-2">
                      {(form.at_a_glance || [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }]).map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                          <span className="text-xs text-gray-400 w-4 flex-shrink-0">{idx + 1}.</span>
                          <input
                            value={item.label}
                            onChange={e => {
                              const updated = [...(form.at_a_glance || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setForm(p => ({ ...p, at_a_glance: updated }));
                            }}
                            placeholder="Label (e.g. Best Level)"
                            className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg
                                       px-3 py-1.5 text-xs text-ink outline-none
                                       focus:border-gold/50 transition-colors placeholder-gray-400"
                          />
                          <input
                            value={item.value}
                            onChange={e => {
                              const updated = [...(form.at_a_glance || [])];
                              updated[idx] = { ...updated[idx], value: e.target.value };
                              setForm(p => ({ ...p, at_a_glance: updated }));
                            }}
                            placeholder="Value (e.g. 500L)"
                            className="w-full sm:w-28 min-w-0 bg-gray-50 border border-gray-200 rounded-lg
                                       px-3 py-1.5 text-xs text-ink outline-none
                                       focus:border-gold/50 transition-colors placeholder-gray-400"
                          />
                          <button type="button"
                            onClick={() => {
                              const updated = (form.at_a_glance || []).filter((_, i) => i !== idx);
                              setForm(p => ({ ...p, at_a_glance: updated }));
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors text-xs px-1">
                            ✕
                          </button>
                        </div>
                      ))}
                      {(form.at_a_glance || []).length < 6 && (
                        <button type="button"
                          onClick={() => setForm(p => ({
                            ...p,
                            at_a_glance: [...(p.at_a_glance || []), { label: '', value: '' }]
                          }))}
                          className="text-xs text-gold hover:text-ink transition-colors mt-1">
                          + Add stat
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Celebrating fields */}
                  <div className="md:col-span-2 space-y-4">
                    <EditField
                      label="Celebrating (your name as you want it shown)"
                      name="celebrating_name"
                      value={form.celebrating_name}
                      onChange={handleChange}
                    />
                    <EditField
                      label="Celebrating excellence in ___"
                      name="celebrating_dept"
                      value={form.celebrating_dept}
                      onChange={handleChange}
                    />

                    {/* If not stats */}
                    <EditField
                      label="If not Stats or Math, then what?"
                      name="if_not_stats"
                      value={form.if_not_stats}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                /* ── VIEW MODE — FINALIST CARD ── */
                <div
                  ref={cardRef}
                  className="bg-white border border-gold/20 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-br from-gray-50 to-[#faf9f6] border-b border-gray-100">
                    {/* Left */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {profile.assoc_logo
                          ? <img src={profile.assoc_logo} alt="Logo" className="w-full h-full object-cover" />
                          : <NAMSSNLogo size={28} />
                        }
                      </div>
                      <div>
                        <div className="font-['Bebas_Neue'] text-[11px] sm:text-[13px] text-gold tracking-widest">FYB 2026</div>
                        <div className="hidden sm:block text-[9px] text-gray-400 uppercase tracking-widest">{profile.department}</div>
                      </div>
                    </div>

                    {/* Center */}
                    <div className="text-center px-1">
                      <div className="font-['Bebas_Neue'] text-[9px] sm:text-[11px] text-gray-400 tracking-[0.2em]">FINALIST OF THE DAY</div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="text-right">
                        <div className="font-['Bebas_Neue'] text-[11px] sm:text-[13px] text-ink tracking-widest">CLASS OF 2026</div>
                        <div className="hidden sm:block text-[9px] text-gray-400 uppercase tracking-widest">{profile.department}</div>
                      </div>
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <UniJosLogo size={30} />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col md:flex-row">

                    {/* Left */}
                    <div className="md:w-60 lg:w-72 flex-shrink-0 flex flex-col gap-3.5 p-4 sm:p-5 bg-gradient-to-b from-gray-50/50 to-white border-b md:border-b-0 md:border-r border-gray-100">
                      {/* Photo */}
                      <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                        <div className="w-full aspect-[3/4] sm:w-40 sm:h-52 md:w-full md:aspect-[3/4] flex-shrink-0 rounded-xl overflow-hidden border-2 border-gold/20 bg-gray-50 flex items-center justify-center">
                          {profile.profile_image
                            ? <img src={profile.profile_image} alt={profile.name} className="w-full h-full object-cover" />
                            : <div className="flex flex-col items-center gap-1.5">
                                <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-dashed border-gold/30 flex items-center justify-center">
                                  <Icon.User />
                                </div>
                                <span className="text-[9px] text-gray-400">No Photo</span>
                              </div>
                          }
                        </div>

                        {/* Personal info */}
                        <div className="flex-1 flex flex-col min-w-0">
                          <InfoRow icon={<Icon.User />}     label="Name"                value={profile.name} />
                          <InfoRow icon={<Icon.User />}     label="Nickname"            value={profile.nickname} />
                          <InfoRow icon={<Icon.Calendar />} label="Date of Birth"       value={profile.date_of_birth} />
                          <InfoRow icon={<Icon.Heart />}    label="Relationship"        value={profile.relationship_status} />
                          <InfoRow icon={<Icon.Food />}     label="Favourite Food"      value={profile.favourite_food} />
                          <InfoRow icon={<Icon.Star />}     label="Childhood Dream"     value={profile.childhood_dream} />
                        </div>
                      </div>

                      {/* Academic preferences */}
                      <div className="bg-gold/5 rounded-xl border border-gold/10 p-2.5">
                        <div className="text-[9px] text-gold uppercase tracking-[0.15em] font-bold text-center mb-2 pb-1.5 border-b border-gold/10">
                          Academic Preferences
                        </div>
                        <ProgressRow label={`Fav: ${profile.favourite_course || '—'}`} />
                        <ProgressRow label={`Worst: ${profile.worst_course || '—'}`} />
                        <ProgressRow label={`Lecturer: ${profile.favourite_lecturer || '—'}`} />
                        <ProgressRow label={`Hardest: ${profile.most_difficult_topic || '—'}`} />
                        <ProgressRow label={`Social: ${profile.social_handle || '—'}`} />
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex-1 min-w-0 flex flex-col gap-4 p-4 sm:p-5">

                      {/* Title */}
                      <div className="border-b border-gray-100 pb-3">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <span className="font-['Bebas_Neue'] text-[clamp(24px,4vw,42px)] text-ink tracking-[0.04em] leading-none">FINALIST</span>
                          <span className="font-['Bebas_Neue'] text-[clamp(24px,4vw,42px)] text-gold tracking-[0.04em] leading-none">OF THE DAY</span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-1">
                          Celebrating{' '}
                          <span className="text-ink font-medium">{profile.celebrating_name || profile.name}</span>
                          {' '}and excellence in{' '}
                          <span className="text-gold">
                            {profile.celebrating_dept || profile.department?.toLowerCase() || 'statistics'}
                          </span>.
                        </div>
                      </div>

                      {/* Stats */}
                      <div>
                        <div className="text-[9px] text-gold uppercase tracking-[0.2em] font-bold mb-2">At a Glance</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {(profile.at_a_glance && profile.at_a_glance.length > 0
                            ? profile.at_a_glance
                            : [
                                { label: 'Favourite Courses', value: profile.num_favourite_courses || '—' },
                                { label: 'Most Difficult Level', value: '500L' },
                                { label: 'Stats Experience', value: profile.experience ? '✓' : '—' },
                                { label: 'Memorable Day', value: profile.most_memorable_day ? '✓' : '—' },
                                { label: 'Parting Words', value: profile.parting_words ? '✓' : '—' },
                                { label: 'If not Stats?', value: profile.if_not_stats ? '→' : '?' },
                              ]
                          ).map((item, idx) => {
                            const icons = [<Icon.Book />, <Icon.Trophy />, <Icon.Chart />, <Icon.Trophy />, <Icon.Quote />, <Icon.Star />];
                            return (
                              <StatCard key={idx} icon={icons[idx % icons.length]}
                                        value={item.value || '—'} label={item.label || '—'} />
                            );
                          })}
                        </div>
                      </div>

                      {/* Info blocks */}
                      <div className="flex flex-col gap-2">
                        <InfoBlock icon={<Icon.Chart />}  title="Statistics Experience">
                          {profile.experience || '—'}
                        </InfoBlock>
                        <InfoBlock icon={<Icon.Trophy />} title="Most Memorable Day">
                          {profile.most_memorable_day || '—'}
                        </InfoBlock>
                        <InfoBlock icon={<Icon.Quote />}  title="Parting Words">
                          <em className="text-ink">"{profile.parting_words || '—'}"</em>
                        </InfoBlock>

                        {/* Delta Domain Signature */}
                        <div className="mt-2 flex flex-col items-center gap-2 py-3 border-t border-gray-100">
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
                        </div>
                      </div>

                      {/* Footer — Social Media Links */}
                      <div className="mt-auto border-t border-gray-100 pt-2.5 flex items-center gap-2 flex-wrap">
                        {!hasSocialLinks && (
                          <span className="text-[9px] text-gray-400 tracking-[0.15em] uppercase">
                            No social links added
                          </span>
                        )}
                        {profile.link_x && (
                          <a href={profile.link_x.startsWith('http') ? profile.link_x : `https://${profile.link_x}`}
                             target="_blank" rel="noopener noreferrer" title="X / Twitter"
                             className="text-gray-400 hover:text-ink flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                        {profile.link_whatsapp && (
                          <a href={profile.link_whatsapp.startsWith('http') ? profile.link_whatsapp : `https://wa.me/${profile.link_whatsapp.replace(/[^0-9]/g,'')}`}
                             target="_blank" rel="noopener noreferrer" title="WhatsApp"
                             className="text-gray-400 hover:text-green-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-green-50 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          </a>
                        )}
                        {profile.link_facebook && (
                          <a href={profile.link_facebook.startsWith('http') ? profile.link_facebook : `https://${profile.link_facebook}`}
                             target="_blank" rel="noopener noreferrer" title="Facebook"
                             className="text-gray-400 hover:text-blue-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-blue-50 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                        {profile.link_instagram && (
                          <a href={profile.link_instagram.startsWith('http') ? profile.link_instagram : `https://${profile.link_instagram}`}
                             target="_blank" rel="noopener noreferrer" title="Instagram"
                             className="text-gray-400 hover:text-pink-600 flex items-center p-1.5 rounded-md bg-gray-50 border border-gray-100 hover:bg-pink-50 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── MEMORIES TAB ── */}
          {activeTab === 'memories' && (
            <motion.div key="memories" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} className="max-w-4xl mx-auto px-4 py-8">

              {isOwner && (
                <form onSubmit={handleAddMemory}
                  className="mb-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <p className="text-xs text-gold uppercase tracking-widest font-bold">Add a Memory</p>
                  <ImageUploader
                    type="memory" uploading={uploadingMemory} setUploading={setUploadingMemory}
                    onUpload={url => setMemoryForm(prev => ({ ...prev, image_url: url }))}
                  />
                  {memoryForm.image_url && <p className="text-xs text-green-600">✓ Image ready</p>}
                  <input type="text" value={memoryForm.caption}
                    onChange={e => setMemoryForm(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Caption (optional)"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm text-ink outline-none focus:border-gold/50 transition-colors placeholder-gray-400" />
                  <button type="submit" disabled={addingMemory || !memoryForm.image_url}
                    className="px-5 py-2 bg-ink text-cream text-sm rounded-xl
                               hover:bg-ink/90 transition-all disabled:opacity-40 shadow-md">
                    {addingMemory ? 'Uploading…' : '+ Add Memory'}
                  </button>
                </form>
              )}

              {memories.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Icon.Photo />
                  </div>
                  <h3 className="text-ink font-medium text-lg">No memories yet</h3>
                  <p className="text-gray-400 text-sm mt-1">Share photos from your finalist year.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {memories.map(memory => (
                    <div key={memory.id}
                      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                      <img src={memory.image_url} alt={memory.caption}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                                      transition-all duration-300 flex flex-col justify-end p-3">
                        <p className="text-white text-xs opacity-0 group-hover:opacity-100
                                      transition-opacity duration-300 line-clamp-2">
                          {memory.caption}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button onClick={() => handleToggleLike(memory.id)}
                          className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full
                                     text-xs shadow hover:scale-105 transition-transform">
                          <span>{likedMap[memory.id] ? '❤️' : '🤍'}</span>
                          <span className="text-ink">{memory.like_count}</span>
                        </button>
                        {(isOwner || isAdmin) && (
                          <button onClick={() => handleDeleteMemory(memory.id)}
                            className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs
                                       shadow hover:bg-red-50 transition-colors">🗑</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} className="max-w-3xl mx-auto px-4 py-8">

              <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
                <input type="text" value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Write something kind…"
                  className="flex-1 min-w-0 px-4 py-3 bg-white border border-gray-200 rounded-xl
                             text-sm text-ink outline-none focus:border-gold/50
                             transition-colors placeholder-gray-400" />
                <button type="submit" disabled={submittingComment || !commentText.trim()}
                  className="px-5 py-3 bg-ink text-cream text-sm rounded-xl
                             hover:bg-ink/90 transition-all disabled:opacity-40 flex-shrink-0 shadow-md">
                  {submittingComment ? '…' : 'Post'}
                </button>
              </form>

              {comments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Icon.Chat />
                  </div>
                  <h3 className="text-ink font-medium text-lg">No messages yet</h3>
                  <p className="text-gray-400 text-sm mt-1">Be the first to leave a message!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map(comment => (
                    <div key={comment.id}
                      className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0
                                      flex items-center justify-center overflow-hidden">
                        {comment.commenter_image
                          ? <img src={comment.commenter_image} alt="" className="w-full h-full object-cover" />
                          : <span className="text-gold text-sm font-bold">
                              {comment.commenter_name?.charAt(0)}
                            </span>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-ink truncate">{comment.commenter_name}</p>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <p className="text-xs text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </p>
                            {(isOwner || isAdmin || currentUser?.id === comment.user_id) && (
                              <button onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors">✕</button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed break-words">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default Profile;