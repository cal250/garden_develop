import type {ReactNode} from 'react'
import { Montserrat_Alternates } from 'next/font/google'
import '@/styles/globals.scss'
import { NextUIProvider } from '@nextui-org/system'
import { AuthProvider } from '@/features/providers/auth'
import { ThemeProvider } from 'next-themes'
import ReactQueryProvider from '@/components/providers/react-query-provider'
import getColorTemplates from '@/actions/get-color-templates'
import DynamicThemeStyles from './dynamic-theme-styles'

export const metadata = {
  description: 'An inner garden application.',
  title: 'Inner Garden',
}

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat-alternates',
})

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props
  const colorTemplates = await getColorTemplates()

  const themes = colorTemplates.map((template) => template.id)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={montserratAlternates.className}
    >
      <body>
        <DynamicThemeStyles colorTemplates={colorTemplates} />
        <main>
          <AuthProvider>
            <ReactQueryProvider>
              <NextUIProvider>
                <ThemeProvider themes={themes}>{children}</ThemeProvider>
              </NextUIProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  )
}
