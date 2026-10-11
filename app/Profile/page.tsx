import React from 'react';
import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'আমার প্রোফাইল - বাজার দর',
  description: 'আপনার অ্যাকাউন্টের তথ্য এবং প্রোফাইল পরিচালনা করুন।',
};

export default function ProfilePage() {
  return <ProfileClient />;
}