"use client"
import { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";

// const PersistGate = dynamic(() => import("redux-persist/integration/react"), { ssr: false });


import React from 'react'

function Persist({ children }) {

  return (
    <PersistGate loading={null} persistor={persistor}>

      {children}
    </PersistGate>
  )
}

export default Persist