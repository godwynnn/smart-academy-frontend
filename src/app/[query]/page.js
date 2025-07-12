"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { GetAllQuestions } from '../../components/server'
import { useInView } from 'react-intersection-observer'
import { Urls } from '../../utils/urls'
import Link from 'next/link'
import DashboardSidebar from '../../components/dashboardSidebar'


export default function Query() {

  const params = useParams()
  const { ref, inView } = useInView()
  const Entries = 5
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(Entries)





  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await GetAllQuestions(5, 0, params.query)

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



  return (
    <>


      <DashboardSidebar/>


      {/* Table Section */}

      <div className="w-full lg:ps-64 border border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
        <div className="p-8">
          <div className="max-h-100 space-y-4 pe-8 overflow-y-auto [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100 [&amp;::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">

            {data.map((val, idx) => {
              console.log(val);
              return (<div key={idx}>
                <h3 className="text-lg font-semibold dark:text-white">{val['questions'][0].question}</h3>
                <p className="mt-1 text-sm/6 text-gray-600 dark:text-neutral-400">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
              </div>)
            })}


            
<div ref={ref}>

            </div>

          </div>
          
        </div>


        
      </div>
      {/* End Table Section */}

    </>
  )
}
