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

function Dashboard() {
    const authData = useSelector((state) => state.authreducer)
    const dispatch = useDispatch()
    const router = useRouter()

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
            title: 'Lesson Plan',
            tag: 'Lessons',
            image: 'https://tinyurl.com/ey7pf949',
            path:'/academy/lesson',
            description: 'Generate Lesson Plans'

        },

        {
            title: 'Questionaire',
            tag: 'Quiz',
            image: 'https://tinyurl.com/54rxcd7r',
            path:'/academy/question',
            description: 'Generate Quiz for students'

        },
        {
            title: 'Academy upgrade',
            tag: 'Update',
            image: 'https://tinyurl.com/388akrfe',
            path:'#',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'


        }
    ]

    return (
        <>
            

            <DashboardHeader Logout={Logout} authData={authData}/>


            <DashboardSidebar />


            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">

            {/* Card Blog */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <p className='md:text-3xl max-sm:text-2xl sm:text-2xl font-semibold'>Academy</p><br />
                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card */}
                    {events.map((val, idx) => {


                        return (<div key={idx} className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl">
                            <div className="h-52 flex flex-col justify-center items-center bg-[#001219] rounded-t-xl">

                                <svg className="size-28" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="56" height="56" rx="10" fill="white" />
                                    <path d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z" fill="url(#paint0_linear_2204_541)" />
                                    <path d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z" fill="#2684FF" />
                                    <defs>
                                        <linearGradient id="paint0_linear_2204_541" x1="24.734" y1="29.2284" x2="16.1543" y2="44.0429" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#0052CC" />
                                            <stop offset="0.92" stopColor="#2684FF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
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
                                <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-gray-500 text-gray-100 shadow-2xs hover:bg-gray-600 focus:outline-hidden focus:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none" href={val.path}>
                                    Generate
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