import getSpecialEcosystems from '@/actions/get-special-ecosystems'
import { MobileFooter } from '@/features/layout/footer/mobile-footer'
import DashboardHeader from '@/features/layout/header'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const specialEcosystems = await getSpecialEcosystems()

  return (
    <div
      className={`grid min-h-[100dvh] grid-rows-[auto_1fr]`}
      style={{
        background: `linear-gradient(0deg, #FFFFFF05, #FFFFFF05), radial-gradient(50.36% 289.73% at 51.6% 49.87%, rgb(var(--color-9)) 0%, rgb(var(--color-8)) 99.68%)`,
      }}
    >
      <DashboardHeader specialEco={specialEcosystems} />
      <main className="flex size-full justify-center">{children}</main>
      <MobileFooter />
    </div>
  )
}
