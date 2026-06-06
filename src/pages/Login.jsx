import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import PageWrapper from '../components/PageWrapper';
import { NAMSSNLogo, UniJosLogo } from '../components/Logos';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-cream flex">

        {/* ── Left Decorative Panel (desktop) ── */}
        <div className="hidden lg:flex w-1/2 bg-ink flex-col justify-between p-16 relative overflow-hidden">

          {/* Decorative background rings */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-gold/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full border border-gold/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold/5 pointer-events-none" />

          {/* Top — logos + branding */}
          <div>
            {/* Dual logos */}
            <div className="flex items-center gap-5 mb-10">
              <div className="rounded-full bg-white/8 border border-gold/20 p-1.5 flex-shrink-0">
                <NAMSSNLogo size={56} />
              </div>
              <div className="w-px h-10 bg-gold/20 flex-shrink-0" />
              <div className="rounded-full bg-white/8 border border-gold/20 p-1.5 flex-shrink-0">
                <UniJosLogo size={56} />
              </div>
            </div>

            <h1 className="font-display text-5xl text-gold leading-tight">
              Final Year<br />
              <em>Book.</em>
            </h1>
            <p className="font-body text-cream/60 mt-4 text-sm leading-relaxed max-w-xs">
              Your memories, your legacy. A private space for the Class of 2026.
            </p>

            {/* School info badges */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                <span className="font-body text-xs text-cream/50 uppercase tracking-widest">
                  University of Jos
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                <span className="font-body text-xs text-cream/50 uppercase tracking-widest">
                  NAMSSN — Class of 2026
                </span>
              </div>
            </div>
          </div>

          {/* Bottom decorative */}
          <div className="relative h-48">
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full border border-gold/15" />
            <div className="absolute bottom-6 left-6 w-28 h-28 rounded-full border border-gold/25" />
            <div className="absolute bottom-12 left-12 w-14 h-14 rounded-full bg-gold/8" />
          </div>
        </div>

        {/* ── Right — Form Panel ── */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">

            {/* Mobile logos (visible on small screens) */}
            <div className="flex items-center justify-center gap-4 mb-8 lg:hidden">
              <div className="rounded-full bg-ink/5 border border-ink/10 p-1">
                <NAMSSNLogo size={48} />
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-ink">FYB</div>
                <div className="font-body text-xs text-muted">Class of 2026</div>
              </div>
              <div className="rounded-full bg-ink/5 border border-ink/10 p-1">
                <UniJosLogo size={48} />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-3xl text-ink">Welcome back</h2>
              <p className="font-body text-muted text-sm mt-1">
                Sign in to your yearbook account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="font-body text-xs text-muted uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@school.edu"
                  className="w-full mt-1.5 px-4 py-3 bg-white border border-gray-200
                             rounded-xl font-body text-sm text-ink
                             focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-body text-xs text-muted uppercase tracking-widest">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
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
                disabled={loading}
                className="w-full py-3.5 bg-ink text-cream font-body text-sm
                           rounded-xl hover:bg-gold hover:text-ink
                           transition-all duration-300 disabled:opacity-50
                           flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in…
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="font-body text-sm text-muted text-center mt-6">
              Have an invite?{' '}
              <Link to="/register" className="text-gold hover:underline font-medium">
                Create account
              </Link>
            </p>

            {/* Footer logos caption */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
              <NAMSSNLogo size={20} />
              <span className="font-body text-xs text-muted/60">×</span>
              <UniJosLogo size={20} />
              <span className="font-body text-xs text-muted/60 ml-1">University of Jos · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
