import { createContext, useState } from 'react'
import { Status } from '../status'

export const ImageContext = createContext()

export const ImageProvider = ({ children }) => {
  const [imageUploaded, setImageUploaded] = useState({
    url: null,
    id: null,
    status: Status.EMPTY,
  })
  return (
    <ImageContext.Provider value={{ imageUploaded, setImageUploaded }}>
      {children}
    </ImageContext.Provider>
  )
}
