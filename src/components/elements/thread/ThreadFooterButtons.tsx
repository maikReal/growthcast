import { useState } from "react"
import styled from "styled-components"

import { MinusIcon, PlusIcon } from "~components/elements/Icons"
import CircleProgress from "~components/elements/thread/CircleProgress"

export const ThreadFooterButtons = ({
  input,
  handleAddInput,
  handleRemoveInput,
  index,
  inputsLength
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {input && (
        <ButtonsContainer>
          <CircleProgress value={input.value.length} maxValue={200} />

          {index == inputsLength &&
            inputsLength + 1 !==
              process.env.PLASMO_PUBLIC_MAX_CASTS_IN_THREAD &&
            input.value && (
              <FooterActionButtonContainer
                setIsHovered={setIsHovered}
                handleInput={handleAddInput}>
                {isHovered ? (
                  <PlusIcon
                    bgColor={"rgb(187,150,249,0.8)"}
                    strokeColor={"rgb(249,249,249,0.8)"}
                  />
                ) : (
                  <PlusIcon bgColor={"#BB96F9"} strokeColor={"#FFFFFF"} />
                )}
              </FooterActionButtonContainer>
            )}

          <FooterActionButtonContainer
            setIsHovered={setIsHovered}
            handleInput={() => handleRemoveInput(index)}>
            {index !== 0 &&
              (isHovered ? (
                <MinusIcon opacity={"0.65"} />
              ) : (
                <MinusIcon opacity={"0.8"} />
              ))}
          </FooterActionButtonContainer>
        </ButtonsContainer>
      )}
    </>
  )
}

const FooterActionButtonContainer = ({
  setIsHovered,
  handleInput,
  children
}) => {
  return (
    <ActionButtonContainer
      onMouseOver={() => {
        setIsHovered(true)
      }}
      onMouseOut={() => {
        setIsHovered(false)
      }}
      onClick={handleInput}>
      {children}
    </ActionButtonContainer>
  )
}

const ActionButtonContainer = styled.button`
  max-width: 20px;
  max-height: 20px;
  border-radius: 100px;
  padding: 0px;
  border: 0px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 10px;
`
