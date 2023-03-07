import { useContext } from 'react'
import { ImageContext } from '../context/image'
import { useDropzone } from 'react-dropzone'
import { UploadIcon } from './Icons'
import { Status } from '../status'

export function StepUpload() {
  const { imageUploaded, setImageUploaded } = useContext(ImageContext)
  const { getRootProps, getInputProps } = useDropzone({
    noClick: false,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      handleDrop(acceptedFiles)
    },
  })

  const handleDrop = async (acceptedFiles) => {
    console.log(acceptedFiles)

    await Promise.all(
      acceptedFiles.map(async (file) => await uploadImage(file))
    )
  }

  const uploadImage = async (file) => {
    setImageUploaded({ url: null, status: Status.UPLOADING })
    const formData = new FormData()
    formData.append('upload_preset', 'image_wizard_preset')
    formData.append('timestamp', Date.now() / 1000)
    formData.append('api_key', 373466856316632)
    formData.append('file', file)

    console.log(formData)
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/do2has5nk/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
    const parsed = await response.json()
    const { secure_url: url, public_id: id } = parsed
    setImageUploaded({ url: url, status: Status.DONE, id: id })
    console.log({
      parsed, // 200, success!
    })
  }

  return (
    <div
      className="shadow-2xl border-dashed border-2 border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col"
      {...getRootProps()}
    >
      {imageUploaded.status === Status.EMPTY ? (
        <>
          <input {...getInputProps()} />
          <button className="font-bold pointer-events-none bg-blue-600 rounded-full text-bold text-white text-xl px-6 py-4 flex">
            <UploadIcon /> Upload files
          </button>
          <strong className="text-lg mt-4 text-gray-800">or drop a file</strong>
        </>
      ) : imageUploaded.status === Status.UPLOADING ? (
        <strong className="text-lg mt-4 text-gray-800">
          Uploading files...
        </strong>
      ) : null}
    </div>
  )
}
