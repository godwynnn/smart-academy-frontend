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



const State = {
    accessToken: null,
    date_exp: null,
    logged_in: false,
    email: '',
    is_admin: false,
    is_superuser:false,
    email: '',
    first_name: '',
    curr_package: null,
    is_subscribed: false,
    last_name: '',
    id: null,

    subscription_type: null

}

export const AuthenticationSlice = createSlice({
    name: 'auth',
    initialState: State,

    reducers: {
        Login: (state, action) => {
            // console.log('dispatch values', action.payload)
            state.logged_in = true
            state.email = action.payload.data.email
            state.accessToken = action.payload.data.token
            // state.date_exp = action.payload.expiry
            state.first_name = action.payload.data.first_name
            state.last_name = action.payload.data.last_name
            // state.curr_package = action.payload.data.user.current_subscription
            state.id = action.payload.data.id


            if (action.payload.is_staff === true) {
                state.is_admin = true
            }else if(action.payload.is_superuser=== true){
                state.is_admin = true
                state.is_superuser = true
            } else {
                state.is_admin = false
            }



        },

        Logout: (state, action) => {

            console.log('logged out')
            state.logged_in = false
            state.email = ''
            state.refreshToken = null
            state.accessToken = null

        }
    }
})


export const { actions: AuthencticationAction, reducer: AuthenticationReducer } = AuthenticationSlice
