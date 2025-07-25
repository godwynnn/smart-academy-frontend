"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Urls } from '@/utils/urls'
import { handleLogin } from '@/components/server'
import { useRouter } from 'next/navigation'
import { AuthencticationAction } from '@/reducer/reducer.'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { handleSocialLogin } from '@/components/server'

const url = Urls()
export default function Login() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const authData = useSelector(state => state.authreducer)
  const router = useRouter()

  const sendLoginData = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await handleLogin(data)





    

    if (response.logged_in === true) {
      toast.success(response.message, {
      theme: "light",
      
    })
      dispatch(AuthencticationAction.Login({
        ...authData,
        'token': response.token,
        'data': response.data

      }))

      setLoading(false)

      router.push('/dashboard')
    } else {
      toast.warn(response.message, {
      theme: "light",
      
    })
      setLoading(false)
      console.log('faled')
    }




  }

  // GOOGLE SOCIAL AUTHENTICATION



  useGoogleOneTapLogin({
  onSuccess: credentialResponse => {
    console.log(credentialResponse);
  },
  onError: () => {
    console.log('Login Failed');
  },
});





const GoogleLogin = useGoogleLogin({
  onSuccess: async(tokenResponse) => {
    const res=await handleSocialLogin(tokenResponse)
    if (res.logged_in === true) {
      toast.success(res.message, {
      theme: "light",
      
    })
      dispatch(AuthencticationAction.Login({
        ...authData,
        'token': res.token,
        'data': res.data

      }))

      setLoading(false)

      router.push('/dashboard')
    } else {
      toast.warn(res.message, {
      theme: "light",
      
    })
      setLoading(false)
      console.log('faled')
    }
  },
});









  return (
    <div className='flex min-h-[100vh] justify-center items-center bg-[#001219]'>
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs lg:w-[30%] md:w-[40%] sm:w-[50%] max-sm:w-[80%]">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account yet?
              <Link className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="/auth/register">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button type="button" onClick={()=>GoogleLogin()} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
              <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
              </svg>
              Sign in with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

            {/* Form */}
            <form onSubmit={e => { sendLoginData(e) }}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                  <div className="relative">
                    <input type="email" id="email" name="email" onChange={e => { setData({ ...data, 'email': e.target.value }) }} className="py-2.5 sm:py-3 px-4 block w-full border-gray-300  border-b-1 outline-0  sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <label htmlFor="password" className="block text-sm mb-2">Password</label>
                    <Link className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <input type="password" id="password" name="password" onChange={e => { setData({ ...data, 'password': e.target.value }) }} className="py-2.5 sm:py-3 px-4 block w-full border-gray-300  border-b-1 outline-0 sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error" />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                </div>
                {/* End Form Group */}

                {/* Checkbox */}
                <div className="flex items-center">
                  <div className="flex">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500" />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm">Remember me</label>
                  </div>
                </div>
                {/* End Checkbox */}

                {loading ?
                  <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-white hover:bg-gray-400 focus:outline-hidden focus:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none">
                    <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-gray-100 rounded-full" role="status" aria-label="loading">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                  :
                  <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Sign in
                  </button>

                }
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>

    </div>
  )
}
