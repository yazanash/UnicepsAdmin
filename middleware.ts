import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './lib/i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 1. استخراج التوكن
  const token = request.cookies.get('auth')?.value

  // 2. تجاهل الملفات الثابتة والـ API والـ Auth من منطق اللغات
  if (
    pathname.startsWith('/api') ||
     pathname.startsWith('/admin') ||
    pathname.startsWith('/auth') || // منع إضافة لغة لروابط auth
    [
      '/manifest.json',
      '/favicon.ico',
    ].includes(pathname) ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg)$/)
  ) {
    return NextResponse.next()
  }

  // --- منطق الحماية (Auth Logic) ---
  
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // التحويل لصفحة اللوجن بدون لغة
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.includes('/login') && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // --- منطق اللغات (i18n Logic) ---

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // نقوم بالتحويل للغة الافتراضية فقط إذا لم يكن المسار admin أو auth
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/auth')) {
       return NextResponse.redirect(
        new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  // شمول كل المسارات وفلترتها داخل الميدل وير أدق
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}