import { useState } from "react"
import styled from "styled-components"

import { ThreadFooterButtons } from "./ThreadFooterButtons"

export const ThreadContent = ({
  handleAddInput,
  handleInputChange,
  inputs,
  handleRemoveInput,
  setInputs,
  inputsLength
}) => {
  const [previousInputIndex, setPreviousInputIndex] = useState(0)

  const handleBlur = (activeInputIndex: number) => () => {
    if (previousInputIndex !== activeInputIndex) {
      const newInputs = inputs.map((input, idx) => ({
        ...input,
        minimized: idx == activeInputIndex // Minimize all other inputs except the one focused
      }))

      setInputs(newInputs)
      setPreviousInputIndex(activeInputIndex)
    }
  }

  const handleActiveInput = (activeInputIndex: number) => () => {
    if (previousInputIndex !== activeInputIndex) {
      const newInputs = inputs.map((input, idx) => ({
        ...input,
        minimized: idx !== activeInputIndex // Minimize all other inputs except the one focused
      }))

      setInputs(newInputs)
      setPreviousInputIndex(activeInputIndex)
    }
  }

  return (
    <>
      {inputs.map((input, index) => {
        console.log("index:", index, input.minimized)
        return (
          <>
            <div
              key={index}
              onBlur={handleBlur(index)}
              onFocus={handleActiveInput(index)}
              style={{ opacity: input.minimized ? 0.5 : 1 }}>
              <ContentContainer key={index}>
                <ProfileImage src="https://i.imgur.com/7txHbJC.jpg" />
                <ContentInput
                  className="textarea"
                  role="textbox"
                  contentEditable
                  value={input.value}
                  placeholder="Here is my thoughts that I want to publish on..."
                  onChange={handleInputChange(index)}
                  onFocus={handleActiveInput(index)}
                  onBlur={handleBlur(index)}
                />
              </ContentContainer>
              <ThreadFooterButtons
                input={input}
                handleAddInput={handleAddInput}
                handleRemoveInput={handleRemoveInput}
                index={index}
                inputsLength={inputsLength}
              />
            </div>
          </>
        )
      })}
    </>
  )
}

const ContentContainer = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 10px;
  align-items: start;
`

const ContentInput = styled.textarea`
  width: 100%;
  background: transparent;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  border: 0px;
  min-height: 100px;
  resize: none;

  &:focus {
    outline: none;
  }
`

const ProfileImage = styled.img`
  //   border-radius: 200px;
  max-width: 50px;
  max-height: 50px;
  clip-path: circle();
`
