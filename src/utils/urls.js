export const Urls=()=>{
    const url='http://127.0.0.1:8000/'
    // const url='https://smart-academy-ujq0.onrender.com/'

    return{
        ws_url:'wss://127.0.0.1:8000/ws/chat/',
        entry:`${url}entry/`,
        questions:`${url}questions`,
        export_to_form:`${url}export/form`,
        login:`${url}auth/login/`,
        register:`${url}auth/register/`,
        logout:`${url}auth/logout/`,
        google:`${url}auth/verify/social/google-oauth2/`
        


    }
}