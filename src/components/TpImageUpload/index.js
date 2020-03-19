/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ImagePreviewBar from './ImagePreviewBar'
import upload from '@src/assets/images/upload.png'

const InputFile = styled.input`
  display: none;
`

const PickFileBtn = styled.button`
  padding: 7px 10px 5px 10px;
`

const UploadIcon = styled.img`
  height: 15px;
`

const TpImageUpload = ({ value, onChange }) => {
  const [files, setFiles] = useState([])
  const inputRef = useRef()
  const onChangeRef = useRef()

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // 父層傳入的資料變動時，更新組件內資料
  useEffect(() => {
    setFiles(value)
  }, [value])

  const handleChooseFiles = (e) => {
    // FileList 內存放許多 Blob 物件且 Blob 不是一般的物件，但從中可以透過 name, size, type 取得該檔案的資訊
    // FileList is not an Array, and does not inherit from Array,
    // but it does implement the iterable protocol, so you can use the spread syntax to get it as an array.
    const files = [...e.target.files].map((file, index) => ({
      guid: index,
      raw: file,
      url: URL.createObjectURL(file)
    }))

    setFiles(files)
    onChangeRef.current(files)
  }

  const handleRemove = (guid) => {
    setFiles(files => {
      const remainFiles = files.filter(f => f.guid !== guid)
      onChangeRef.current(remainFiles)
      return remainFiles
    })
  }

  return (
    <form>

      <div>
        {/* choose images */}
        <InputFile type='file' ref={inputRef} onChange={handleChooseFiles} multiple accept='image/*' />
        <PickFileBtn type='button' onClick={() => inputRef.current.click()}><UploadIcon src={upload} alt='' /></PickFileBtn>
      </div>

      {/* preview uploaded images */}
      <ImagePreviewBar files={files} onRemove={handleRemove} />

    </form>
  )
}

export default TpImageUpload
