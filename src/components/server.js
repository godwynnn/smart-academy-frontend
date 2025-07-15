"use server"
import { Urls } from "../utils/urls"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthencticationAction } from "../reducer/reducer."

const urls = Urls()
export const GetAllQuestions = async (limit, offset, id) => {
    const token =  (await cookies()).get('access_token')?.value  || null
    console.log('auth ', token)
    const res = await fetch(`${urls.questions}/?limit=${limit}&offset=${offset}&q=${id}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    // console.log(res.json())
    const responseData = await res.json();
    if (res.ok) {

      
        return responseData

    } else {

        return responseData
    }

}






export const handleLogin = async (data) => {

    const response = await fetch(urls.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (!response.ok) {

      
        return responseData

    } else {



        if (response.status == 200) {

            (await cookies()).set('access_token', responseData.token.access, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 30*30
            })
            return responseData

        }


    }


}






export const handleLogout=async ()=>{
    const token =  (await cookies()).get('access_token')?.value  || null
    

    const res=await fetch(urls.logout,{
        method: 'GET',
        
        headers: {
            'Authorization': `Bearer ${token}`,
            
        }, 
    })
    
    const data=await res.json()
    if (!res.ok){
        return data
    }else{
        (await cookies()).delete('access_token')
        return data
    }


}