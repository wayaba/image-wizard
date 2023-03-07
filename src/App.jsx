import './App.css'
import { CloudinaryLogo } from './components/Icons'
import { useContext } from 'react'
import { StepUpload } from './components/StepUpload'
import { Status } from './status'
import { StepEdit } from './components/StepEdit'
import { ImageContext } from './context/image'

function App() {
  const { imageUploaded } = useContext(ImageContext)

  return (
    <div className="max-w-xl m-auto grid grid-cols-1 place-content-center w-full h-screen p-4">
      <header className="flex justify-center py-10">
        <h1 className="text-3xl font-bold text-blue-900 tracking-tighter">
          Image<span className="text-blue-600">Wizard</span>
        </h1>
      </header>
      <main className="w-full block">
        <h1 className="text-4xl font-mono text-gray-800 font-bold m-4">
          Upload and Edit your image
        </h1>
        {imageUploaded.status === Status.EMPTY ||
        imageUploaded.status === Status.UPLOADING ? (
          <StepUpload />
        ) : (
          <StepEdit />
        )}
      </main>

      <footer className="flex justify-center items-center gap-x-2 font-semibold pt-10">
        Hecho con{' '}
        <a href="https://cloudinary.com" target="_blank" rel="noreferrer">
          <CloudinaryLogo />
        </a>
      </footer>
    </div>
  )
}

export default App
