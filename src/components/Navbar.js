import React from 'react'
import Link from 'next/link'

export default function Navbar() {
    return (
        <>
            {/* ========== HEADER ========== */}
            <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
                <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between p-1 ps-4 md:py-0 sm:mx-auto">
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="/dashboard" aria-label="Preline">
                            LOGO
                        </Link>
                        {/* End Logo */}

                        <div className="ms-1 sm:ms-2">

                        </div>
                    </div>

                    <div className="flex items-center gap-1 md:order-4 md:ms-4">
                        <Link className="w-full sm:w-auto whitespace-nowrap py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                            Book a call
                        </Link>

                        <div className="md:hidden">
                            {/* Toggle Button */}
                            <button type="button" className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                                <svg className="hs-collapse-open:hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                            {/* End Toggle Button */}
                        </div>
                    </div>


                    
                        <div className="flex flex-col md:flex md:flex-row md:items-center md:justify-end sm:hidden max-sm:hidden gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                            <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-gray-800 font-medium text-gray-800 hover:text-gray-800 focus:outline-hidden" href="index.html" aria-current="page">Home</Link>
                            <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden" href="/academy">Academy</Link>
                            <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden" href="#">Reviews</Link>
                        </div>
           
                </nav>
            </header>
            {/* ========== END HEADER ========== */}
        </>
    )
}
