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
import {HeroNavbar} from '../../../../../components/HeroNavbar'
import { Urls } from '../../../../../utils/urls';
import Navbar from '../../../../../components/Navbar'

const url = Urls()
export default function Chat() {

  const dispatch = useDispatch()
  const chatData = useSelector((state) => state.chatreducer)
  const ws = useRef(null)
  const router = useRouter()
  const params = useParams()
  const { fetchRoomName, roomName, SendChatData, startSocketConnection, setRoomName, setEntry } = useContext(ChatContext)


  const ExportToGoogleForm = (e) => {
    e.preventDefault()
    fetch(`${url.export_to_form}/${params.id}/`)
      .then((res) => { return res.json() })
      .then(data => {

        window.open(data.url, '_blank', 'noopener noreferrer');
      }
      )

  }


  useEffect(() => {


    setRoomName({ 'room_name': params.id })



  }, [params.id])



  return (
    <Sidebar>

      {/* <!-- Content --> */}
      <div className="relative h-screen w-full lg:ps-64">
        <Navbar/>

       
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
          <QuestionComponent chatData={chatData} />
          :
          <LessonComponent chatData={chatData} />
        }



        <div className="hs-dropdown inline-flex fixed  bottom-5 right-9">
          <button id="hs-dropdown-default" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            Export
            <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-default">
            <div className="p-1 space-y-0.5">

              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" onClick={(e) => ExportToGoogleForm(e)} href='#'>
                Google Form
              </a>
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                As PDF
              </a>
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                Team Account
              </a>


            </div>
          </div>
        </div>




        {/* <button type="button" className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>
        <span>Sidebar</span>
      </button> */}


        {/* <div id="hs-application-sidebar-backdrop" data-hs-overlay-backdrop-template="" style={{zIndex:59}} className="hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900/50 dark:bg-neutral-900/80 "></div> */}





      </div>
    </Sidebar>
  )
}