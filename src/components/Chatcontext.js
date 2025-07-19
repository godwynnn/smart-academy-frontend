import React, { createContext, useContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import { Urls } from '../utils/urls';
import { ChatAction } from '../reducer/reducer.';
import { useDispatch } from 'react-redux';
import { ChatReducer } from '../reducer/reducer.';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

export const ChatContext = createContext()


const url = Urls()
export const ChatProvider = ({ children }) => {
    const [roomName, setRoomName] = useState(null)
    const [entry, setEntry] = useState('')
    const dispatch = useDispatch()
    const chatData = useSelector((state) => state.chatreducer)
    const authData = useSelector((state) => state.authreducer)
    const ws = useRef(null)
    const router = useRouter()
    const params = useParams()


    // console.log(authData)

    const fetchRoomName = () => {

        fetch(url.entry, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData.accessToken.access}`,
            },
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res)
                throw new Error(`HTTP error! status: ${res.status}`);
            }


        }).then((data) => {
            setRoomName(data)
        }).catch(error => {
            // Handle any errors during the fetch operation
            console.error('Error fetching data:', error);
        });

    }




    const SendChatData = (e, prompt_type) => {
        // console.log(prompt_type, roomName)

        e.preventDefault()
        // dispatch(ChatAction.SetQuestionData({
        //     ...chatData,
        //     'loading': true,
        //     'relayed': false,
        //     'prompt_type': prompt_type
        // }))
        ws.current.send(
            JSON.stringify({
                'message': chatData,
                'username': 'a',
                'generate_id': roomName.room_name,
                'prompt_type': prompt_type
            })
        )
    }




    // WEBSOCKET


    useLayoutEffect(() => {
        if (roomName?.room_name) {
            ws.current = new w3cwebsocket(`${url.ws_url}${roomName.room_name}/?token=${authData.accessToken.access}`)

            ws.current.onopen = () => {
                console.log('open')
            }
            ws.current.onmessage = (event) => {

                const message = JSON.parse(event.data)
                console.log('Chat message ', message)

                if (message.type == 'chat_message') {
                    if (message.sent_by == 'user') {
                        console.log('ok')

                        dispatch(ChatAction.SetQuestionData({ 'relayed': false, 'data': message, 'from_ws': true, 'loading': false, }))
                        router.push(`${params.entry}/c/${roomName.room_name}`)

                    }

                    else {
                        console.log('before ', chatData)
                        dispatch(ChatAction.SetQuestionData({ 'relayed': true, 'data': message, 'from_ws': true, 'loading': false, }))

                    }


                }
                else {
                    dispatch(ChatAction.SetQuestionData({ 'relayed': true, 'data': message, 'from_ws': true, 'loading': false, }))

                }



            }
        }
    }, [roomName])
    // console.log(roomName)


    const startSocketConnection = () => {


    }






    return (
        <ChatContext.Provider value={{ SendChatData, fetchRoomName, roomName, startSocketConnection, setRoomName, setEntry, entry }}>
            {children}

        </ChatContext.Provider>
    )
}