import React, { useState, type ChangeEvent } from "react"
import styled from "styled-components"

import { ThreadContent } from "~components/elements/thread/ThreadContent"
import { ThreadHeader } from "~components/elements/thread/ThreadHeader"

import { BasicLayer } from "./BasicLayer"

interface InputState {
  value: string
  minimized: boolean
}

export const ThreadView: React.FC = () => {
  const [inputs, setInputs] = useState<InputState[]>([
    { value: "", minimized: false }
  ])
  const [inputsLength, setInputsLength] = useState(0)

  const handleCastThread = () => {
    console.log("Casting a thread with content:", inputs)
    // Implement API call here
  }

  const handleAddInput = () => {
    const newInputs = inputs.map((input) => ({ ...input, minimized: true }))
    setInputs([...newInputs, { value: "", minimized: false }])
    setInputsLength(inputsLength + 1)
  }

  const handleRemoveInput = (index: number) => {
    const newInputs = inputs.filter((_, idx) => idx !== index)
    setInputs(newInputs)
    setInputsLength(inputsLength - 1)
  }

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputs = inputs.map((input, idx) => {
        if (idx === index)
          return { ...input, value: event.target.value.substr(0, 200) }
        return input
      })
      setInputs(newInputs)
    }

  return (
    <BasicLayer>
      <Container>
        <ThreadHeader handleCastThread={handleCastThread} />
        <ThreadContent
          handleAddInput={handleAddInput}
          handleInputChange={handleInputChange}
          inputs={inputs}
          handleRemoveInput={handleRemoveInput}
          setInputs={setInputs}
          inputsLength={inputsLength}
        />
      </Container>
    </BasicLayer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
`
