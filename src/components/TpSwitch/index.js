import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createGuid } from '@src/utils/guidHelper'

const Switch = ({ className, value, onChange }) => {
  // state
  const [isOn, setIsOn] = useState(true)
  const [elementId, setElementId] = useState('')

  // setup a radom element id
  useEffect(() => {
    setElementId(createGuid())
  }, [])

  // monitor value prop change to update isOn state
  useEffect(() => {
    setIsOn(value)
  }, [value])

  // checkbox value change
  const handleIsOnChange = e => {
    const newIsOn = !isOn

    // 修改組件內的狀態
    setIsOn(newIsOn)

    // 通知父組件此內部狀態已被改變
    // 父祖件應該同步修改傳入此組件的狀態值
    if (onChange) onChange(newIsOn)
  }

  return (
    <>
      <input
        className={className}
        checked={isOn}
        onChange={(handleIsOnChange)}
        type='checkbox'
        id={elementId}
      />
      <label htmlFor={elementId}>Toggle</label>
    </>
  )
}

Switch.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

// 此處為練習使用 style-component 實作組件樣式
// 否則專案內通用的組件樣式應統一放置於 style.scss 中
// 並需使用 BEM 命名確保樣式 class 名稱不會衝突
const TpSwitch = styled(Switch)`
  height: 0;
  width: 0;
  visibility: hidden;

  & + label {
    cursor: pointer;
    text-indent: -9999px;
    width: 50px;
    height: 26px;
    background: grey;
    display: inline-block;
    border-radius: 100px;
    position: relative;

    :after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      transition: 0.3s;
    }

    :active:after {
      width: 32px;
    }
  }

  :checked + label {
    background: #2196F3;

    :after {
      left: calc(100% - 3px);
      transform: translateX(-100%);
    }
  }
`
export default TpSwitch
