// ============================================================
// format.ts — Utility functions (Next.js)
// ============================================================

export const formatCurrency = (
  amount: number,
  locale = 'vi-VN',
  currency = 'VND'
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);

export const formatUSD = (amount: number): string =>
  formatCurrency(amount, 'en-US', 'USD');

export const formatNumber = (num: number, locale = 'vi-VN'): string =>
  new Intl.NumberFormat(locale).format(num);

export const formatCompact = (num: number, locale = 'vi-VN'): string =>
  new Intl.NumberFormat(locale, { notation: 'compact' }).format(num);

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale = 'vi-VN'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options ?? {
    day: '2-digit', month: '2-digit', year: 'numeric',
  }).format(d);
};

export const formatDateTime = (date: string | Date, locale = 'vi-VN'): string =>
  formatDate(date, {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }, locale);

export const formatRelativeTime = (date: string | Date, locale = 'vi'): string => {
  const d   = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (seconds < 60)      return rtf.format(-seconds, 'second');
  if (seconds < 3600)    return rtf.format(-Math.floor(seconds / 60), 'minute');
  if (seconds < 86400)   return rtf.format(-Math.floor(seconds / 3600), 'hour');
  if (seconds < 2592000) return rtf.format(-Math.floor(seconds / 86400), 'day');
  if (seconds < 31536000)return rtf.format(-Math.floor(seconds / 2592000), 'month');
  return rtf.format(-Math.floor(seconds / 31536000), 'year');
};

export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const toSlug = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

export const getInitials = (name: string, max = 2): string =>
  name.split(' ').map(w => w[0]).filter(Boolean).slice(0, max).join('').toUpperCase();

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
