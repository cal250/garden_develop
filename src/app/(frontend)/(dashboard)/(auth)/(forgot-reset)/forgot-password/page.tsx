import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ForgotPasswordClientPage from './forgot-password-page'

const ForgotPasswordPage = async () => {
  const cookiesStore = await cookies()
  const payload_token = cookiesStore.get('payload-token')

  if (payload_token) {
    // return redirect(`/`)
  }

  return (
  
          <ForgotPasswordClientPage />
      
  )
}

export default ForgotPasswordPage
