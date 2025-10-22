import React from 'react'

function QuestionComponent({chatData}) {
  return (
    <>
    {chatData.data.questions.map((val, idx) => {
      console.log(val)
          return (
            

              
                
              
                  <li className="py-2 sm:py-4" key={idx}>
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                      <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">You</span>
                        </span>

                        <div className="grow mt-2 space-y-3">
                          <p className="text-gray-800 dark:text-neutral-800 text-2xl font-semibold">
                            {val.question}
                          </p>
                        </div>
                      </div>


                      <div className="max-w-4xl py-4 px-2 sm:px-2 lg:px-2 mx-auto flex gap-x-2 sm:gap-x-4">
                        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                          <span className="text-sm font-medium text-white">SAi</span>
                        </span>


                        <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3" >
                        {val.answer != null?
                       
                          <div className="space-y-3" key={idx}>
                            <p className="text-1xl  text-gray-800 dark:text-neutral-800">
                              {val.question}
                            </p>
                            
                            {val.options.map((option, idx) => {
                              console.log(val)
                              return (<p className="text-sm text-gray-800 dark:text-neutral-800" key={idx}>
                                {option}
                              </p>)
                            })}

                            <p className="text-sm font-bold text-gray-800 dark:text-neutral-800">
                              Answer: {val.answer}
                            </p>

                          </div>

                  
                        :
                        <p>loading...</p>
                        }
                        </div>

                      </div>

                    </div>
                  </li>





              


          )
        })}
    </>
  )
}

export default QuestionComponent