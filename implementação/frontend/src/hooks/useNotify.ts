import { toast } from 'react-toastify'

interface INotify {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

const notify = ({ type = 'success', message }: INotify) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export default notify