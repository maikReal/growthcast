import React, { useState } from "react"
import styled from "styled-components"

import { ThreadContent } from "~components/elements/thread/ThreadContent"
import { ThreadHeader } from "~components/elements/thread/ThreadHeader"
import { HeaderPageDescription } from "~components/sections/HeaderPageDescription"
import { ScreenState, useApp } from "~Context/AppContext"
import type { InputState, ThreadInput } from "~types"
import { prepareInputsForThreadCast, sendRequestSignal } from "~utils/helpers"

import { BasicContainer } from "../containers/BasicContainer"

export const ThreadView: React.FC = () => {
  const [inputs, setInputs] = useState<InputState[]>([
    { value: "", minimized: false }
  ])
  const [inputsLength, setInputsLength] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const { fid, signerUuid, loading, setScreen } = useApp()

  const handleCastThread = async () => {
    console.log(
      "[DEBUG - screens/ThreadView.tsx] Casting a thread with content:",
      inputs
    )

    if (inputs && inputs.length > 1) {
      const preparedDataForThread: Array<ThreadInput> =
        prepareInputsForThreadCast(inputs)

      const castThreadResponse = await sendRequestSignal({
        action: "castThread",
        metadata: {
          threadData: {
            content: preparedDataForThread,
            channelId: selectedChannel,
            signerUuid: signerUuid
          }
        }
      })

      // TODO: Add error screen
      if (castThreadResponse.castHash) {
        setScreen(ScreenState.ThreadSentSuccess)
      }
    }
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
    <BasicContainer>
      <Container>
        {loading ? (
          <div>Loading context, pls wait </div>
        ) : (
          <>
            <HeaderPageDescription
              content={"Fill out several casts and publish it in one Frame"}
            />
            <ThreadHeader
              handleCastThread={handleCastThread}
              fid={fid}
              setSelectedChannel={setSelectedChannel}
            />
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
    </BasicContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
`
