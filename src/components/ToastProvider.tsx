"use client"

import { PropsWithChildren } from "react"
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"

export const ToastProvider = ({children}: PropsWithChildren) => {
    const contextClass = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
      };
    return(
        <>
            {children}
            <ToastContainer 
                toastClassName={(context) => 
                    contextClass[context?.type || "default"] + 
                    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                }
                bodyClassName={() => "flex space-x-1 text-sm font-white font-med block p-3"}
                position="top-left"
                autoClose={3000}
            />
        </>
    )
}