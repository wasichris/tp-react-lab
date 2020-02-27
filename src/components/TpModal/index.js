// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Backdrop = styled.div`
  background: #0000002e;
    /* z-index: 99; */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Modal = styled.div`
  background: white;
  border-radius: 5px;
  width: 100%;
  max-width: ${props => props.maxWidth || '60%'} ;
  max-height: 100vh;
  box-shadow: 3px 3px 9px 1px silver;
  display: flex;
  flex-direction: column;
`

const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  position: relative;
`

const ModalTitle = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: center;
`

const ModalCloseBtn = styled.div`
  cursor:pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 15px;
  height: 15px;
  opacity: 0.3;

  :hover {
    opacity: 1;
  }

  :before, :after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 15px;
    width: 1px;
    background-color: #333;
  }

  :before {
    transform: rotate(45deg);
  }
  
  :after {
    transform: rotate(-45deg);
  }

`

const ModalContent = styled.div`
  padding: 0 20px 20px 20px;
  overflow-y: auto;
  max-height: 50vh;
`

const TpModal = ({ title, target, isVisible, children, onClose, maxWidth } = { children: [] }) => {
  // 將 Modal 移出到哪個特定的外部元素上
  // 避免被父層樣式影響蓋住 e.g. overflow: hidden, z-index
  const portalTarget = target || document.body

  // 按下 Esc 鍵來來關閉彈跳視窗
  const handleKeyDown = useCallback(
    (e) => {
      const { keyCode } = e
      if (keyCode === 27) {
        onClose()
      }
    },
    [onClose]
  )

  // 因為 useEffect 相依 handleKeyDown，然後裡面又相依 onClose，所以要將 handleKeyDown 包成 useCallback 方法
  // const handleKeyDown = (e) => {
  //   const { keyCode } = e
  //   if (keyCode === 27) {
  //     onClose()
  //   }
  //   console.log('%c e ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', e)
  // }

  // 監看 document 下的所有 keydown 事件
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown, isVisible])

  // 點選 modal 以外的區塊來關閉彈跳視窗
  const modalRef = useRef(null)
  const handleBackdropClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  // 記住原本在 html 及 body 的 overflow 樣式 (當 modal 消失時復原樣式使用)
  const [[htmlOverflow, bodyOverflow]] =
    useState([document.querySelector('html').style.overflow, document.querySelector('body').style.overflow])

  // 避免有 scroll bar 時，在 modal 出現時還可以滾動
  useEffect(() => {
    if (isVisible) {
      document.querySelector('html').style.overflow = 'hidden'
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('html').style.overflow = htmlOverflow
      document.querySelector('body').style.overflow = bodyOverflow
    }
  }, [bodyOverflow, htmlOverflow, isVisible])

  // render
  return isVisible
    ? ReactDOM.createPortal(
      <Backdrop onClick={handleBackdropClick}>
        {/* 彈跳視窗 */}
        <Modal ref={modalRef} maxWidth={maxWidth}>

          {/* 標頭 */}
          <ModalHeader>
            <ModalTitle> {title} </ModalTitle>
            <ModalCloseBtn onClick={onClose} />
          </ModalHeader>

          {/* 內容 */}
          <ModalContent>
            {children}
          </ModalContent>

        </Modal>
      </Backdrop>,
      portalTarget
    )
    : null
}

TpModal.propTypes = {
  children: PropTypes.node,
  onDone: PropTypes.func
}

export default TpModal
