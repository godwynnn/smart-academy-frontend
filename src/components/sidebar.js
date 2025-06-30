"use client"
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Urls } from '../utils/urls'
import Link from 'next/link'
import { useContext } from 'react'
import { ChatContext } from './Chatcontext'
import { useParams } from 'next/navigation'
import { GetAllQuestions } from '../components/server'
import { useInView } from 'react-intersection-observer'

const urls = Urls()
export default function Sidebar({ children }) {

    const Entries = 10
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(Entries)
    const { fetchRoomName, roomName, SendChatData, startSocketConnection, setRoomName, entry } = useContext(ChatContext)
    const params = useParams()
    const { ref, inView } = useInView()

   




    useLayoutEffect(() => {
        const fetchData = async () => {
            const res = await GetAllQuestions(10, 0, params.entry)

            const result = []
            res.data.forEach((val, idx) => {

                if (val.questions.length > 0) {
                    result.push(val)
                }
            })

            setData(result)
        }

        fetchData()

    }, [])





    const loadMoreEntries = async () => {
        
        const res = await GetAllQuestions(Entries, offset, params.entry)
        const result = []
        res.data.forEach((val, idx) => {
            console.log(val)
            if (val.questions.length > 0) {
                result.push(val)
            }
        })

        setData(prev => [...prev, ...result])
        setOffset(offset => offset + Entries)
    }





     useEffect(() => {
        if (inView) {
            loadMoreEntries()
        }
    }, [inView])

    return (
        <>
            {/* <!-- Sidebar --> */}
            <div id="hs-application-sidebar" className="hs-overlay [--auto-close:lg]
    hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform
    hidden
    fixed top-0 start-0 bottom-0 z-60
    w-64 h-full
    bg-white border-e border-gray-200
    lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
    dark:bg-neutral-900 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-label="Sidebar"
            >
                <nav className="size-full flex flex-col">
                    <div className="flex items-center pt-4 pe-4 ps-7">
                        {/* <!-- Logo --> */}
                        <a className="flex-none focus:outline-hidden focus:opacity-80" href="../templates.html" aria-label="Preline">
                            LOGO
                        </a>
                        {/* <!-- End Logo --> */}

                        <div className="hidden lg:block lg:ms-2">

                        </div>
                    </div>

                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        {/* <!-- List --> */}
                        <ul className="space-y-1.5 p-4">
                            <li>
                                <a className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300" href="#">
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                    New chat
                                </a>
                            </li>
                            {
                                data.map((val, idx) => {
                                    return (

                                   
                                            <Link key={idx} href={`/academy/${val.entry_type}/c/${val.id_tag}`}>
                                                <p className="flex items-center gap-x-3 py-2 px-3 text-[12px] text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300" >

                                                    {val['questions'][0].question}
                                                </p>
                                            </Link>

                                    





                                    )
                                })


                            }
                            <div ref={ref}>
                                                
                                            </div>

                            <li>

                            </li>

                        </ul>
                        {/* <!-- End List --> */}
                    </div>

                    {/* <!-- Footer --> */}
                    <div className="mt-auto">
                        <div className="py-2.5 px-7">
                            <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                                <span className="block size-1.5 rounded-full bg-green-600"></span>
                                Active 1000 people
                            </p>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
                            <a className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"  href="#">
                                Sign in
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
                            </a>
                        </div>
                    </div>
                    {/* <!-- End Footer --> */}
                </nav >
            </div >

            {children}


                 

        </>
    )
}
