"use client"
import "./globals.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ChatProvider } from '../components/Chatcontext'
import Persist from "./persist";
import { Bounce, ToastContainer } from "react-toastify";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>

      <PrelineScriptWrapper />
    </html>
  );
}
