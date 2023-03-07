import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ImageProvider } from './context/image'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ImageProvider>
    <App />
  </ImageProvider>
)
