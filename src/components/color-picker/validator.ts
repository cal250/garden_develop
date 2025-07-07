export const validateHexColor = (value: any) => {
    if (typeof value === 'string' && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)) {
      return true
    }
    return 'Please provide a valid hex color'
  }
  
export default validateHexColor;