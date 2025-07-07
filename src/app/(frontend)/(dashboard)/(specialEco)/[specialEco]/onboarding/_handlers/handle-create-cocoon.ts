async function handleCreateCocoon(payload: any) {
  try {
    const res = await fetch(`/api/cocoon`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = await res.json()
    return result
  } catch (error) {
    // Safely log the error message
    if (error instanceof Error) {
      console.log(error.message, 'Checking the error')
      // setLoginErr('Error logging in')
    } else {
      console.log('An unknown error occurred:', error)
    }
  }
}

export default handleCreateCocoon
