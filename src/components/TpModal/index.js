import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const getScrollbarWidth = () => {
  // 取得的寬度有一點誤差，在此僅做練習使用
  const outer = document.createElement('div')
  const inner = document.createElement('div')
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)
  outer.appendChild(inner)
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  document.body.removeChild(outer)
  return scrollbarWidth
}

const TpModal = ({ title, isVisible, children, maxWidth, target, onClose } = { children: [] }) => {
  // 將彈跳視窗移出到特定的元素上
  // 避免被父層樣式影響蓋住 e.g. overflow: hidden, z-index
  const portalTarget = target || document.body

  // 點選 Backdrop (不含modal) 來關閉彈跳視窗
  const modalRef = useRef(null)
  const handleBackdropClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  // 收到按下 Esc 鍵的事件時關閉彈跳視窗
  const handleKeyDown = useCallback(
    (e) => {
      const { keyCode } = e
      if (keyCode === 27) onClose()
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

  // 監看 window 下的所有 keydown 事件
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown, isVisible])

  // 取得 scrollbar 寬度 (使用 useMemo 執行傷效能的動作一次就好)
  const memoizedScrollbarWidth = useMemo(getScrollbarWidth, [])

  // 記住原本在 html 及 body 的 overflow 樣式 (當 modal 消失時復原樣式使用)
  const [[htmlOverflow, bodyOverflow]] =
    useState([document.querySelector('html').style.overflow, document.querySelector('body').style.overflow])

  // 讓畫面被鎖定來避免畫面滾動的混亂
  useEffect(() => {
    const hasScrollbar = window.innerWidth > document.body.clientWidth
    if (isVisible && hasScrollbar) {
      // 補上原本 scrollbar 寬度，盡量減少畫面的明顯位移
      document.querySelector('html').style.paddingRight = memoizedScrollbarWidth + 'px'
      document.querySelector('html').style.overflow = 'hidden'
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('html').style.paddingRight = '0px'
      document.querySelector('html').style.overflow = htmlOverflow
      document.querySelector('body').style.overflow = bodyOverflow
    }
  }, [bodyOverflow, htmlOverflow, isVisible, memoizedScrollbarWidth])

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
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

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

const ModalContent = styled.div`
  padding: 0 20px 20px 20px;
  overflow-y: auto;
  max-height: 50vh;
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

export default TpModal
