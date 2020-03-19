import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TpXBtn from '@src/components/TpXBtn'

const PreviewBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const ImageFrame = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 100px;
  height: 100px;
  margin: 10px 10px 0 0;
  /* background-color: #f9f9f9; */

  &:hover {
    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.67);
  }
`
const ImageWrap = styled.div`
   overflow: hidden;
   height: 100%;
   width: 100%;
   text-align: center;
`

const Image = styled.img`
  width: auto;
  height: 100%;
`

const ImagePreviewBar = ({ files = [], onRemove }) => {
  return (
    <PreviewBar>
      {(files || []).map(file => (
        <ImageFrame key={file.url}>
          <TpXBtn margin='10' size='10' color='#FFF' onClick={() => onRemove(file.guid)} />
          <ImageWrap>
            <Image src={file.url} alt={file.raw.name} />
          </ImageWrap>
        </ImageFrame>
      ))}
    </PreviewBar>
  )
}

ImagePreviewBar.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func
}

export default ImagePreviewBar
