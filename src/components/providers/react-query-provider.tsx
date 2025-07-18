'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/components/utils/react-query-client'

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
