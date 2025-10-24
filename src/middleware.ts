import { NextRequest, NextResponse } from "next/server";
const middleware = (req: NextRequest) => {
    const url=req.nextUrl
    let hostname=req.headers.get('host')||"";
    console.log(hostname)
    const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register'];

    const rootDomain="smartacademy-gamma.vercel.app"
    const isLocahost=hostname.includes("localhost")

    let subdomain=""
    // if(!isLocahost && hostname.endsWith(`.${rootDomain}`)){
    //     subdomain=hostname.replace(`.${rootDomain}`,"").split(".")[0]
    // }
    


    const token = req.cookies.get('access_token')?.value || null
    const pathname = url.pathname;
    
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


    // if(hostname.startsWith('app.')){
    //     url.pathname=`${url.pathname}`
        
    //     return NextResponse.rewrite(url)
    // }
    
    // if(!hostname.startsWith('app.')){
    //     url.pathname='/'
    //     return NextResponse.rewrite(url)
    // }
    
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