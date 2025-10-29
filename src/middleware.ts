import {NextRequest, NextResponse} from "next/server";
import {defaultLocale} from "../locales/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
	// const { pathname } = req.nextUrl;
	// if (
	// 	PUBLIC_FILE.test(pathname) ||
	// 	pathname.startsWith('/api') ||
	// 	pathname.includes('/_next')
	// ) {
	// 	return;
	// }
	//
	// const pathnameIsMissingLocale = !pathname.startsWith('/en') && !pathname.startsWith('/de');
	//
	// if (pathnameIsMissingLocale) {
	// 	const url = req.nextUrl.clone();
	// 	url.pathname = `/${defaultLocale}${pathname}`;
	// 	return NextResponse.redirect(url);
	// }
}