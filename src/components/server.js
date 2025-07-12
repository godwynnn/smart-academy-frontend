"use server"
import { Urls } from "../utils/urls"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthencticationAction } from "../reducer/reducer."

const urls = Urls()
export const GetAllQuestions = async (limit, offset,id) => {
    const res = await fetch(`${urls.questions}/?limit=${limit}&offset=${offset}&q=${id}`)
    // console.log(res.json())
    if (res.status === 200) {
        const data = await res.json()
        
        return data
        
    } else {
      
        throw new Error(`HTTP error! status: ${res.status}`);
    }

}



export const handleLogin=async (data)=>{

    

   
    const response = await fetch(urls.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    if (!response.ok) {
            return response
            
        }

        const responseData = await response.json();
        // console.log('Success:', responseData.logged_in);
        (await cookies()).set('access_token',responseData.token.access,{
          httpOnly:true,
          secure:true,
          path:'/',
          maxAge:30*30
        })

        return responseData
       
        // redirect('/dashboard')
         
        
        
        


  }