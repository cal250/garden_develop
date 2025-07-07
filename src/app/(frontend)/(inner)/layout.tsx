import { Footer } from '@/features/layout/footer'
import HomeHeader from '@/features/layout/header/home-header'
import { InnerAIFooter } from './_sections/inner-ai-footer'

export default async function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <HomeHeader />

      <main className="flex w-full justify-center">{children}</main>

      <Footer innerComponent={<InnerAIFooter />} />
    </div>
  )
}
