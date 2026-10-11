import type { Metadata } from 'next';
import NotFoundView from './components/NotFoundView';

export const metadata: Metadata = {
  title: '৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি | বাজার দর',
  description: 'দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি বা লোড করা সম্ভব হয়নি। বাজার দরে প্রয়োজনীয় নিত্যপণ্যের সঠিক দাম জানুন।',
};

export default function NotFound() {
  return <NotFoundView />;
}
