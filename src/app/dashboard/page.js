'use client'
import React from 'react'
import Image from 'next/image'
import DashboardSidebar from '@/components/DashboardSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { AuthencticationAction, AuthenticationReducer } from '@/reducer/reducer.'
import { handleLogout } from '@/components/server'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import DashboardHeader from '@/components/DashboardHeader'
import Link from 'next/link'
import Chart from 'react-apexcharts'

function Dashboard() {
    const authData = useSelector((state) => state.authreducer)
    const dispatch = useDispatch()
    const router = useRouter()

    const ChartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };


    const Logout = async () => {
        const res = await handleLogout()
        console.log(res)
        if (!!res.logged_out) {
            toast.success(res.message, {
                theme: "light",

            })

            dispatch(AuthencticationAction.Logout())

            router.push('/')

        }



    }

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


            <DashboardHeader Logout={Logout} authData={authData} />


            <DashboardSidebar />



            {/* Content */}
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">


                    {/* Card Section */}
                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/lesson">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Lessons Plans
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 4 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* End Card */}

                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/question">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Quizzes
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 26 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* End Card */}

                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="#">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Arts & Entertainment
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 9 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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

                        <div id="hs-single-area-chart">

                            <Chart
                                options={ChartData.options}
                                series={ChartData.series}
                                type="bar"
                                width="100%"
                                height={600}
                            />

                        </div>
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
                                        <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-gray-500 text-gray-100 shadow-2xs hover:bg-gray-300 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                                            Coming Soon
                                        </Link>
                                        {/* <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
          View API
        </Link> */}
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