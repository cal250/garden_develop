import getCurrentCreator from '@/actions/get-current-creator'
import ClientSpecialEcoLayout from '@/features/layout/special-eco-layout'
import { redirect } from 'next/navigation'

export default async function SpecialEcoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    // console.log('redirected from here')
    redirect('/login')
  }

  return <ClientSpecialEcoLayout>{children}</ClientSpecialEcoLayout>
}
