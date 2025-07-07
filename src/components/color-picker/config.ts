import { Field } from 'payload'

export const validateHexColor = (value: any) => {
  if (typeof value === 'string' && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)) {
    return true
  }
  return 'Please provide a valid hex color'
}

const colorField: Field = {
  name: 'color',
  type: 'text',
  // validate: validateHexColor,
  required: true,
  admin: {
    components: {
      Field: '@/components/color-picker/InputField.tsx',
      Cell: '@/components/color-picker/Cell.tsx',
    },
  },
}

export default colorField
