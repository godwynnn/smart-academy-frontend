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
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const authData = useSelector((state) => state.authreducer)





  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await GetAllQuestions(5, 0, params.query)

      if (res.data == '[]') {
        setData(res.data)
      } else {
        const result = []
        res.data.forEach((val, idx) => {

          if (val.questions.length > 0) {
            result.push(val)
          }
        })

        setData(result)
        setLoading(false)

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
        <div className=" md:p-12 sm:p-1 max-sm:p-1 flex justify-center items-center   ">

          {loading ?
            <div class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div>
            :


            <div className="h-[80vh] space-y-4  overflow-y-auto  rounded-lg bg-white w-[100%] [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100 [&amp;::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
              {params.query == 'question' ?
                <p className='text-3xl font-semibold px-3 pt-5' >Student Quiz</p >
                :
                <p className='text-3xl font-semibold px-3 pt-5' >Lesson Plan</p >
              }

              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className={[`${data.length===0?'':'border border-gray-200 rounded-lg shadow-xs'}  overflow-hidden`]}>

                      {data.length === 0 ?
                        <p className=' text-center text-4xl '>No content</p>

                        :
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date Created</th>
                              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                          </thead>



                          <tbody className="divide-y divide-gray-200">



                            {data.map((val, idx) => {
                              return (


                                <tr key={idx} className='font-semibold dark:text-white hover:bg-gray-200'>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                    <Link key={idx} href={`/academy/${params.query}/c/${val.id_tag}`} className='flex items-center gap-2'>
                                      <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                      {val['questions'][0].question}
                                    </Link>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">null</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                                  </td>

                                </tr>



                              )
                            })}





                          </tbody>
                        </table>

                      }
                    </div>
                  </div>
                </div>
              </div>






              <div ref={ref}>

              </div>

            </div>

          }
        </div>




      </div>
      {/* End Table Section */}

    </>
  )
}
