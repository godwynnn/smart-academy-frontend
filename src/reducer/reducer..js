import { createSlice } from "@reduxjs/toolkit";

const chatState={
    subject:null,
    no_questions:1,
    class:null,
    loading:false,
    relayed:null,
    prompt_type:'question',
    data:[],
}


export const ChatSlice=createSlice({
    name:'chat',
    initialState:chatState,
    reducers:{
        SetQuestionData:(state,action)=>{
            console.log(action)
            state.subject=action.payload.subject
            state.no_questions=action.payload.no_questions
            state.class=action.payload.class
            state.loading=action.payload.loading
            state.relayed=action.payload.relayed
            state.prompt_type=action.payload.prompt_type
            if (action.payload.from_ws === true){
                state.data=[action.payload.data]
            }
            
        }
    }
})


export const { actions: ChatAction, reducer: ChatReducer } = ChatSlice