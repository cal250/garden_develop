'use client'
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css'
// Create a new ClientToastContainer component
export const ClientToastContainer = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true)
    }, []);
    if (isClient){
        return <ToastContainer position="top-right" autoClose={5000}/>
    } else {
        return null;
    }
  }

  export default ClientToastContainer;