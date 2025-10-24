export const Urls=()=>{
    var url='http://127.0.0.1:8000/'
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'prod'){
        url='https://smart-academy-ujq0.onrender.com/'
        
        
    }
    

    return{
        ws_url:'ws://127.0.0.1:8000/ws/chat/',
        entry:`${url}entry/`,
        questions:`${url}questions`,
        export_to_form:`${url}export/form`,
        login:`${url}auth/login/`,
        register:`${url}auth/register/`,
        logout:`${url}auth/logout/`,
        google:`${url}auth/verify/social/google-oauth2/`,
        schedule_virtual_class:`${url}teacher/schedule/class/`,
        create_question:`${url}question/create/`,
        get_question:`${url}question`


        

    }
}