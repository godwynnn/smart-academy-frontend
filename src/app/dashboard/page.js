'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import DashboardSidebar from '@/components/DashboardSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { AuthencticationAction, AuthenticationReducer } from '@/reducer/reducer.'
import { handleLogout } from '@/components/server'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import DashboardHeader from '@/components/DashboardHeader'
import Link from 'next/link'
import Chart from 'react-apexcharts'
import { PopupModal } from "react-calendly";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function Dashboard() {
    const authData = useSelector((state) => state.authreducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const rootRef = useRef(document.getElementById("root")); // Or whatever your main app div id is
    const [rootElement, setRootElement] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [scheduleData,setScheduleData]=useState({
        'date':'',
        'start':'',
        'end':''
    })
    const slideRef=useRef([])
    const toggleBtnRef1=useRef([])
    const toggleBtnRef2=useRef([])



    useEffect(() => {
        setRootElement(document.getElementById("__next") || document.body); // runs only on client
        setIsOpen(false)
       
    }, []);
    console.log(scheduleData)


    const ChartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };


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

    
    

    const events = [
        {
            title: 'STEM 2025',
            tag: 'stem',
            image: 'https://tinyurl.com/ey7pf949',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'

        },

        {
            title: 'Tech Expo 25',
            tag: 'Tech expo',
            image: 'https://tinyurl.com/54rxcd7r',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'

        },
        {
            title: 'Academy upgrade',
            tag: 'Update',
            image: 'https://tinyurl.com/388akrfe',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate vel rerum accusamus facere neque'


        }
    ]


    if (!rootElement) return null;
    return (
        <>
            <PopupModal
                url="https://calendly.com/miraclegodwin67/30min"
                //   pageSettings={this.props.pageSettings}
                //   utm={this.props.utm}
                //   prefill={this.props.prefill}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                /*
                 * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                 * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                 */
                rootElement={rootElement}
            />



            <div id="hs-scale-animation-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-scale-animation-modal-label">
                <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
                    <div className="w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
                        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
                            <h3 id="hs-scale-animation-modal-label" className="font-bold text-gray-800">
                                Schedule Lesson With Google Meet
                            </h3>
                            <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        'DatePicker',
                                        'MobileDatePicker',
                                        'DesktopDatePicker',
                                        'StaticDatePicker',
                                        'TimePicker',
                                        'MobileTimePicker',
                                        'DesktopTimePicker',
                                        'StaticTimePicker',
                                    ]}
                                >
                                    {/* Slider */}
                                    <div data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-2 border border-gray-400 rounded-full cursor-pointer"
  }' className="relative">
                                        <div className="hs-carousel relative overflow-hidden w-full min-h-[90vh] bg-white rounded-lg">
                                            <div ref={slideRef} className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                                                <div className="hs-carousel-slide" >
                                                    <div className="flex justify-center h-full w-full bg-gray-100 p-0">



                                                        <DemoItem label=" ">
                                                            <StaticDatePicker 
                                                            onAccept={e=>{setScheduleData(prev=>({...prev,'date':`${e.year()}-${e.month()}-${e.date()}`}))
                                                            
                                                            slideRef.current.children[0].classList.remove('active')
                                                            slideRef.current.children[1].classList.add('active')
                                                            slideRef.current.style.transform="translate(-454.1px, 0px)"
                                                            toggleBtnRef1.current.classList.remove('disabled')
                                                            toggleBtnRef2.current.classList.add('disabled')
                                                            toggleBtnRef2.current.disabled=true
                                                            toggleBtnRef2.current.disabled=false

                                                            }} className='w-full' defaultValue={dayjs('2022-04-17')} />
                                                        </DemoItem>



                                                    </div>
                                                </div>



                                                <div className="hs-carousel-slide" >
                                                    <div className="flex flex-col gap-5 h-full bg-gray-200 p-6">
                                                        <div className="space-y-3 w-[100%] flex flex-col items-center">
                                                            <input type="text" className="py-2.5 border sm:py-3 px-4 block w-[100%]  border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Meeting Title" />
                                                        </div>


                                                        <DemoItem label="Start Time">
                                                            <TimePicker ampm={true}  onAccept={e=>{
                                                                setScheduleData(prev=>({...prev,"start":`${e.hour()}:${e.minute()}`}))}} defaultValue={dayjs('2022-04-17T15:30')} />
                                                        </DemoItem>

                                                        <DemoItem label="End Time">
                                                            <TimePicker ampm={true}  onAccept={e=>{
                                                                console.log(e)
                                                                setScheduleData(prev=>({...prev,"end":`${e.hour()}:${e.minute()}`}))}} defaultValue={dayjs('2022-04-17T15:30')} />
                                                        </DemoItem>


                                                        <button type="button" className="py-2 px-3  items-center gap-x-2 text-sm  text-center font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                                            Schedule
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <button ref={toggleBtnRef1} type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default relative top-1/2 right-0 start-2 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2 focus:outline-hidden">
                                            <span className="text-2xl" aria-hidden="true">
                                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m15 18-6-6 6-6"></path>
                                                </svg>
                                            </span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                        <button ref={toggleBtnRef2} type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default relative top-1/2 end-2 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2 focus:outline-hidden">
                                            <span className="sr-only">Next</span>
                                            <span className="text-2xl" aria-hidden="true">
                                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </span>
                                        </button>

                                    </div>
                                    {/* End Slider */}
                                </DemoContainer>
                            </LocalizationProvider>

                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-scale-animation-modal">
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div >


            <DashboardHeader Logout={Logout} authData={authData} setIsOpen={setIsOpen} />


            <DashboardSidebar />



            {/* Content */}
            <div className="w-full lg:ps-64" id='root'>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">


                    {/* Card Section */}
                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/lesson">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Lessons Plans
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 4 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* End Card */}

                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="/question">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Your Quizzes
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 26 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* End Card */}

                            {/* Card */}
                            <Link className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition" href="#">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center gap-x-3">
                                        <div className="grow">
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                Arts & Entertainment
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {/* 9 job positions */}
                                            </p>
                                        </div>
                                        <div>
                                            <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* End Card */}




                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Card Section */}





                    {/* Card */}
                    <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">

                        <div className="flex flex-wrap justify-between items-center gap-2">
                            <div>
                                <h2 className="text-sm text-gray-500">
                                    Visitors
                                </h2>
                                <p className="text-xl sm:text-2xl font-medium text-gray-800">
                                    80.3k
                                </p>
                            </div>

                            <div>
                                <span className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800">
                                    <svg className="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                                    2%
                                </span>
                            </div>
                        </div>

                        <div id="hs-single-area-chart">

                            <Chart
                                options={ChartData.options}
                                series={ChartData.series}
                                type="bar"
                                width="100%"
                                height={600}
                            />

                        </div>
                    </div>
                    {/* End Card */}





                    {/* Card Blog */}
                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <p className='md:text-3xl max-sm:text-2xl sm:text-2xl font-semibold'>Event&Updates</p><br />
                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card */}
                            {events.map((val, idx) => {


                                return (<div key={idx} className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl">
                                    <div className="h-52 flex flex-col justify-center items-center bg-[#001219] rounded-t-xl">
                                        <Image src={val.image} className='w-[80%] h-full' width={1000} height={1000} alt='events-img' />
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                                            {val.tag}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {val.title}
                                        </h3>
                                        <p className="mt-3 text-gray-500">
                                            {val.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
                                        <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-gray-500 text-gray-100 shadow-2xs hover:bg-gray-300 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                                            Coming Soon
                                        </Link>
                                        {/* <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
          View API
        </Link> */}
                                    </div>
                                </div>)

                            })}
                            {/* End Card */}


                            {/* End Card */}
                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Card Blog */}
                </div>
            </div>


        </>
    )
}

export default Dashboard