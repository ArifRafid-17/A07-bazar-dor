export const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formatted = typeof num === 'number' ? num.toLocaleString('en-US') : String(num);
  return formatted.replace(/[0-9]/g, (digit) => digits[parseInt(digit, 10)]);
};

export const getBengaliUnit = (unit: string): string => {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'কেজি';
    case 'litre':
    case 'liter':
      return 'লিটার';
    case 'dozen':
      return 'ডজন';
    case 'piece':
    case 'pc':
      return 'পিস';
    case 'gm':
    case 'gram':
      return 'গ্রাম';
    default:
      return unit || '';
  }
};
