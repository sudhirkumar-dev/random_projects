import React from 'react'
import ReactDOM from 'react-dom/client'
import App2 from './App2.jsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App2 />
    <ToastContainer />
  </React.StrictMode>,
)
