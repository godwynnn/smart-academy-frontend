"use client"
import "./globals.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ChatProvider } from '../components/Chatcontext'
import Persist from "./persist";
import { Bounce, ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_KEY}>

        
        <Provider store={store}>
          <Persist>
            <ChatProvider>


              {children}

              <ToastContainer transition={Bounce}
                autoClose={3500}
                position="top-right"
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover={true}
                draggable={true}
              />


            </ChatProvider>
          </Persist>
        </Provider>

        </GoogleOAuthProvider>
      </body>

      <PrelineScriptWrapper />
    </html>
  );
}
