import type { Metadata } from 'next';
import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'অ্যাকাউন্ট তৈরি করুন — বাজার দর',
  description: 'বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
