import React from 'react'
import Markdown from 'react-markdown'
export default function LessonCompnent({chatData}) {
  return (
    <>
    {chatData.data.map((val, idx) => {
          return (
            val.type === 'chat_message' ?

              (
                val.sent_by === 'user' ?
                  <li className="py-2 sm:py-4" key={idx}>
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
                    <li className="max-w-4xl py-4 px-2 sm:px-2 lg:px-2 mx-auto flex gap-x-2 sm:gap-x-4" key={idx}>
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


                      <div className="max-w-4xl py-5 px-2 sm:px-2 lg:px-2 mx-auto flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">SAi</span>
                        </span>


                        <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3" >
                        {val.answer != null?
                          <div className="space-y-3" key={idx}>
                              <Markdown>{val.answer}</Markdown>
                          </div> 
                        :
                        <p>loading...</p>
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
    </>
  )
}
