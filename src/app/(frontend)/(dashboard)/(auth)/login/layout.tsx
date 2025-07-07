import LoginLayoutClient from './login-layout'

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LoginLayoutClient>{children}</LoginLayoutClient>
}
