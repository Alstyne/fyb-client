// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { getWall, upsertWallEntry, deleteWallEntry } from '../services/api';
// import PageWrapper from '../components/PageWrapper';
// import toast from 'react-hot-toast';

// // 20 signature-style Google Fonts
// const WALL_FONTS = [
//   'Caveat', 'Pacifico', 'Dancing Script', 'Satisfy', 'Kaushan Script',
//   'Permanent Marker', 'Indie Flower', 'Amatic SC', 'Sacramento',
//   'Great Vibes', 'Lobster', 'Courgette', 'Cookie', 'Yellowtail',
//   'Architects Daughter', 'Rock Salt', 'Special Elite', 'Shadows Into Light',
//   'Homemade Apple', 'Reenie Beanie',
// ];

// const WALL_COLORS = [
//   '#C9A84C', '#dc2626', '#60a5fa', '#34d399',
//   '#f472b6', '#fb923c', '#a78bfa', '#ffffff',
//   '#facc15', '#4ade80',
// ];

// // Seeded random so positions stay consistent per entry
// const seededRandom = (seed) => {
//   const x = Math.sin(seed) * 10000;
//   return x - Math.floor(x);
// };

// const WallEntry = ({ entry, index }) => {
//   const font = WALL_FONTS[entry.font_index % WALL_FONTS.length];

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
//       style={{
//         position: 'absolute',
//         left: `${entry.pos_x}%`,
//         top:  `${entry.pos_y}%`,
//         transform: `rotate(${entry.rotation}deg)`,
//         fontFamily: `'${font}', cursive`,
//         color: entry.color,
//         userSelect: 'none',
//         cursor: 'default',
//         zIndex: Math.floor(seededRandom(index + 99) * 10),
//       }}
//       whileHover={{ scale: 1.1, zIndex: 50 }}
//       className="group"
//     >
//       <div style={{
//         fontSize: `clamp(18px, ${1.5 + seededRandom(index) * 2}vw, 48px)`,
//         lineHeight: 1.2,
//         textShadow: `0 2px 12px ${entry.color}44`,
//         filter: `drop-shadow(0 2px 8px ${entry.color}33)`,
//       }}>
//         {entry.nickname}
//         <span style={{
//           fontSize: '0.55em',
//           opacity: 0.7,
//           marginLeft: 6,
//           fontFamily: `'${font}', cursive`,
//         }}>
//           was here
//         </span>
//       </div>
//       {entry.message && (
//         <div style={{
//           fontSize: `clamp(10px, ${0.7 + seededRandom(index + 50) * 0.8}vw, 16px)`,
//           opacity: 0,
//           marginTop: 2,
//           fontFamily: `'${font}', cursive`,
//           transition: 'opacity 0.3s',
//         }}
//           className="group-hover:opacity-70">
//           "{entry.message}"
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const Wall = () => {
//   const { user } = useAuth();
//   const [entries, setEntries]     = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [showForm, setShowForm]   = useState(false);
//   const [myEntry, setMyEntry]     = useState(null);
//   const [form, setForm]           = useState({
//     nickname: '', message: '',
//     font_index: 0, color: '#C9A84C',
//   });
//   const [saving, setSaving]       = useState(false);
//   const wallRef                   = useRef();

//   // Load fonts
//   useEffect(() => {
//     const families = WALL_FONTS.join('|').replace(/ /g, '+');
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
//     document.head.appendChild(link);

//     fetchWall();
//   }, []);

//   const fetchWall = async () => {
//     setLoading(true);
//     try {
//       const res = await getWall();
//       setEntries(res.data.entries);
//       const mine = res.data.entries.find(e => e.user_id === user?.id);
//       if (mine) {
//         setMyEntry(mine);
//         setForm({
//           nickname:   mine.nickname,
//           message:    mine.message || '',
//           font_index: mine.font_index,
//           color:      mine.color,
//         });
//       } else {
//         // Pre-fill nickname from profile
//         setForm(prev => ({ ...prev, nickname: user?.nickname || user?.name?.split(' ')[0] || '' }));
//       }
//     } catch { toast.error('Failed to load wall.'); }
//     finally { setLoading(false); }
//   };

//   // Assign random position if new entry
//   const getPosition = () => ({
//     pos_x:    5 + Math.random() * 80,
//     pos_y:    5 + Math.random() * 80,
//     rotation: (Math.random() - 0.5) * 20,
//   });

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!form.nickname.trim()) return toast.error('Nickname is required.');
//     setSaving(true);
//     try {
//       const pos = myEntry
//         ? { pos_x: myEntry.pos_x, pos_y: myEntry.pos_y, rotation: myEntry.rotation }
//         : getPosition();

