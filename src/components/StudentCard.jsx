import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Social icon SVGs
const SocialIcon = {
  X: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  WA: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  FB: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  IG: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
};

const StudentCard = ({ student, index = 0 }) => {
  const hasSocials = student.link_x || student.link_whatsapp || student.link_facebook || student.link_instagram;

  const socials = [
    { key: 'x',        href: student.link_x,        Icon: SocialIcon.X,  color: '#fff'    },
    { key: 'wa',       href: student.link_whatsapp ? (student.link_whatsapp.startsWith('http') ? student.link_whatsapp : `https://wa.me/${student.link_whatsapp.replace(/[^0-9]/g,'')}`) : null,
                                                     Icon: SocialIcon.WA, color: '#22c55e' },
    { key: 'fb',       href: student.link_facebook,  Icon: SocialIcon.FB, color: '#3b82f6' },
    { key: 'ig',       href: student.link_instagram, Icon: SocialIcon.IG, color: '#e1306c' },
  ].filter(s => s.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.5), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/profile/${student.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden border border-cream
                        shadow-sm hover:shadow-xl hover:shadow-ink/8
                        transition-all duration-500 hover:-translate-y-1.5 h-full flex flex-col">

          {/* Portrait */}
          <div className="relative overflow-hidden bg-gradient-to-br from-ink via-gray-800 to-gray-700
                          h-40 xs:h-48 sm:h-52 flex-shrink-0">
            {student.profile_image ? (
              <img
                src={student.profile_image}
                alt={student.name}
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-5xl sm:text-7xl text-gold/40
                                 group-hover:text-gold/60 transition-colors duration-300">
                  {student.name?.charAt(0)}
                </span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70
                            via-transparent to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Complete badge */}
            {student.profile_complete && (
              <div className="absolute top-2 right-2">
                <span className="bg-green-500/90 backdrop-blur-sm text-white
                                 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  ✓ Complete
                </span>
              </div>
            )}

            {/* Department badge — shows on hover */}
            <div className="absolute top-2 left-2
                            opacity-0 group-hover:opacity-100
                            translate-y-1 group-hover:translate-y-0
                            transition-all duration-300">
              <span className="font-body text-[10px] text-cream bg-ink/75
                               backdrop-blur-sm px-2 py-1 rounded-full">
                {student.department}
              </span>
            </div>

            {/* Social icons — slide up on hover */}
            {hasSocials && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5
                              opacity-0 group-hover:opacity-100
                              translate-y-2 group-hover:translate-y-0
                              transition-all duration-300">
                {socials.map(({ key, href, Icon, color }) => (
                  <a key={key}
                     href={href.startsWith('http') ? href : `https://${href}`}
                     target="_blank" rel="noopener noreferrer"
                     onClick={e => e.stopPropagation()}
                     className="w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm
                                border border-white/20 flex items-center justify-center
                                text-white/70 hover:text-white transition-colors"
                     style={{ '--c': color }}
                     onMouseOver={e => e.currentTarget.style.color = color}
                     onMouseOut={e => e.currentTarget.style.color = ''}>
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 sm:p-4 flex flex-col flex-1">
            <h3 className="font-display text-sm sm:text-base text-ink font-semibold leading-tight
                           group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {student.name}
            </h3>

            {student.nickname && (
              <p className="font-body text-[10px] text-gold/70 mt-0.5 italic truncate">
                "{student.nickname}"
              </p>
            )}

            <p className="font-body text-[10px] sm:text-xs text-muted mt-0.5 truncate">
              {student.department}
            </p>

            {student.bio && (
              <p className="font-body text-[10px] sm:text-xs text-muted/70 mt-2
                            line-clamp-2 leading-relaxed flex-1">
                {student.bio}
              </p>
            )}

            {/* View profile CTA */}
            <div className="mt-3 pt-2.5 border-t border-cream
                            flex items-center justify-between">
              <span className="font-body text-[10px] sm:text-xs text-gold
                               flex items-center gap-1
                               opacity-0 group-hover:opacity-100
                               -translate-x-1 group-hover:translate-x-0
                               transition-all duration-300">
                View profile
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                     className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StudentCard;
