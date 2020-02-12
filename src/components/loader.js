import React from "react"
import styled, { keyframes } from "styled-components"

const WrapperSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 99999;
  background-color: rgba(255, 255, 255, 1);
  justify-content: center;
  align-items: center;
`

const Heart = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
`

const heartbeat = keyframes`
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
`

const Inner = styled.div`
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #fed;
  animation: ${heartbeat} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  &:before,
  &:after {
    content: " ";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: #fed;
  }

  &:before {
    left: -24px;
    border-radius: 50% 0 0 50%;
  }

  &:after {
    top: -24px;
    border-radius: 50% 50% 0 0;
  }
`

export default () => {
  return (
    <WrapperSpinner>
      <Heart>
        <Inner />
      </Heart>
    </WrapperSpinner>
  ) 
}