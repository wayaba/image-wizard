import { useContext, useEffect, useState } from 'react'
import { ImageContext } from '../context/image'
import { Cloudinary } from '@cloudinary/url-gen'

// Import required actions.
import { fill, scale } from '@cloudinary/url-gen/actions/resize'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { byAngle } from '@cloudinary/url-gen/actions/rotate'
import {
  sepia,
  grayscale,
  outline,
  cartoonify,
} from '@cloudinary/url-gen/actions/effect'
import { byRadius, max } from '@cloudinary/url-gen/actions/roundCorners'
import { outer } from '@cloudinary/url-gen/qualifiers/outlineMode'

// Import required values.
import { text } from '@cloudinary/url-gen/qualifiers/source'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'

import { saveAs } from 'file-saver'
import { Status } from '../status'
import { Spinner } from './Spinner'
import { DownloadIcon } from './Icons'

export function StepEdit() {
  const { imageUploaded, setImageUploaded } = useContext(ImageContext)
  const [loading, setLoading] = useState(false)
  const [edittedImage, setEdittedImage] = useState(null)
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'do2has5nk',
    },
    url: {
      secure: true,
    },
  })

  useEffect(() => {
    setEdittedImage(imageUploaded.url)
  }, [])

  const handleClickGrey = () => {
    setLoading(true)
    const { id } = imageUploaded
    const newImage = cloudinary.image(id).effect(grayscale())
    const img = new Image()
    img.src = newImage.toURL()
    setEdittedImage(newImage.toURL())
    img.onload = () => {
      setLoading(false)
    }
  }
  const handleClickHalfGrey = () => {
    setLoading(true)
    const { id } = imageUploaded
    const newImage = cloudinary
      .image(id)
      .resize(fill(150, 150))
      .roundCorners(byRadius(20))
      .effect(sepia())
      //   .overlay(
      //     source(
      //       text('This is my picture', new TextStyle('arial', 18)).textColor(
      //         'white'
      //       )
      //     ).position(new Position().gravity(compass('north')).offsetY(20))
      //   )
      .rotate(byAngle(20))
      .format('png')
    const img = new Image()
    img.src = newImage.toURL()
    setEdittedImage(newImage.toURL())
    img.onload = () => {
      setLoading(false)
    }
  }
  const handleClickOriginal = () => {
    setEdittedImage(imageUploaded.url)
  }

  const handleClickSepiaOld = () => {
    const { id } = imageUploaded
    const newImage = cloudinary.image(id).effect(sepia())
    const img = new Image()
    img.src = newImage.toURL()
    setEdittedImage(newImage.toURL())
    img.onload = () => {
      setLoading(false)
    }
  }

  const handleClickCartoon = () => {
    const { id } = imageUploaded
    setLoading(true)
    console.log('lo pongo en true')
    const newImage = cloudinary
      .image(id)
      .effect(cartoonify())
      .roundCorners(max())
      .effect(outline().mode(outer()).width(100).color('lightblue'))
      .backgroundColor('lightblue')
      .resize(scale().height(300))

    const img = new Image()
    img.src = newImage.toURL()
    setEdittedImage(newImage.toURL())
    img.onload = () => {
      setLoading(false)
    }
  }
  const handleClickBack = () => {
    setImageUploaded({
      url: null,
      status: Status.EMPTY,
      id: null,
    })
  }

  const handleClickDownload = () => {
    saveAs(edittedImage, 'imageWizardFile.jpg')
  }
  return (
    <div className=" rounded-lg aspect-video w-full flex items-center justify-center flex-col">
      {loading && <Spinner size={25} speed={1.5} color="black" />}
      <img
        className="w-2/4 "
        src={edittedImage}
        alt="Imagen original subida por el usuario"
      />

      <div className="flex grid-cols-4 gap-3 ">
        <button
          onClick={handleClickOriginal}
          className="block bg-blue-500 hover:bg-blue-700 text-xl text-center  font-bold text-white rounded-full px-4 py-2 mt-10"
        >
          Original
        </button>
        <button
          onClick={handleClickGrey}
          className="block bg-blue-500 hover:bg-blue-700 text-xl text-center  font-bold text-white rounded-full px-4 py-2 mt-10"
        >
          Gris
        </button>
        <button
          onClick={handleClickHalfGrey}
          className="block bg-blue-500 hover:bg-blue-700 text-xl text-center  font-bold text-white rounded-full px-4 py-2 mt-10"
        >
          Medio gris
        </button>
        <button
          onClick={handleClickSepiaOld}
          className="block bg-blue-500 hover:bg-blue-700 text-xl text-center  font-bold text-white rounded-full px-4 py-2 mt-10"
        >
          Sepia old
        </button>
        <button
          onClick={handleClickCartoon}
          className="block bg-blue-500 hover:bg-blue-700 text-xl text-center  font-bold text-white rounded-full px-4 py-2 mt-10"
        >
          Caricatura
        </button>
      </div>

      <a
        onClick={handleClickDownload}
        className="block bg-blue-500 hover:bg-blue-700 text-xl text-center font-bold text-white rounded-full px-4 py-2 mt-10"
      >
        Descargar imagen
      </a>

      <a
        onClick={handleClickBack}
        className="block bg-blue-500 hover:bg-blue-700 text-xl text-center w-full font-bold text-white rounded-full px-4 py-2 mt-10"
      >
        Volver
      </a>
    </div>
  )
}
