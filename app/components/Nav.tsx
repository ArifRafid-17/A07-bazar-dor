'use client';

import React, { useSyncExternalStore, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';

const emptySubscribe = () => () => {};

const getBengaliDate = () => {
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .format(new Date())
      .replace(/,([^,]*)$/, '$1'); // remove extra comma before year
  } catch {
    // Fallback if Intl bn-BD is not supported
    return 'DATE';
  }
};

const NavBar = () => {
  const currentDate = useSyncExternalStore(
    emptySubscribe,
    getBengaliDate,
    () => null
  );

  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      await signOut();
      window.location.href = '/';
    } catch (err) {
      console.error('Sign out error:', err);
      window.location.href = '/';
    }
  };

  const displayName = session?.user?.name
    ? session.user.name.split(' ')[0]
    : 'প্রোফাইল';

  const avatarSrc = session?.user?.image || '/default-avatar.jpg';

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Details */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-[#168941] flex items-center justify-center group-hover:bg-[#137637] transition-colors">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={20}
                height={20}
                className="brightness-0 invert object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#168941] transition-colors">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {currentDate}
              </span>
            </div>
          </Link>

          {/* Action / Auth Buttons */}
          <div className="flex items-center">
            {isPending ? (
              <div className="w-20 h-9 bg-gray-100/80 rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2 rounded-full hover:bg-gray-100/70 border border-transparent hover:border-gray-200 transition-all cursor-pointer focus:outline-none"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-100 border border-gray-200 relative shrink-0">
                    <Image
                      src={avatarSrc}
                      alt={session.user.name || 'User'}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 tracking-tight">
                    {displayName}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {session.user.name || 'ব্যবহারকারী'}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/Profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#168941] transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/70 transition-colors text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  href="/SignIn"
                  className="text-sm font-medium text-gray-800 hover:text-[#168941] transition-colors cursor-pointer"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/SignUp"
                  className="text-sm font-medium text-white bg-[#168941] hover:bg-[#137437] px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;