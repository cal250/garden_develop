import handleEcosystemRedirect from '@/actions/handle-ecosystem-redirect'
import LoginClientPage from './login-page'
import getCurrentCreator from '@/actions/get-current-creator'

const LoginPage = async () => {
  const creator = await getCurrentCreator()

  if (creator) {
    await handleEcosystemRedirect()
  }

  return <LoginClientPage />
}

export default LoginPage
