// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { NAMSSNLogo } from './Logos';

// // SVG nav icons
// const NavIcons = {
//   Yearbook: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/></svg>,
//   Feed:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6z"/></svg>,
//   Finalist: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
//   Wall:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>,
//   Profile:  () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
// };

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => setMenuOpen(false), [location]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const navLinks = [
//     { to: '/',         label: 'Yearbook',   icon: NavIcons.Yearbook },
//     { to: '/feed',     label: 'Feed',        icon: NavIcons.Feed     },
//     { to: '/finalist', label: 'Finalist',    icon: NavIcons.Finalist },
//     { to: '/wall',     label: 'Wall',        icon: NavIcons.Wall     },
//     ...(user ? [{ to: `/profile/${user.id}`, label: 'My Profile', icon: NavIcons.Profile }] : []),
//   ];

//   return (
//     <motion.nav
//       className={`sticky top-0 z-50 transition-all duration-300
//                   ${scrolled
//                     ? 'bg-ink/95 backdrop-blur-md shadow-lg shadow-black/20'
//                     : 'bg-ink'
//                   }`}
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

//         {/* Logo */}
//         <Link to="/" className="group flex items-center gap-2.5 flex-shrink-0">
//           <div className="rounded-full bg-white/8 border border-gold/25 p-0.5 flex-shrink-0
//                           group-hover:border-gold/50 transition-colors duration-300">
//             <NAMSSNLogo size={30} />
//           </div>
//           <div className="flex items-baseline gap-1.5">
//             <span className="font-display text-xl sm:text-2xl text-gold tracking-wide
//                              group-hover:text-cream transition-colors duration-300">
//               FYB
//             </span>
//             <span className="font-body text-cream/40 text-xs hidden sm:inline">
//               Class of 2026
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-5 lg:gap-7">
//           {navLinks.map(({ to, label, icon: Icon }) => (
//             <Link
//               key={to}
//               to={to}
//               className={`font-body text-sm transition-colors duration-200
//                           relative group flex items-center gap-1.5
//                           ${location.pathname === to
//                             ? 'text-gold'
//                             : 'text-cream/70 hover:text-cream'
//                           }`}
//             >
//               <Icon />
//               {label}
//               {location.pathname === to && (
//                 <motion.span
//                   layoutId="nav-indicator"
//                   className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
//                 />
//               )}
//             </Link>
//           ))}

//           {user ? (
//             <motion.button
//               onClick={handleLogout}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="border border-gold/50 text-gold px-4 py-1.5 rounded-lg
//                          text-sm font-body hover:bg-gold hover:text-ink
//                          hover:border-gold transition-all duration-200"
//             >
//               Logout
//             </motion.button>
//           ) : (
//             <Link to="/login">
//               <motion.span
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="inline-block border border-gold/50 text-gold
//                            px-4 py-1.5 rounded-lg text-sm font-body
//                            hover:bg-gold hover:text-ink hover:border-gold
//                            transition-all duration-200"
//               >
//                 Login
//               </motion.span>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-cream p-1.5 rounded-md hover:bg-white/10 transition-colors"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <div className="space-y-1.5 w-6">
//             <motion.span
//               animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
//               className="block w-full h-px bg-cream origin-center"
//             />
//             <motion.span
//               animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
//               className="block w-full h-px bg-cream"
//             />
//             <motion.span
//               animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
//               className="block w-full h-px bg-cream origin-center"
//             />
//           </div>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden overflow-hidden border-t border-white/10 bg-ink"
//           >
//             <div className="px-5 py-4 space-y-1">
//               {navLinks.map(({ to, label, icon: Icon }) => (
//                 <Link
//                   key={to}
//                   to={to}
//                   className={`flex items-center gap-3 font-body text-sm py-3 px-3 rounded-xl
//                              transition-all
//                              ${location.pathname === to
//                                ? 'text-gold bg-white/5'
//                                : 'text-cream/70 hover:text-cream hover:bg-white/5'
//                              }`}
//                 >
//                   <Icon />
//                   {label}
//                 </Link>
//               ))}
//               <div className="pt-2 border-t border-white/10 mt-2">
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left font-body text-sm text-gold py-3 px-3 rounded-xl hover:bg-white/5 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="block font-body text-sm text-gold py-3 px-3 rounded-xl hover:bg-white/5 transition-colors"
//                   >
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { NAMSSNLogo } from './Logos';

// SVG nav icons
const NavIcons = {
  Yearbook: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/></svg>,
  Feed:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6z"/></svg>,
  Finalist: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
  Wall:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>,
  Profile:  () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/',         label: 'Yearbook',   icon: NavIcons.Yearbook },
    { to: '/feed',     label: 'Feed',        icon: NavIcons.Feed     },
    { to: '/finalist', label: 'Finalist',    icon: NavIcons.Finalist },
    { to: '/wall',     label: 'Wall',        icon: NavIcons.Wall     },
    ...(user ? [{ to: `/profile/${user.id}`, label: 'My Profile', icon: NavIcons.Profile }] : []),
  ];

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300
                  ${scrolled
                    ? 'bg-ink/95 backdrop-blur-md shadow-lg shadow-black/20'
                    : 'bg-ink'
                  }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5 flex-shrink-0">
          <div className="rounded-full bg-white/8 border border-gold/25 p-0.5 flex-shrink-0
                          group-hover:border-gold/50 transition-colors duration-300">
            <NAMSSNLogo size={30} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl sm:text-2xl text-gold tracking-wide
                             group-hover:text-cream transition-colors duration-300">
              FYB
            </span>
            <span className="font-body text-cream/40 text-xs hidden sm:inline">
              Class of 2026
            </span>
          </div>
        </Link>

        {/* Desktop Links — text + icon */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`font-body text-sm transition-colors duration-200
                          relative group flex items-center gap-1.5
                          ${location.pathname === to
                            ? 'text-gold'
                            : 'text-cream/70 hover:text-cream'
                          }`}
            >
              <Icon />
              {label}
              {location.pathname === to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                />
              )}
            </Link>
          ))}

          {user ? (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-gold/50 text-gold px-4 py-1.5 rounded-lg
                         text-sm font-body hover:bg-gold hover:text-ink
                         hover:border-gold transition-all duration-200"
            >
              Logout
            </motion.button>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block border border-gold/50 text-gold
                           px-4 py-1.5 rounded-lg text-sm font-body
                           hover:bg-gold hover:text-ink hover:border-gold
                           transition-all duration-200"
              >
                Login
              </motion.span>
            </Link>
          )}
        </div>

        {/* Mobile / Tablet — icon-only row */}
        <div className="flex md:hidden items-center gap-1">
          {navLinks.map(({ to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative p-2 rounded-xl transition-all duration-200
                            ${active
                              ? 'text-gold bg-white/10'
                              : 'text-cream/60 hover:text-cream hover:bg-white/5'
                            }`}
                aria-label={to}
              >
                <Icon />
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}

          {/* Mobile logout / login */}
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-cream/60 hover:text-red-400 hover:bg-white/5 transition-all duration-200"
              aria-label="Logout"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
            </button>
          ) : (
            <Link
              to="/login"
              className="p-2 rounded-xl text-cream/60 hover:text-gold hover:bg-white/5 transition-all duration-200"
              aria-label="Login"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;