import { create } from 'zustand'

interface SelectedZonesData {
  zone: string
  position: number
}

interface SoilContentStore {
  selectedZones: string[]
  setSelectedZones: (selectedZones: string[]) => void
  selectedZonesData: SelectedZonesData[]
  setSelectedZonesData: (selectedZonesData: SelectedZonesData[]) => void
  resetSoil: () => void
}

const useSoilContentStore = create<SoilContentStore>((set) => ({
  selectedZones: ['', '', '', '', '', '', '', ''],
  setSelectedZones: (selectedZones) => set(() => ({ selectedZones })),
  selectedZonesData: [],
  setSelectedZonesData: (selectedZonesData) => set(() => ({ selectedZonesData })),
  resetSoil: () =>
    set(() => ({ selectedZones: ['', '', '', '', '', '', '', ''], selectedZonesData: [] })),
}))

export default useSoilContentStore