//       const res = await upsertWallEntry({ ...form, ...pos });
//       const updated = res.data.entry;

//       setEntries(prev =>
//         prev.find(e => e.user_id === updated.user_id)
//           ? prev.map(e => e.user_id === updated.user_id ? { ...e, ...updated } : e)
//           : [...prev, { ...updated, name: user.name, profile_image: user.profile_image }]
//       );
//       setMyEntry(updated);
//       setShowForm(false);
//       toast.success(myEntry ? 'Wall entry updated!' : 'You left your mark! 🎉');
//     } catch { toast.error('Failed to save.'); }
//     finally { setSaving(false); }
//   };

//   const handleRemove = async () => {
//     if (!window.confirm('Remove your mark from the wall?')) return;
//     try {
//       await deleteWallEntry();
//       setEntries(prev => prev.filter(e => e.user_id !== user?.id));
//       setMyEntry(null);
//       setForm({ nickname: user?.nickname || '', message: '', font_index: 0, color: '#C9A84C' });
//       toast.success('Removed from wall.');
//     } catch { toast.error('Failed.'); }
//   };

//   return (
//     <PageWrapper>
//       <div className="min-h-screen bg-[#050505]"
//            style={{ fontFamily: "'Outfit', sans-serif" }}>

//         {/* Header */}
//         <div className="bg-black border-b border-white/[0.06] px-6 py-6
//                         flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <p className="text-xs text-red-600 uppercase tracking-widest mb-1">FYB 2025</p>
//             <h1 style={{ fontFamily: "'Bebas Neue', sans-serif" }}
//                 className="text-4xl text-white tracking-wider">
//               THE <span className="text-red-600">WALL</span>
//             </h1>
//             <p className="text-gray-600 text-xs mt-1">
//               {entries.length} classmate{entries.length !== 1 ? 's' : ''} left their mark
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {myEntry && (
//               <button onClick={handleRemove}
//                 className="text-xs text-gray-600 border border-white/[0.08] px-4 py-2
//                            rounded-xl hover:border-red-900/40 hover:text-red-500
//                            transition-all">
//                 Remove my mark
//               </button>
//             )}
//             <button onClick={() => setShowForm(!showForm)}
//               className="px-5 py-2 bg-red-700 text-white text-sm rounded-xl
//                          hover:bg-red-600 transition-all shadow-lg shadow-red-900/30">
//               {myEntry ? '✏️ Edit my mark' : '✍️ Leave your mark'}
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         {showForm && (
//           <div className="border-b border-white/[0.06] bg-black/60 backdrop-blur-sm">
//             <div className="max-w-2xl mx-auto px-6 py-6">
//               <form onSubmit={handleSave} className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">
//                       Your Nickname
//                     </label>
//                     <input
//                       value={form.nickname}
//                       onChange={e => setForm(p => ({ ...p, nickname: e.target.value }))}
//                       placeholder="What do they call you?"
//                       maxLength={30}
//                       className="w-full bg-white/[0.04] border border-white/[0.08]
//                                  rounded-xl px-4 py-2.5 text-sm text-gray-200
//                                  outline-none focus:border-red-700/50 transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">
//                       Message (optional)
//                     </label>
//                     <input
//                       value={form.message}
//                       onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
//                       placeholder="Leave a vibe…"
//                       maxLength={60}
//                       className="w-full bg-white/[0.04] border border-white/[0.08]
//                                  rounded-xl px-4 py-2.5 text-sm text-gray-200
//                                  outline-none focus:border-red-700/50 transition-colors"
//                     />
//                   </div>
//                 </div>

//                 {/* Font picker */}
//                 <div>
//                   <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">
//                     Choose Font
//                   </label>
//                   <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
//                     {WALL_FONTS.slice(0, 10).map((font, i) => (
//                       <button key={font} type="button"
//                         onClick={() => setForm(p => ({ ...p, font_index: i }))}
//                         style={{ fontFamily: `'${font}', cursive`, color: form.color }}
//                         className={`px-2 py-2 rounded-lg text-sm border transition-all
//                           ${form.font_index === i
//                             ? 'border-red-600 bg-red-950/30'
//                             : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20'}`}>
//                         {form.nickname || 'Abc'}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Color picker */}
//                 <div>
//                   <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">
//                     Colour
//                   </label>
//                   <div className="flex gap-2 flex-wrap">
//                     {WALL_COLORS.map(color => (
//                       <button key={color} type="button"
//                         onClick={() => setForm(p => ({ ...p, color }))}
//                         style={{ background: color }}
//                         className={`w-8 h-8 rounded-full transition-all
//                           ${form.color === color
//                             ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
//                             : 'hover:scale-105'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Preview */}
//                 <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
//                   <p className="text-xs text-gray-600 mb-2 uppercase tracking-widest">Preview</p>
//                   <div style={{
//                     fontFamily: `'${WALL_FONTS[form.font_index]}', cursive`,
//                     color: form.color,
//                     fontSize: 28,
//                     textShadow: `0 2px 12px ${form.color}44`,
//                   }}>
//                     {form.nickname || 'Your Name'}
//                     <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 8 }}>was here</span>
//                   </div>
//                   {form.message && (
//                     <div style={{
//                       fontFamily: `'${WALL_FONTS[form.font_index]}', cursive`,
//                       color: form.color, fontSize: 14, opacity: 0.7, marginTop: 4,
//                     }}>
//                       "{form.message}"
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-3">
//                   <button type="submit" disabled={saving}
//                     className="px-6 py-2.5 bg-red-700 text-white text-sm rounded-xl
//                                hover:bg-red-600 transition-all disabled:opacity-40">
//                     {saving ? 'Saving…' : myEntry ? 'Update Mark' : 'Leave My Mark 🎨'}
//                   </button>
//                   <button type="button" onClick={() => setShowForm(false)}
//                     className="px-6 py-2.5 border border-white/10 text-gray-500 text-sm
//                                rounded-xl hover:border-white/20 hover:text-white transition-all">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Wall Canvas */}
//         <div
//           ref={wallRef}
//           className="relative overflow-hidden"
//           style={{
//             minHeight: 'calc(100vh - 200px)',
//             background: `
//               radial-gradient(ellipse at 20% 20%, rgba(220,38,38,0.04) 0%, transparent 60%),
//               radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.03) 0%, transparent 60%),
//               #050505
//             `,
//           }}
//         >
//           {/* Grid texture */}
//           <div style={{
//             position: 'absolute', inset: 0,
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
//             `,
//             backgroundSize: '40px 40px',
//           }} />

//           {loading ? (
//             <div className="flex items-center justify-center h-96">
//               <p className="text-red-600 animate-pulse text-xl"
//                  style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 4 }}>
//                 Loading Wall…
//               </p>
//             </div>
//           ) : entries.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-96 gap-3">
//               <p style={{ fontFamily: "'Caveat', cursive", fontSize: 42, color: '#374151' }}>
//                 The wall is empty…
//               </p>
//               <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#4b5563' }}>
//                 be the first to leave your mark ✍️
//               </p>
//             </div>
//           ) : (
//             entries.map((entry, i) => (
//               <WallEntry key={entry.id} entry={entry} index={i} />
//             ))
//           )}
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default Wall;

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getWall, upsertWallEntry, deleteWallEntry } from '../services/api';
import PageWrapper from '../components/PageWrapper';
import toast from 'react-hot-toast';

// ── Icons ─────────────────────────────────────────────────────────
const Icons = {
  Edit: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  Pen: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>
  ),
  Paint: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.388 1.62a15.998 15.998 0 001.62-3.388m-1.62 3.388a15.998 15.998 0 003.395-1.622m-3.395 1.622a15.994 15.994 0 003.395 1.622m-1.622-3.395a15.998 15.998 0 00-1.62 3.388m1.62-3.388a15.998 15.998 0 00-1.622-3.395M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
};

// 30 signature-style Google Fonts
const WALL_FONTS = [
  'Caveat', 'Pacifico', 'Dancing Script', 'Satisfy', 'Kaushan Script',
  'Permanent Marker', 'Indie Flower', 'Amatic SC', 'Sacramento',
  'Great Vibes', 'Lobster', 'Courgette', 'Cookie', 'Yellowtail',
  'Architects Daughter', 'Rock Salt', 'Special Elite', 'Shadows Into Light',
  'Homemade Apple', 'Reenie Beanie',
  'Allura', 'Alex Brush', 'Parisienne', 'Pinyon Script', 'Rouge Script',
  'Italianno', 'Tangerine', 'Quintessential', 'Berkshire Swash', 'Marck Script',
];

const WALL_COLORS = [
  '#C9A84C', '#dc2626', '#60a5fa', '#34d399',
  '#f472b6', '#fb923c', '#a78bfa', '#1a1a1a',
  '#facc15', '#4ade80',
  'linear-gradient(135deg, #C9A84C 0%, #dc2626 100%)',
  'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
  'linear-gradient(135deg, #34d399 0%, #4ade80 100%)',
  'linear-gradient(135deg, #fb923c 0%, #facc15 100%)',
  'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
];

// Seeded random so positions stay consistent per entry
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const isGradient = (color) => color?.includes('gradient');

const WallEntry = ({ entry, index }) => {
  const font = WALL_FONTS[entry.font_index % WALL_FONTS.length];
  const gradient = isGradient(entry.color);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      style={{
        position: 'absolute',
        left: `${entry.pos_x}%`,
        top:  `${entry.pos_y}%`,
        transform: `rotate(${entry.rotation}deg)`,
        fontFamily: `'${font}', cursive`,
        userSelect: 'none',
        cursor: 'default',
        zIndex: Math.floor(seededRandom(index + 99) * 10),
      }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      className="group"
    >
      <div style={{
        fontSize: `clamp(18px, ${1.5 + seededRandom(index) * 2}vw, 48px)`,
        lineHeight: 1.2,
        filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.06))`,
        ...(gradient ? {
          background: entry.color,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        } : {
          color: entry.color,
          textShadow: `0 2px 12px rgba(0,0,0,0.08)`,
        }),
      }}>
        {entry.nickname}
        <span style={{
          fontSize: '0.55em',
          opacity: 0.7,
          marginLeft: 6,
          fontFamily: `'${font}', cursive`,
          ...(gradient ? {
            background: entry.color,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          } : {}),
        }}>
          was here
        </span>
      </div>
      {entry.message && (
        <div style={{
          fontSize: `clamp(10px, ${0.7 + seededRandom(index + 50) * 0.8}vw, 16px)`,
          opacity: 0,
          marginTop: 2,
          fontFamily: `'${font}', cursive`,
          transition: 'opacity 0.3s',
          ...(gradient ? {
            background: entry.color,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          } : { color: entry.color }),
        }}
          className="group-hover:opacity-70">
          "{entry.message}"
        </div>
      )}
    </motion.div>
  );
};

const Wall = () => {
  const { user } = useAuth();
  const [entries, setEntries]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [myEntry, setMyEntry]     = useState(null);
  const [form, setForm]           = useState({
    nickname: '', message: '',
    font_index: 0, color: '#C9A84C',
  });
  const [saving, setSaving]       = useState(false);
  const wallRef                   = useRef();

  // Load fonts — FIXED: Google Fonts API v2 uses &family= for each font
  useEffect(() => {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const families = WALL_FONTS.map(f => `family=${encodeURIComponent(f)}`).join('&');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);

    fetchWall();
  }, []);

  const fetchWall = async () => {
    setLoading(true);
    try {
      const res = await getWall();
      setEntries(res.data.entries);
      const mine = res.data.entries.find(e => e.user_id === user?.id);
      if (mine) {
        setMyEntry(mine);
        setForm({
          nickname:   mine.nickname,
          message:    mine.message || '',
          font_index: mine.font_index,
          color:      mine.color,
        });
      } else {
        setForm(prev => ({ ...prev, nickname: user?.nickname || user?.name?.split(' ')[0] || '' }));
      }
    } catch { toast.error('Failed to load wall.'); }
    finally { setLoading(false); }
  };

  const getPosition = () => ({
    pos_x:    5 + Math.random() * 80,
    pos_y:    5 + Math.random() * 80,
    rotation: (Math.random() - 0.5) * 20,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.nickname.trim()) return toast.error('Nickname is required.');
    setSaving(true);
    try {
      const pos = myEntry
        ? { pos_x: myEntry.pos_x, pos_y: myEntry.pos_y, rotation: myEntry.rotation }
        : getPosition();

      const res = await upsertWallEntry({ ...form, ...pos });
      const updated = res.data.entry;

      setEntries(prev =>
        prev.find(e => e.user_id === updated.user_id)
          ? prev.map(e => e.user_id === updated.user_id ? { ...e, ...updated } : e)
          : [...prev, { ...updated, name: user.name, profile_image: user.profile_image }]
      );
      setMyEntry(updated);
      setShowForm(false);
      toast.success(myEntry ? 'Wall entry updated!' : 'You left your mark!');
    } catch { toast.error('Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleRemove = async () => {
    if (!window.confirm('Remove your mark from the wall?')) return;
    try {
      await deleteWallEntry();
      setEntries(prev => prev.filter(e => e.user_id !== user?.id));
      setMyEntry(null);
      setForm({ nickname: user?.nickname || '', message: '', font_index: 0, color: '#C9A84C' });
      toast.success('Removed from wall.');
    } catch { toast.error('Failed.'); }
  };

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

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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
                  THE <span className="text-gold">WALL</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-cream/40 text-sm mt-4 max-w-md leading-relaxed"
                >
                  Leave your signature on the class wall. Pick a font, choose a color, make it yours.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3"
              >
                {myEntry && (
                  <button onClick={handleRemove}
                    className="flex items-center gap-2 text-xs text-cream/40 border border-cream/10 px-4 py-2.5
                               rounded-xl hover:border-red-400/40 hover:text-red-400 transition-all">
                    <Icons.Trash />
                    Remove my mark
                  </button>
                )}
                <button onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink text-sm font-semibold rounded-xl
                             hover:bg-gold/90 active:scale-95 transition-all shadow-lg shadow-gold/20">
                  {myEntry ? <Icons.Edit /> : <Icons.Pen />}
                  {myEntry ? 'Edit my mark' : 'Leave your mark'}
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FORM
        ═══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-white border-b border-gray-100"
            >
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5 block">
                        Your Nickname
                      </label>
                      <input
                        value={form.nickname}
                        onChange={e => setForm(p => ({ ...p, nickname: e.target.value }))}
                        placeholder="What do they call you?"
                        maxLength={30}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink outline-none focus:border-gold/50 focus:shadow-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5 block">
                        Message (optional)
                      </label>
                      <input
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        placeholder="Leave a vibe…"
                        maxLength={60}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink outline-none focus:border-gold/50 focus:shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Font picker */}
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">
                      Choose Font ({WALL_FONTS.length} styles)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                      {WALL_FONTS.map((font, i) => (
                        <button key={font} type="button"
                          onClick={() => setForm(p => ({ ...p, font_index: i }))}
                          style={{ fontFamily: `'${font}', cursive`, color: isGradient(form.color) ? '#1a1a1a' : form.color }}
                          className={`px-2 py-2 rounded-lg text-sm border transition-all truncate
                            ${form.font_index === i
                              ? 'border-gold bg-gold/5 shadow-sm'
                              : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                            }`}>
                          {form.nickname || 'Abc'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color picker */}
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">
                      Colour
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {WALL_COLORS.map(color => (
                        <button key={color} type="button"
                          onClick={() => setForm(p => ({ ...p, color }))}
                          style={{ background: color }}
                          className={`w-8 h-8 rounded-full transition-all
                            ${form.color === color
                              ? 'ring-2 ring-gold ring-offset-2 ring-offset-white scale-110'
                              : 'hover:scale-105'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Preview</p>
                    <div style={{
                      fontFamily: `'${WALL_FONTS[form.font_index]}', cursive`,
                      fontSize: 32,
                      filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.06))`,
                      ...(isGradient(form.color) ? {
                        background: form.color,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      } : {
                        color: form.color,
                        textShadow: `0 2px 12px rgba(0,0,0,0.06)`,
                      }),
                    }}>
                      {form.nickname || 'Your Name'}
                      <span style={{ fontSize: 16, opacity: 0.7, marginLeft: 8 }}>was here</span>
                    </div>
                    {form.message && (
                      <div style={{
                        fontFamily: `'${WALL_FONTS[form.font_index]}', cursive`,
                        fontSize: 14, opacity: 0.7, marginTop: 6,
                        ...(isGradient(form.color) ? {
                          background: form.color,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        } : { color: form.color }),
                      }}>
                        "{form.message}"
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" disabled={saving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-ink text-cream text-sm font-semibold rounded-xl
                                 hover:bg-ink/90 active:scale-95 transition-all disabled:opacity-40 shadow-lg shadow-ink/20">
                      <Icons.Paint />
                      {saving ? 'Saving…' : myEntry ? 'Update Mark' : 'Leave My Mark'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-6 py-2.5 border border-gray-200 text-gray-400 text-sm
                                 rounded-xl hover:border-gray-300 hover:text-ink transition-all">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
            WALL CANVAS
        ═══════════════════════════════════════════════════════════ */}
        <div
          ref={wallRef}
          className="relative overflow-hidden"
          style={{
            minHeight: 'calc(100vh - 200px)',
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.04) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.03) 0%, transparent 60%),
              #faf9f6
            `,
          }}
        >
          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gold animate-pulse text-xl font-display tracking-[0.3em]">
                Loading Wall…
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                <Icons.Pen className="w-8 h-8" />
              </div>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: 42, color: '#9ca3af' }}>
                The wall is empty…
              </p>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#9ca3af' }}>
                be the first to leave your mark
              </p>
            </div>
          ) : (
            entries.map((entry, i) => (
              <WallEntry key={entry.id} entry={entry} index={i} />
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Wall;