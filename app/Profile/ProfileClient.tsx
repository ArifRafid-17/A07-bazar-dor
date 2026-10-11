'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut, updateUser } from '@/lib/auth-client';

export default function ProfileClient() {
  const { data: session, isPending } = useSession();

  // Local state for editable name and status messages
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('/default-avatar.jpg');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize state when session loads or changes
  useEffect(() => {
    if (session?.user) {
      const userFullName = session.user.name || 'Rezwan Ahmed';
      setName(userFullName);
      setDisplayName(userFullName);
      setEmail(session.user.email);
      if (session.user.image) {
        setAvatar(session.user.image);
      }
    } else if (!isPending) {
      // Default placeholder values matching the mockup if not signed in
      setName('Rezwan Ahmed');
      setDisplayName('Rezwan Ahmed');
      setEmail('rezwanahmed@gmail.com');
      setAvatar('/default-avatar.jpg');
    }
  }, [session, isPending]);

  // Handle name update submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage('দয়া করে আপনার নাম প্রদান করুন');
      return;
    }

    setIsUpdating(true);

    try {
      if (session?.user) {
        // Authenticated user: update in Better Auth / MongoDB
        const res = await updateUser({
          name: trimmedName,
        });

        if (res?.error) {
          setErrorMessage(res.error.message || 'নাম আপডেট করতে সমস্যা হয়েছে');
        } else {
          setDisplayName(trimmedName);
          setSuccessMessage('নাম সফলভাবে আপডেট হয়েছে!');
          // Force a slight delayed reload or router refresh so all components reflect the update
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      } else {
        // Demo preview mode
        setDisplayName(trimmedName);
        setSuccessMessage('নাম সফলভাবে আপডেট হয়েছে! (ডেমো মোড)');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'নাম আপডেট করতে সমস্যা হয়েছে';
      setErrorMessage(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      window.location.href = '/SignIn';
    } catch (err) {
      console.error('Sign out failed:', err);
      window.location.href = '/SignIn';
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center bg-[#f4f6f3] py-10 sm:py-14 px-4 sm:px-6">
      <div className="w-full max-w-[620px]">
        
        {/* Unauthenticated Notification Banner if in demo mode */}
        {!isPending && !session?.user && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-800 text-xs sm:text-sm flex items-center justify-between gap-3">
            <span>
              আপনি বর্তমানে প্রিভিউ মোডে আছেন। আপনার অ্যাকাউন্টে তথ্য স্থায়ীভাবে পরিবর্তন করতে অনুগ্রহ করে সাইন ইন করুন।
            </span>
            <Link
              href="/SignIn"
              className="px-3 py-1.5 bg-[#168941] text-white rounded-lg text-xs font-semibold hover:bg-[#137437] transition-colors shrink-0 cursor-pointer"
            >
              সাইন ইন
            </Link>
          </div>
        )}

        {/* Page Title & Subtitle */}
        <div className="mb-6 sm:mb-7">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-gray-900 tracking-tight leading-snug">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Card 1: User Overview Card */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.02)] mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Left: Avatar & User Info */}
            <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0 relative shadow-inner">
                <Image
                  src={avatar}
                  alt={displayName || 'User Profile'}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate tracking-tight">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-normal truncate mt-0.5">
                  {email}
                </p>
              </div>
            </div>

            {/* Right: Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="border border-red-300/80 hover:border-red-400 bg-white hover:bg-red-50/60 text-[#e04f44] text-xs sm:text-sm font-semibold rounded-xl px-3 sm:px-4 py-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 select-none active:scale-[0.98] disabled:opacity-60"
            >
              <svg
                className="w-4 h-4 text-[#e04f44] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>{isSigningOut ? 'সাইন আউট হচ্ছে...' : 'সাইন আউট'}</span>
            </button>

          </div>
        </div>

        {/* Card 2: Edit Information Form */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
            তথ্য
          </h2>

          {/* Success Message Alert */}
          {successMessage && (
            <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[#168941] text-xs sm:text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-[#168941]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="profile-name"
                className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-2"
              >
                নাম
              </label>
              <input
                id="profile-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#168941]/25 focus:border-[#168941] transition-all bg-white"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full mt-4 sm:mt-5 py-2.5 sm:py-3 px-4 rounded-xl bg-[#168941] hover:bg-[#137437] active:scale-[0.99] text-white text-sm sm:text-base font-semibold shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>আপডেট হচ্ছে...</span>
                </>
              ) : (
                'আপডেট'
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
