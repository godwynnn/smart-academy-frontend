"use client"
import "./globals.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Provider } from "react-redux";
import { store } from "../store/store";
import {ChatProvider} from '../components/Chatcontext'
import Persist from "./persist";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Persist>
          <ChatProvider>

          
          {children}
          </ChatProvider>
          </Persist>
        </Provider>
      </body>

      <PrelineScriptWrapper />
    </html>
  );
}
