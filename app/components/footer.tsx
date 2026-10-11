import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fbfdfa] border-t border-gray-200/80 py-6 sm:py-7 mt-auto select-none">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm sm:text-[15px] text-gray-600">
        <p className="font-medium">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="text-gray-500">সকল দর সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;
