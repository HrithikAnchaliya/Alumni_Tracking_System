import { toast } from 'react-toastify';

export const notifyError = (msg) => toast.error(`Adding your ${msg} Was Unsuccessful`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

export const notifyError_with_msg = (msg) => toast.error(`${msg}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});    

export const notify_Success = () => toast.dark('Successfully Added!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,  
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const notify_Success_msg = (msg) => toast.dark(`${msg}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,  
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});