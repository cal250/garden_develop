// import { Zone } from '@/payload-types'
// import { create } from 'zustand'

// interface BuilderSoilDataStore {
//   selectedZone: Zone | null
//   setSelectedZone: (selectedZone: Zone) => void
//   wordType: string
//   setWordType: (wordType: string) => void
//   innerWord: string
//   setInnerWord: (innerWord: string) => void
//   outerWord: string
//   setOuterWord: (outerWord: string) => void
//   image: string
//   setImage: (image: string) => void
//   intention: string
//   setIntention: (intention: string) => void
//   //   resetSoil: () => void
// }

// const useBuilderSoilDataStore = create<BuilderSoilDataStore>((set) => ({
//   selectedZone: null,
//   setSelectedZone: (selectedZone) => set(() => ({ selectedZone })),
//   wordType: '',
//   setWordType: (wordType) => set(() => ({ wordType })),
//   innerWord: '',
//   setInnerWord: (innerWord) => set(() => ({ innerWord })),
//   outerWord: '',
//   setOuterWord: (outerWord) => set(() => ({ outerWord })),
//   image: '',
//   setImage: (image) => set(() => ({ image })),
//   intention: '',
//   setIntention: (intention) => set(() => ({ intention })),
//   //   resetSoil: () =>
//   //     set(() => ({ selectedZones: ['', '', '', '', '', '', '', ''], selectedZonesData: [] })),
// }))

// export default useBuilderSoilDataStore

import { Zone } from '@/payload-types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CocoonZone = { id: string; position: number; zone: Zone }

interface BuilderSoilDataStore {
  cocoonZones: CocoonZone[]
  setCocoonZones: (cocoonZones: CocoonZone[]) => void
  selectedZone: CocoonZone | null
  setSelectedZone: (selectedZone: CocoonZone) => void
  wordType: string
  setWordType: (wordType: string) => void
  singleWord: string
  setSingleWord: (singleWord: string) => void
  innerWord: string
  setInnerWord: (innerWord: string) => void
  outerWord: string
  setOuterWord: (outerWord: string) => void
  image: string
  setImage: (image: string) => void
  intention: string
  setIntention: (intention: string) => void
  resetSoilData: () => void
}

const useBuilderSoilDataStore = create<BuilderSoilDataStore>()(
  persist(
    (set) => ({
      cocoonZones: [],
      setCocoonZones: (cocoonZones) => set({ cocoonZones }),

      selectedZone: null,
      setSelectedZone: (selectedZone) => set({ selectedZone }),

      wordType: '',
      setWordType: (wordType) => set({ wordType }),

      singleWord: '',
      setSingleWord: (singleWord) => set({ singleWord }),

      innerWord: '',
      setInnerWord: (innerWord) => set({ innerWord }),

      outerWord: '',
      setOuterWord: (outerWord) => set({ outerWord }),

      image: '',
      setImage: (image) => set({ image }),

      intention: '',
      setIntention: (intention) => set({ intention }),

      resetSoilData: () =>
        set({
          cocoonZones: [],
          selectedZone: null,
          wordType: '',
          innerWord: '',
          outerWord: '',
          image: '',
          intention: '',
        }),
    }),
    {
      name: 'builder-soil-data',
    },
  ),
)

export default useBuilderSoilDataStore
