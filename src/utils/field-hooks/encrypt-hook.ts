import { FieldHook } from 'payload'
import { encrypt } from '../encrypt-decrypt'

export const encryptField: FieldHook = ({ value }) => {
  if (typeof value === 'string') {
    return encrypt(value as string)
  }

  return undefined
}
