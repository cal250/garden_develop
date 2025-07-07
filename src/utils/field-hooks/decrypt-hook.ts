import { FieldHook } from 'payload'
import { decrypt } from '../encrypt-decrypt'

export const decryptField: FieldHook = ({ value }) => {
  try {
    const decrypted = typeof value === 'string' ? decrypt(value as string) : value
    return decrypted
  } catch (e: unknown) {
    return undefined
  }
}
