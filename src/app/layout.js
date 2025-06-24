"use client"
import "./globals.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Provider } from "react-redux";
import { store } from "../store/store";
import {ChatProvider} from '../components/Chatcontext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ChatProvider>

          
          {children}
          </ChatProvider>
        </Provider>
      </body>

      <PrelineScriptWrapper />
    </html>
  );
}
