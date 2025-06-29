"use server"
import { Urls } from "../utils/urls"


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

