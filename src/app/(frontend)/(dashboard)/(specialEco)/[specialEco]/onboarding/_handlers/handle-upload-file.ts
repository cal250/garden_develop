async function handleUploadFile(formData: FormData) {
  try {
    const res = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    const result = await res.json()
    return result
  } catch (error) {
    return error
  }
}

export default handleUploadFile
