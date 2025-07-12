'use client'
import React from 'react'
import Image from 'next/image'
import DashboardSidebar from '../../components/dashboardSidebar'
import { useSelector } from 'react-redux'

function Dashboard() {
    const authData=useSelector((state)=>state.allReducer.authreducer)

    console.log(authData)
    const events = [
        {
            title: 'STEM 2025',
            tag: 'stem',
            image: 'https://tinyurl.com/ey7pf949',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'

        },

        {
            title: 'Tech Expo 25',
            tag: 'Tech expo',
            image: 'https://tinyurl.com/54rxcd7r',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'

        },
        {
            title: 'Academy upgrade',
            tag: 'Update',
            image: 'https://tinyurl.com/388akrfe',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'


        }
    ]

    return (
        <>
            <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65">
                <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
                    <div className="me-5 lg:me-0 lg:hidden">
                        {/* Logo */}
                        <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
                            LOGO
                        </a>
                        {/* End Logo */}

                        <div className="lg:hidden ms-1">

                        </div>
                    </div>

                    <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">

                        <div className="hidden md:block">
                            {/* Search Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </div>
                                <input type="text" className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                                <div className="hidden absolute inset-y-0 end-0  items-center z-20 pe-1">
                                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600" aria-label="Close">
                                        <span className="sr-only">Close</span>
                                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                                    <svg className="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                                    <span className="mx-1">
                                        <svg className="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                    </span>
                                    <span className="text-xs">/</span>
                                </div>
                            </div>
                            {/* End Search Input */}
                        </div>

                        <div className="flex flex-row items-center justify-end gap-1">
                            <button type="button" className="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                <span className="sr-only">Search</span>
                            </button>

                            <button type="button" className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                <span className="sr-only">Notifications</span>
                            </button>

                            <button type="button" className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                <span className="sr-only">Activity</span>
                            </button>

                            {/* Dropdown */}
                            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                                <button id="hs-dropdown-account" type="button" className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                                    <img className="shrink-0 size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                                </button>

                                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
                                    <div className="py-3 px-5 bg-gray-100 rounded-t-lg">
                                        <p className="text-sm text-gray-500">Signed in as</p>
                                        <p className="text-sm font-medium text-gray-800">{authData.email}</p>
                                    </div>
                                    <div className="p-1.5 space-y-0.5">
                                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                            Newsletter
                                        </a>
                                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                            Purchases
                                        </a>
                                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
                                            Downloads
                                        </a>
                                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                            Team Account
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End Dropdown */}
                        </div>
                    </div>
                </nav>
            </header>


           

            <DashboardSidebar/>



            {/* Content */}
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">


                    {/* Card Section */}
                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                            {/* Card */}
                            <a className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/lesson">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Lessons Plans
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                4 job positions
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {/* End Card */}

                            {/* Card */}
                            <a className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/question">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Quizzes
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                26 job positions
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {/* End Card */}

                            {/* Card */}
                            <a className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="#">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Arts & Entertainment
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                9 job positions
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {/* End Card */}




                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Card Section */}





                    {/* Card */}
                    <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
                        
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            <div>
                                <h2 className="text-sm text-gray-500">
                                    Visitors
                                </h2>
                                <p className="text-xl sm:text-2xl font-medium text-gray-800">
                                    80.3k
                                </p>
                            </div>

                            <div>
                                <span className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800">
                                    <svg className="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                                    2%
                                </span>
                            </div>
                        </div>

                        <div id="hs-single-area-chart"></div>
                    </div>
                    {/* End Card */}





                    {/* Card Blog */}
                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <p className='md:text-3xl max-sm:text-2xl sm:text-2xl font-semibold'>Event&Updates</p><br />
                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card */}
                            {events.map((val, idx) => {


                                return (<div key={idx} className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl">
                                    <div className="h-52 flex flex-col justify-center items-center bg-[#001219] rounded-t-xl">
                                        <Image src={val.image} className='w-[80%] h-full' width={1000} height={1000} alt='events-img' />
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                                            {val.tag}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {val.title}
                                        </h3>
                                        <p className="mt-3 text-gray-500">
                                            {val.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
                                        <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-gray-500 text-gray-100 shadow-2xs hover:bg-gray-300 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                                            Coming Soon
                                        </a>
                                        {/* <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
          View API
        </a> */}
                                    </div>
                                </div>)

                            })}
                            {/* End Card */}


                            {/* End Card */}
                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Card Blog */}
                </div>
            </div>


        </>
    )
}

export default Dashboard