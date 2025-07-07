import { create } from 'zustand'

interface LandscapeStore {
  url: string
  updateUrl: (url: string) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  reset: () => void
}

const useLandscapeStore = create<LandscapeStore>((set) => ({
  url: '/assets/onboarding/onboarding-bg.webp',
  updateUrl: (url) => set(() => ({ url })),
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  reset: () => set(() => ({ url: '/assets/onboarding/onboarding-bg.webp' })),
}))

export default useLandscapeStore
