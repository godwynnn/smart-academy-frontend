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
import QuestionComponent from '../../../../../components/question'
import LessonComponent from '../../../../../components/lesson'


export default function Chat() {

  const dispatch = useDispatch()
  const chatData = useSelector((state) => state.chatreducer)
  const ws = useRef(null)
  const router = useRouter()
  const params = useParams()
  const { fetchRoomName, roomName, SendChatData, startSocketConnection, setRoomName,setEntry } = useContext(ChatContext)


 
  useEffect(() => {


    setRoomName({ 'room_name': params.id })

    // console.log(chatData)

  }, [params.id])
  


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


        
        {params.entry === 'question' ?
          <QuestionComponent chatData={chatData}/>
        :
        <LessonComponent chatData={chatData}/>
        }
        
        
        
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
