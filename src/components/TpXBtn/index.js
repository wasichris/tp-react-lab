import styled from 'styled-components'

const TpXBtn = styled.div`
  cursor:pointer;
  position: absolute;
  right: ${props => props.margin + 'px'};
  top: ${props => props.margin + 'px'};
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  opacity: 0.6;

  :hover {
    opacity: 1;
  }

  :before, :after {
    position: absolute;
    left: ${props => props.margin / 2 + 'px'};
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

export default TpXBtn
