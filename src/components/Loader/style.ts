import styled from 'styled-components'
import logoSvg from './../../assets/logo-loader.svg'

export const LoaderContainer = styled.div`
  width: calc(100vw - 14px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;

  span {
    background-image: url(${logoSvg});
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(2);
    animation: circular-rotate 1s linear infinite;
  }

  @keyframes circular-rotate {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
