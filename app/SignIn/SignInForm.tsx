'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth-client';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check for callbackUrl on mount to alert the user if they were redirected from a protected route
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const callback = params.get('callbackUrl');
      if (callback) {
        toast.error('প্রোফাইল বা বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await signIn.email({
        email,
        password,
        callbackURL: '/',
      });
      if (res?.error) {
        const errorMsg = res.error.message || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়!';
        setError(errorMsg);
        toast.error(errorMsg);
        setIsLoading(false);
      } else {
        const successMsg = 'সাইন ইন সফল হয়েছে!';
        setMessage(successMsg);
        toast.success(successMsg);
        router.push('/');
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'সাইন ইন করতে সমস্যা হয়েছে';
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    setError('');
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে';
      setError(msg);
      toast.error(msg);
      setSocialLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    setSocialLoading('github');
    setError('');
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে';
      setError(msg);
      toast.error(msg);
      setSocialLoading(null);
    }
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center bg-[#f4f6f3] py-10 sm:py-16 px-4">
      {/* Top Header */}
      <div className="text-center mb-6 sm:mb-8 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[#168941] text-xs sm:text-sm font-medium text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1.5"
            >
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm sm:text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#168941]/25 focus:border-[#168941] transition-all bg-white"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1.5"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm sm:text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#168941]/25 focus:border-[#168941] transition-all bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || socialLoading !== null}
            className="w-full mt-2 py-2.5 sm:py-3 px-4 rounded-xl bg-[#168941] hover:bg-[#137437] active:scale-[0.99] text-white text-sm sm:text-base font-semibold shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>অপেক্ষা করুন...</span>
              </>
            ) : (
              'সাইন ইন'
            )}
          </button>
        </form>

        {/* Divider with "অথবা" */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/80" />
          </div>
          <div className="relative flex justify-center text-xs text-gray-400">
            <span className="bg-white px-3 font-normal text-gray-500">অথবা</span>
          </div>
        </div>

        {/* Social Buttons (Side by Side) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={socialLoading !== null || isLoading}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[11px] sm:text-xs font-medium text-gray-700 transition-colors cursor-pointer select-none disabled:opacity-60"
          >
            {socialLoading === 'google' ? (
              <svg className="animate-spin h-3.5 w-3.5 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="truncate">
              {socialLoading === 'google' ? 'অপেক্ষা করুন...' : 'Google দিয়ে চালিয়ে যান'}
            </span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={socialLoading !== null || isLoading}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[11px] sm:text-xs font-medium text-gray-700 transition-colors cursor-pointer select-none disabled:opacity-60"
          >
            {socialLoading === 'github' ? (
              <svg className="animate-spin h-3.5 w-3.5 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            )}
            <span className="truncate">
              {socialLoading === 'github' ? 'অপেক্ষা করুন...' : 'GitHub দিয়ে চালিয়ে যান'}
            </span>
          </button>
        </div>

        {/* Footer in Card */}
        <div className="mt-6 text-center text-xs sm:text-[13px] text-gray-600 font-medium">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/SignUp"
            className="text-[#168941] font-semibold hover:underline cursor-pointer"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs sm:text-[13px] text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
