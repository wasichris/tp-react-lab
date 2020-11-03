
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled('div')`
  display: flex;
  margin: 0px 10px;
  visibility:  ${props => props.isVisible ? 'visible' : 'hidden'}; ;
`

const Title = styled('div')`
  cursor: pointer;
  display: flex;
  margin: 10px 0px;
  font-size: 15px;
  line-height:  15px;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  color: ${props => props.selected ? '#5385ff' : ''};
`

const IndicatorBar = styled('div')`
  background-color: ${props => props.selected ? '#5385ff' : 'transparent'};
  border-radius: 2px;
  height: 2px;
  width: 100%;
`

const CloseBtn = styled.div`
  cursor:pointer;
  position: relative;
  margin: 13px 0px 10px 10px;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  opacity: 0.6;

  :hover {
    opacity: 1;
  }

  :before, :after {
    position: absolute;
    left: 0px;
    content: ' ';
    height: ${props => props.size + 'px'};
    width: 1px;
    background-color: ${props => props.color};
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`

const Tab = (props) => {
  const { title, selected, onSelect, id, onClose, isVisible } = props
  const isCloseControlled = typeof onClose === 'function'

  return (
    <Container
      id={`tab_header_${id}_${selected ? 'active' : 'inactive'}`}
      data-testid={'tab_header_' + id}
      isVisible={isVisible}
    >
      <div>
        <Title onClick={() => onSelect(id)} selected={selected}>
          {title}
        </Title>
        <IndicatorBar selected={selected} />
      </div>

      {isCloseControlled && <CloseBtn size='10' color='#f8f8f8' onClick={() => onClose(id)} />}

    </Container>
  )
}

Tab.propTypes = {
  // 標籤標題
  title: PropTypes.string.isRequired,
  // 是否被選擇 (被選擇時加註效果)
  selected: PropTypes.bool,
  // 被選擇時的事件 (送出 Tab ID)
  onSelect: PropTypes.func,
  // 被關閉時的事件 (送出 Tab ID)
  onClose: PropTypes.func,
  // 標籤 ID
  id: PropTypes.number,
  // 是否需要顯示(因為已經超出顯示範圍)
  isVisible: PropTypes.bool
}

export default Tab
