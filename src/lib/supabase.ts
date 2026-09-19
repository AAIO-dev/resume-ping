import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// 1. تحديد النطاق بذكاء بناءً على بيئة العمل (محلي أم إنتاج)
const getCookieDomain = () => {
  if (typeof window === 'undefined') return '';
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return hostname;
  }
  return '.dollarfix.net'; // النقطة في البداية لشمول جميع النطاقات الفرعية
};

// 2. إنشاء محول مخصص لحفظ الجلسة في ملفات الارتباط (Cookies)
const customCookieStorage = {
  getItem: (key: string): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
    
    // تحقق إضافي صارم لوجود العنصر الثاني لإرضاء TypeScript
    if (match && match[2]) {
      return decodeURIComponent(match[2]);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof document === 'undefined') return;
    const domain = getCookieDomain();
    document.cookie = `${key}=${encodeURIComponent(value)}; domain=${domain}; path=/; max-age=31536000; SameSite=Lax; Secure`;
  },
  removeItem: (key: string): void => {
    if (typeof document === 'undefined') return;
    const domain = getCookieDomain();
    document.cookie = `${key}=; domain=${domain}; path=/; max-age=0`;
  }
};

// 3. تمرير المحول المخصص إلى عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customCookieStorage,
    storageKey: 'dollarfix-auth-token', // توحيد اسم المفتاح لتجنب التعارض
  },
});