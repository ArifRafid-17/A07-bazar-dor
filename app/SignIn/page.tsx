import type { Metadata } from 'next';
import SignInForm from './SignInForm';

export const metadata: Metadata = {
  title: 'সাইন ইন — বাজার দর',
  description: 'বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।',
};

export default function SignInPage() {
  return <SignInForm />;
}
