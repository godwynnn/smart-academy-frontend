import React, { createContext, useContext, useState,useEffect,useRef } from 'react';
import { w3cwebsocket } from 'websocket';
import { Urls } from '../utils/urls';
import { ChatAction } from '../reducer/reducer.';
import { useDispatch } from 'react-redux';
import { ChatReducer } from '../reducer/reducer.';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export const ChatContext=createContext()


const url = Urls()
export const ChatProvider=({children})=>{
    const [roomName, setRoomName] = useState(null)
    const dispatch=useDispatch()
    const chatData=useSelector((state)=>state.chatreducer)
    const ws = useRef(null)
    const router=useRouter()



    const fetchRoomName=()=>{
         fetch(url.entry).then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
        
        
                }).then((data) => {
                    setRoomName(data)
                }).catch(error => {
                    // Handle any errors during the fetch operation
                    console.error('Error fetching data:', error);
                });
        
    }

   
    

    const SendChatData = (e,prompt_type) => {
        console.log(prompt_type, roomName)
        
        e.preventDefault()
        dispatch(ChatAction.SetQuestionData({...chatData, 
                            'loading': true, 
                            'relayed': false,
                            'prompt_type':prompt_type }))
        ws.current.send(
            JSON.stringify({
                'message': chatData,
                'username': 'a@gmail.com',
                'generate_id': roomName.room_name
            })
        )
    }


    
    
    // WEBSOCKET

    useEffect(()=>{
        if (roomName?.room_name) {
            console.log(roomName.room_name)
            ws.current = new w3cwebsocket(`${url.ws_url}${roomName.room_name}/`)

            ws.current.onopen = () => {
                console.log('open')
            }
            ws.current.onmessage = (event) => {
                const message=JSON.parse(event.data)
                console.log(message)
             
                if (message.type === 'chat_message' || 'chat_history') {
                    dispatch(ChatAction.SetQuestionData({ ...chatData, 'relayed': true,'data':message,'from_ws':true }))
                    if(message.sent_by === 'user'){
                        router.push(`question/c/${roomName.room_name}`)
                    }
                    
                    
                }

            }
        }
    },[roomName])


    const startSocketConnection=()=>{
        
        
    }
    


    


    return(
        <ChatContext.Provider value={{SendChatData,fetchRoomName,roomName,startSocketConnection,setRoomName}}>
            {children}
        
        </ChatContext.Provider>
    )
}