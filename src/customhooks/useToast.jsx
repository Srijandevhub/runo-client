import { useNavigate } from "react-router-dom"
import { Flip, toast } from "react-toastify"

const useToast = () => {
    const navigate = useNavigate();
    const makeToast = (status, message, redirect = false, redirecturl = "") => {
        const handleRedirect = () => {
            if (redirect && redirecturl) {
                navigate(redirecturl);
            }
        }
        if (status === 200) {
            toast.success(message, {
                position: 'bottom-right',
                transition: Flip,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                progress: false,
                autoClose: 1000,
                onClick: close(),
                onClose: handleRedirect()
            })
        } else if (status === 400) {
            toast.warning(message, {
                position: 'bottom-right',
                transition: Flip,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                progress: false,
                autoClose: 1000,
                onClick: close()
            })
        } else if (status === 500) {
            toast.error(message, {
                position: 'bottom-right',
                transition: Flip,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                progress: false,
                autoClose: 1000,
                onClick: close()
            })
        }
    }
    return makeToast
}

export default useToast