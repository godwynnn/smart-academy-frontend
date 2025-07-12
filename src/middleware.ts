import { NextRequest, NextResponse } from "next/server";
const middleware = (req: NextRequest) => {

    const token = req.cookies.get('access_token')?.value || null
    const pathname = req.nextUrl.pathname;
    console.log('Inside Middleware ', pathname)

    if (!token || token === null) {

        return NextResponse.redirect(new URL('/auth/login', req.url))
    } else {
        if(['/','/auth/login','/auth/register'].includes(pathname)){
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        return NextResponse.next()
    }



}


export default middleware


export const config = {
    matcher: ['/dashboard/:path*',
        '/academy/:path*',
        '/lesson/:path*',
        '/question/:path*',
        '/auth/:path*',
        '/']
}