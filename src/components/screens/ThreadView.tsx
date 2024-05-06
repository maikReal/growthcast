import React, { useMemo, useState, type ChangeEvent } from "react"
import styled from "styled-components"

import { ThreadContent } from "~components/elements/thread/ThreadContent"
import { ThreadHeader } from "~components/elements/thread/ThreadHeader"
import { ScreenState, useApp } from "~Context/AppContext"
import type { InputState, ThreadInput } from "~types"
import { prepareInputsForThreadCast } from "~utils/helpers"
import { castThread } from "~utils/proxy"

import { BasicLayer } from "../sections/BasicLayer"

export const ThreadView: React.FC = () => {
  const [inputs, setInputs] = useState<InputState[]>([
    { value: "", minimized: false }
  ])
  const [inputsLength, setInputsLength] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const { fid, signerUuid, loading, setScreen } = useApp()

  const handleCastThread = async () => {
    console.log("Casting a thread with content:", inputs)

    if (inputs && inputs.length > 1) {
      const preparedDataForThread: Array<ThreadInput> =
        prepareInputsForThreadCast(inputs)

      const castThreadResponse = await castThread({
        content: preparedDataForThread,
        channelId: selectedChannel,
        signerUuid: signerUuid
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

  console.log("In threads")
  return (
    <BasicLayer>
      <Container>
        {loading ? (
          <div>Loading context, pls wait </div>
        ) : (
          <>
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
    </BasicLayer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
`
