import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sign in will be available when the backend is connected.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar className="mx-auto" />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <form onSubmit={handleSubmit} className="flex min-h-[570px] w-full max-w-[620px] flex-col justify-center rounded-[24px] bg-surface-white p-6 text-text-primary sm:p-8">
          <header className="mb-6">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">Welcome back</h1>
            <p className="mt-2 font-display text-[12px] text-text-secondary">Sign in to return to your learning or teaching workspace.</p>
          </header>
          <div className="space-y-3">
            <label className="block font-display text-[12px] font-bold" htmlFor="username">Username or email <span aria-hidden="true">*</span>
              <input id="username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username or email" className="mt-2 h-12 w-full rounded-lg border border-[#dfe5f0] bg-white px-3 font-display text-[12px] font-normal placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus" />
            </label>
            <label className="block font-display text-[12px] font-bold" htmlFor="password">Password <span aria-hidden="true">*</span>
              <input id="password" autoComplete="current-password" required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="mt-2 h-12 w-full rounded-lg border border-[#dfe5f0] bg-white px-3 font-display text-[12px] font-normal placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus" />
            </label>
          </div>
          <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)} className="mt-2 block w-full text-right font-display text-[8px] font-bold text-aktif-navy">SHOW / HIDE PASSWORDS</button>
          <button type="submit" className="mt-3 h-11 w-full rounded-[9px] border border-aktif-navy bg-aktif-gold px-3 font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-amber-400">SIGN IN</button>
          {status && <p role="status" className="mt-4 rounded-lg bg-[#fff4cd] p-[14px] font-display text-[12px] text-text-secondary">{status}</p>}
          <div className="mt-3 grid grid-cols-2 gap-4 text-center font-display text-[11px] font-bold text-text-primary">
            <Link to="/register" className="hover:underline">Don’t have an account?</Link>
            <Link to="/forgot-password" className="hover:underline">Forgot Password</Link>
          </div>
          <Link to="/help" className="mt-4 block text-center font-display text-[11px] font-bold text-aktif-navy underline">Need help? Visit Help &amp; support</Link>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
