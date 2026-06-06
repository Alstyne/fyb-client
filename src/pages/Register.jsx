import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser, validateInvite } from '../services/api';
import { NAMSSNLogo, UniJosLogo } from '../components/Logos';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', token: '' });
  const [tokenValid, setTokenValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setForm((prev) => ({ ...prev, token: urlToken }));
      checkToken(urlToken);
    }
  }, []);

  const checkToken = async (t) => {
    setValidating(true);
    try {
      const res = await validateInvite(t);
      setTokenValid(true);
      setForm((prev) => ({ ...prev, email: res.data.email }));
      toast.success('Invite valid! Fill in your details.');
    } catch {
      setTokenValid(false);
      toast.error('Invalid or expired invite token.');
    } finally {
      setValidating(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tokenValid) { toast.error('Please enter a valid invite token.'); return; }
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full mt-1.5 px-4 py-3 bg-white border border-gray-200
                    rounded-xl font-body text-sm text-ink
                    focus:outline-none focus:border-gold transition-colors`;

  return (
    <div className="min-h-screen bg-cream flex">

      {/* ── Left Decorative Panel (desktop) ── */}
      <div className="hidden lg:flex w-2/5 bg-ink flex-col justify-between p-14 relative overflow-hidden">

        {/* Background rings */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-gold/8 pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full border border-gold/10 pointer-events-none" />

        <div>
          {/* Dual logos stacked */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white/8 border border-gold/20 p-1.5 flex-shrink-0">
                <NAMSSNLogo size={52} />
              </div>
              <div>
                <div className="font-body text-xs text-gold/80 uppercase tracking-widest">NAMSSN</div>
                <div className="font-body text-xs text-cream/50">Dept. Association</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white/8 border border-gold/20 p-1.5 flex-shrink-0">
                <UniJosLogo size={52} />
              </div>
              <div>
                <div className="font-body text-xs text-gold/80 uppercase tracking-widest">University of Jos</div>
                <div className="font-body text-xs text-cream/50">Discipline & Dedication</div>
              </div>
            </div>
          </div>

          <h1 className="font-display text-4xl text-gold leading-tight">
            Join the<br />
            <em>Class of 2026.</em>
          </h1>
          <p className="font-body text-cream/50 mt-4 text-sm leading-relaxed max-w-xs">
            You need an invite from your admin to register. Enter your token to get started.
          </p>

          {/* Steps */}
          <div className="mt-8 space-y-3">
            {[
              { n: '01', label: 'Verify your invite token' },
              { n: '02', label: 'Fill in your details' },
              { n: '03', label: 'Complete your profile' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-3">
                <span className="font-body text-xs text-gold/50 font-mono w-6">{n}</span>
                <span className="font-body text-xs text-cream/50">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-32">
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full border border-gold/15" />
          <div className="absolute bottom-5 left-5 w-20 h-20 rounded-full border border-gold/20" />
          <div className="absolute bottom-10 left-10 w-10 h-10 rounded-full bg-gold/8" />
        </div>
      </div>

      {/* ── Right — Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logos */}
          <div className="flex items-center justify-center gap-4 mb-6 lg:hidden">
            <div className="rounded-full bg-ink/5 border border-ink/10 p-1">
              <NAMSSNLogo size={44} />
            </div>
            <div className="text-center">
              <div className="font-display text-xl text-ink">FYB 2026</div>
              <div className="font-body text-xs text-muted">Create Account</div>
            </div>
            <div className="rounded-full bg-ink/5 border border-ink/10 p-1">
              <UniJosLogo size={44} />
            </div>
          </div>

          <div className="mb-7">
            <h2 className="font-display text-3xl text-ink">Create account</h2>
            <p className="font-body text-muted text-sm mt-1">
              Join the Final Year Book — invite required.
            </p>
          </div>

          {/* Token validation banners */}
          {tokenValid === true && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl
                            font-body text-sm text-green-700 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Invite verified — you're on the list.
            </div>
          )}
          {tokenValid === false && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl
                            font-body text-sm text-red-600 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              This invite is invalid or has expired.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Invite Token */}
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-widest">
                Invite Token
              </label>
              <div className="flex gap-2 mt-1.5">
                <input
                  type="text"
                  name="token"
                  value={form.token}
                  onChange={handleChange}
                  placeholder="Paste your invite token"
                  className="flex-1 px-4 py-3 bg-white border border-gray-200
                             rounded-xl font-body text-sm text-ink
                             focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => checkToken(form.token)}
                  disabled={validating || !form.token}
                  className="px-4 py-3 bg-ink text-cream text-sm font-body
                             rounded-xl hover:bg-gold hover:text-ink
                             transition-all duration-200 disabled:opacity-40 whitespace-nowrap"
                >
                  {validating ? '…' : 'Verify'}
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-widest">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                required placeholder="Your full name" className={inputCls} />
            </div>

            {/* Email */}
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-widest">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                required readOnly={tokenValid === true} placeholder="Prefilled from invite"
                className={`${inputCls} ${tokenValid === true ? 'bg-gray-50 text-muted cursor-not-allowed' : ''}`} />
            </div>

            {/* Department */}
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-widest">Department</label>
              <input type="text" name="department" value={form.department} onChange={handleChange}
                required placeholder="e.g. Statistics & Mathematics" className={inputCls} />
            </div>

            {/* Password */}
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-widest">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full px-4 py-3 bg-white border border-gray-200
                             rounded-xl font-body text-sm text-ink
                             focus:outline-none focus:border-gold transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-muted hover:text-ink transition-colors p-1"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !tokenValid}
              className="w-full py-3.5 bg-ink text-cream font-body text-sm
                         rounded-xl hover:bg-gold hover:text-ink
                         transition-all duration-300 disabled:opacity-40 mt-2
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account…
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="font-body text-sm text-muted text-center mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:underline font-medium">Sign in</Link>
          </p>

          {/* Footer logos */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
            <NAMSSNLogo size={18} />
            <span className="font-body text-xs text-muted/50">×</span>
            <UniJosLogo size={18} />
            <span className="font-body text-xs text-muted/50 ml-1">University of Jos · NAMSSN 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
