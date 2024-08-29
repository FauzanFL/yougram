import { Slide, toast } from "react-toastify"

export const toastSuccess = (message: string) => {
    toast.success(message,{
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
        transition: Slide,
    })
}

export const toastFailed = (message: string) => {
    toast.error(message,{
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
        transition: Slide,
        type: "error"
    })
}