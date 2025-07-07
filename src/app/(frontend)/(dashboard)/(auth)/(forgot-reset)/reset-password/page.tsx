import ResetPasswordClientPage from './reset-password-page'

const ResetPasswordPage = async ({ searchParams }: ServerProps) => {
  const token = ((await searchParams)?.token as string) || ''
  return <ResetPasswordClientPage token={token} />
}

export default ResetPasswordPage
