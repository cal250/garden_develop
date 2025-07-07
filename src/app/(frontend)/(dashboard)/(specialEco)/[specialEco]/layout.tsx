import { getEcosystemBySpecialEco } from '@/actions/get-ecosystem-by-special-eco'
import InnerSpecialEcoLayout from '@/features/layout/special-eco-layout/inner-special-eco-layout'

export default async function SpecialEcoLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ specialEco: string }>
}>) {
  const { specialEco } = await params
  const ecosystem = await getEcosystemBySpecialEco(specialEco)

  return <InnerSpecialEcoLayout ecosystem={ecosystem}>{children}</InnerSpecialEcoLayout>
}
