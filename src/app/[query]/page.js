"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { GetAllQuestions } from '@/components/server'
import { useInView } from 'react-intersection-observer'
import { Urls } from '@/utils/urls'
import Link from 'next/link'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'
import { handleLogout } from '@/components/server'
import { useDispatch } from 'react-redux'
import { AuthencticationAction } from '@/reducer/reducer.'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'



export default function Query() {

  const params = useParams()
  const { ref, inView } = useInView()
  const Entries = 5
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(Entries)
  const dispatch = useDispatch()
  const router = useRouter()
  const authData = useSelector((state) => state.authreducer)





  useEffect(() => {
    const fetchData = async () => {
      const res = await GetAllQuestions(5, 0, params.query)

      if (res.data == '[]') {
        setData(res.data)
      }else{
        const result = []
        res.data.forEach((val, idx) => {

          if (val.questions.length > 0) {
            result.push(val)
          }
      })

      setData(result)

      }
      
    }

    fetchData()

  }, [])





  const loadMoreEntries = async () => {

    const res = await GetAllQuestions(Entries, offset, params.query)
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



  return (
    <>

      <DashboardHeader authData={authData} Logout={Logout} />

      <DashboardSidebar />


      {/* Table Section */}

      <div className="w-full lg:ps-64 h-[100vh] border bg-[whitesmoke] border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
        <div className=" p-12 ">
          <div className="h-[80vh] space-y-4  overflow-y-auto  rounded-lg bg-white w-[100%] [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100 [&amp;::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
            {params.query == 'question' ?
              <p className='text-lg font-bold px-3 pt-5' >Student Quiz</p >
              :
              <p className='text-lg font-bold px-3 pt-5' >Lesson Plan</p >
            }

            <div className='flex bg-gray-200 justify-between p-3 font-semibold'>
              <p>Title</p>

              <p>Date created</p>
            </div>

            <div className=''>

              {data.length === 0 ?
                <p className=' text-center text-2xl '>No content</p>

                :
                data.map((val, idx) => {
                  return (
                    <Link key={idx} href={`/academy/${params.query}/c/${val.id_tag}`}>
                      <div className=' cursor-pointer '>
                        <h3 className="md:text-md sm:text-sm max-sm:text-sm  p-3 font-semibold dark:text-white hover:bg-gray-200 flex items-center gap-2">
                          <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                          {val['questions'][0].question}</h3>
                        {/* <p className="mt-1 text-sm/6 text-gray-600 dark:text-neutral-400 px-3">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, </p> */}
                        <hr className='text-gray-200' />
                      </div>
                    </Link>

                  )
                })
              }



            </div>



            <div ref={ref}>

            </div>

          </div>

        </div>



      </div>
      {/* End Table Section */}

    </>
  )
}
