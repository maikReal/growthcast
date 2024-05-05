import React, { useMemo, useState, type ChangeEvent } from "react"
import styled from "styled-components"

import { ThreadContent } from "~components/elements/thread/ThreadContent"
import { ThreadHeader } from "~components/elements/thread/ThreadHeader"
import { useApp } from "~Context/AppContext"

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
  const { fid, loading } = useApp()
  console.log("Myid: ", fid)
  // const fid = 3

  // TODO: Add fetch channels and link it to 30 mins interval
  // useMemo

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

  console.log("In threads")
  return (
    <BasicLayer>
      <Container>
        {loading ? (
          <div>Loading context, pls wait </div>
        ) : (
          <>
            <ThreadHeader handleCastThread={handleCastThread} fid={fid} />
            <ThreadContent
              handleAddInput={handleAddInput}
              handleInputChange={handleInputChange}
              inputs={inputs}
              handleRemoveInput={handleRemoveInput}
              setInputs={setInputs}
              inputsLength={inputsLength}
            />
          </>
        )}
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
