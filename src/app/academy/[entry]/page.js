"use client"
import React, { useRef, useEffect, useState, useCallback, useLayoutEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import { w3cwebsocket } from 'websocket';
import { Urls } from '@/utils/urls'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChatAction } from '@/reducer/reducer.';
import { ChatContext } from '@/components/Chatcontext';
import { useParams } from 'next/navigation';
import Link from 'next/link';




const url = Urls()
export default function Question() {
    const classes = ['jss1', 'jss2', 'jss3', 'sss1', 'sss2', 'sss3']
    const classRef = useRef([])
    const socketRef = useRef(null);
    const params = useParams()


    const chatData = useSelector((state) => state.chatreducer)
    const dispatch = useDispatch()
    const prompt_type = params.entry
    const { fetchRoomName, roomName, SendChatData, startSocketConnection, setEntry } = useContext(ChatContext)
    const [class_no, setClassData] = useState('')

    // const [data, setChatData] = useState({
    //     'subject': '',
    //     'no_questions': 1,
    //     'class': '',
    //     'prompt_type': 'question',
    //     'relayed': null,
    //     'loading': false
    // })

    // useLayoutEffect(() => {

    //     classRef.current.forEach((ref, idx) => {
    //         if (ref) {
    //             ref.addEventListener('click', (val) => {

    //                 dispatch(ChatAction.SetQuestionData({ ...chatData, 'class': val.target.innerText }))
    //             });
    //         }
    //     })

    // }, [])




    // Sockect
    useEffect(() => {
        startSocketConnection()

    }, [roomName])



    // Get room Name id
    useLayoutEffect(() => {
        setEntry(params.entry)
        fetchRoomName()
    }, [])














    return (



        <div className="h-screen flex flex-col pb-6">
            <div className="h-full flex flex-col justify-center">
                <div className="-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-center items-center">

                        <Link className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="../templates.html" aria-label="Preline">
                            LOGO
                        </Link>

                        <div className="ms-2">

                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                        Welcome to Smart Academy
                    </h1>
                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                        Get Smart, all about Education
                    </p>
                </div>


                <form onSubmit={(e) => { (SendChatData(e, prompt_type)) }} className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <input type="text"
                            required
                            value={chatData.subject ||""}
                            onChange={e => dispatch(ChatAction.SetQuestionData({ ...chatData, 'subject': e.target.value }))}
                            className="p-3 sm:p-4 block w-full border-gray-200 border-1 rounded-full sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Topic or Subject" />


                        <div className="absolute top-1/2 end-2 -translate-y-1/2">
                            {/* <button type="button" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                            </button> */}
                            <button type="button" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:bg-neutral-800 dark:hover:text-white dark:focus:text-white">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                            </button>
                        </div>
                    </div>


                    {prompt_type == 'question' ?
                        <div className="w-full h-[30%] flex justify-between items-center mt-5 border-1 border-gray-200 rounded-full  relative">
                            <input placeholder='Number of questions'
                                required
                                value={chatData.no_questions ||""}
                                onChange={e => dispatch(ChatAction.SetQuestionData({ ...chatData, 'no_questions': e.target.value }))}
                                className="w-full p-0 h-full bg-transparent rounded-full px-3 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" type="number" aria-roledescription="Number field" data-hs-input-number-input="" />
                            <div className="flex justify-end items-center gap-x-1.5 absolute top-1/2 end-2 -translate-y-1/2">
                                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
                                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                    </svg>
                                </button>
                                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex="-1" aria-label="Increase" data-hs-input-number-increment="">
                                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5v14"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        :
                        ''

                    }
                    {/* Select */}
                    <div className='mt-4'>

                        <select
                            onChange={e => dispatch(ChatAction.SetQuestionData({ ...chatData, 'class': e.target.value }))}
                            value={chatData.class}
                            data-hs-select='{
                        "placeholder": "Select Class...",
                        "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "dropdownVerticalFixedPlacement": "bottom",
                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 dark:text-blue-500 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                        "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                        }' className="hidden">
                            <option value="">Choose</option>


                            {classes.map((val, i) => (
                                <option
                                    key={i}
                                    value={val}

                                    // ref={el => { classRef.current[i] = el }}
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End Select */}



                    {!chatData.loading ?
                        <button type="submit" className="py-3 px-4  flex  mt-2 w-full text-center items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50  dark:bg-white dark:text-neutral-800">
                            Send

                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>

                        </button>
                        :

                        <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-white hover:bg-gray-400 focus:outline-hidden focus:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none">
                            <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-gray-100 rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>

                    }

                </form>

            </div>

            <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs text-gray-600 dark:text-neutral-500">© 2025 Smart Academy</p>
            </footer>
        </div>


    )
}
