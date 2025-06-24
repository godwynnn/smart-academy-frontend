"use client"
import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ChatReducer } from '../../../../../reducer/reducer.'
import { ChatAction } from '../../../../../reducer/reducer.'
import { useRouter } from 'next/navigation';
import Sidebar from '../../../../../components/sidebar'
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ChatContext } from '../../../../../components/Chatcontext'



export default function Chat() {

  const dispatch = useDispatch()
  const chatData = useSelector((state) => state.chatreducer)
  const ws = useRef(null)
  const router = useRouter()
  const params = useParams()
  const { fetchRoomName, roomName, SendChatData, startSocketConnection, setRoomName } = useContext(ChatContext)


  useEffect(() => {


    setRoomName({ 'room_name': params.id })

    console.log(chatData)

  }, [])



  return (
    <Sidebar>

      {/* <!-- Content --> */}
      <div className="relative h-screen w-full lg:ps-64">
        <div className="py-10 lg:py-14">
          {/* <!-- Title /--> */}
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Welcome to Smart Academy
            </h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Your AI-powered Educator
            </p>
          </div>
        </div>
        {/* <!-- End Title --> */}


        {chatData.data.map((val, idx) => {
          return (
            val.type === 'chat_message' ?

              (
                val.sent_by === 'user' ?
                  <li className="py-2 sm:py-4">
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                      <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">You</span>
                        </span>

                        <div className="grow mt-2 space-y-3">
                          <p className="text-gray-800 dark:text-neutral-200 text-2xl font-bold">
                            {val.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  :
                  val.sent_by === 'ai' ?
                    <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                      <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                        <span className="text-sm font-medium text-white">SAi</span>
                      </span>



                      <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3" >
                        {/* <!-- Card --> */}
                        {val.message.quiz.map((val, idx) => {
                          return (<div className="space-y-3" key={idx}>
                            <p className="text-1xl  text-gray-800 dark:text-white">
                              {val.question}
                            </p>

                            {val.options.map((option, idx) => {
                              return (<p className="text-sm text-gray-800 dark:text-white" key={idx}>
                                {option}
                              </p>)
                            })}

                            <p className="text-sm font-bold text-gray-800 dark:text-white">
                              Answer: {val.answer}
                            </p>

                          </div>)

                        })


                        }
                        {/* <!-- End Card --> */}

                        {/* <!-- Button Group --> */}
                        <div>
                          <div className="sm:flex sm:justify-between">
                            <div>
                              <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                                <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
                                </button>
                                <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" /></svg>
                                </button>
                              </div>
                              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" /></svg>
                                Copy
                              </button>
                              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                                Share
                              </button>
                            </div>

                            <div className="mt-1 sm:mt-0">
                              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                                New answer
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <!-- End Button Group --> */}
                      </div>

                    </li>
                    :
                    <p>loading</p>

              )
              :

              (val.messages.map((val, idx) => {

                return (
                  <li className="py-2 sm:py-4" key={idx}>
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                      <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">You</span>
                        </span>

                        <div className="grow mt-2 space-y-3">
                          <p className="text-gray-800 dark:text-neutral-200 text-2xl font-semibold">
                            {val.question}
                          </p>
                        </div>
                      </div>


                      <div className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">SAi</span>
                        </span>


                        <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3" >
                        {val.answer.quiz.map((val, idx) => {
                          return (<div className="space-y-3" key={idx}>
                            <p className="text-1xl  text-gray-800 dark:text-white">
                              {val.question}
                            </p>

                            {val.options.map((option, idx) => {
                              return (<p className="text-sm text-gray-800 dark:text-white" key={idx}>
                                {option}
                              </p>)
                            })}

                            <p className="text-sm font-bold text-gray-800 dark:text-white">
                              Answer: {val.answer}
                            </p>

                          </div>)

                        })

                        }

                        </div>

                      </div>

                    </div>
                  </li>




                )
              })

              )


          )
        })}
        {/* <!-- Chat Bubble --> */}

        {/* <!-- End Chat Bubble --> */}


        {/* <!-- Chat Bubble --> */}

        {/* <!-- End Chat Bubble --> */}





        {/* <button type="button" className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>
        <span>Sidebar</span>
      </button> */}


        {/* <div id="hs-application-sidebar-backdrop" data-hs-overlay-backdrop-template="" style={{zIndex:59}} className="hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900/50 dark:bg-neutral-900/80 "></div> */}





      </div>
    </Sidebar>
  )
}
