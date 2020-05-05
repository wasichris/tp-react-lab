/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import TpImageUpload from '@src/components/TpImageUpload'
import api from '@src/services/api'

const Practice15 = () => {
  const [files, setFiles] = useState([])

  const handleImageChange = images => {
    setFiles(images)
  }

  const handleRemoveAll = e => {
    setFiles([])
  }

  const handleUploadFiles = async (e) => {
    e.preventDefault()
    console.log(files.map(file => file.url))

    // prepare form data
    var formData = new FormData()
    files.forEach(file => formData.append('file', file.raw))
    formData.append('userId', 'wasichris')

    // call api
    const resp = await api.uploadImage(formData)
    console.log(resp)
  }

  return (
    <>
      <h1> 打造 Upload File 共用組件 </h1>
      <p className='tp-desc'>
          建立 Upload File 組件。
      </p>

      {/* pick images */}
      <TpImageUpload value={files} onChange={handleImageChange} />

      {
        files && files.length > 0 && (
          <>
            <button type='button' onClick={handleUploadFiles}>Upload</button>
            <button type='button' onClick={handleRemoveAll}>Remove All</button>
          </>
        )
      }

    </>
  )
}

export default Practice15
