import { NextRequest, NextResponse } from "next/server";
const middleware = (req: NextRequest) => {

    const token = req.cookies.get('access_token')?.value || null
    const pathname = req.nextUrl.pathname;
    const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register'];
    console.log('Inside Middleware ', pathname)

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);


    // Redirect authenticated users away from public routes
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }


    // Redirect unauthenticated users away from protected routes
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }


    return NextResponse.next()



}


export default middleware


export const config = {
    matcher: ['/dashboard/:path*',
        '/lesson',
        '/question',
        '/academy/:path*',
        '/lesson/:path*',
        '/question/:path*',
        '/auth/:path*',
        
        '/']
}