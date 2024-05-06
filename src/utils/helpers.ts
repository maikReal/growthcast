import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import type { ThreadContent } from "~components/elements/thread/ThreadContent"
import type { InputState } from "~types"

const algorithm = "aes-256-cbc"

// TODO: Use .env here
const secretKey = process.env.PLASMO_PUBLIC_ENCRYPTION_KEY // Ensure this is 32 bytes
const iv = process.env.PLASMO_PUBLIC_ENCRYPTION_IV

if (!secretKey || !iv) {
  throw new Error(
    "ENCRYPTION_KEY or/and ENCRYPTION_IV is not defined in .env or .env.development"
  )
}

export const contentEncrypter = (content: string) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  )
  let encrypted = cipher.update(content)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export const contentDecryptor = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  )
  let decrypted = decipher.update(Buffer.from(hash, "hex"))
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export const prepareInputsForThreadCast = (inputs: InputState[]) => {
  return inputs.map((input, index) => {
    return {
      order: index + 1,
      text: input.value,
      uuid: uuidv4()
    }
  })
}
