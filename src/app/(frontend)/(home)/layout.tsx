import { Footer } from '@/features/layout/footer'
import HomeHeader from '@/features/layout/header/home-header'

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <HomeHeader />

      <main className="flex w-full justify-center">{children}</main>

      <Footer />
    </div>
  )
}
