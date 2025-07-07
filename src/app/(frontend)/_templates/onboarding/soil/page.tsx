'use client'

import React, { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { FlowerPicker } from '@/components/organisms/flower-picker/flower-picker'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'

const SoilPage: React.FC<SoilPageProps> = (props) => {
  const [soils, setSoils] = useState([
    { id: 'kindness', name: 'kindness' },
    { id: 'peace', name: 'peace' },
    { id: 'gratitude', name: 'gratitude' },
    { id: 'joy', name: 'joy' },
    { id: 'love', name: 'love' },
    { id: 'faith', name: 'faith' },
    { id: 'empathy', name: 'empathy' },
    { id: 'hope', name: 'hope' },
    { id: 'patience', name: 'patience' },
    { id: 'forgiveness', name: 'forgiveness' },
    { id: 'compassion', name: 'compassion' },
    { id: 'trust', name: 'trust' },
  ])
  const router = useRouter()

  const [, setSelectedSoils] = useState([])
  const [inputSoil, setInputSoil] = useState('')

  function handleAdd() {
    setSoils([...soils, { id: inputSoil, name: inputSoil }])
    setInputSoil('')
  }

  return (
    <section className="mt-[-45px] flex flex-col items-center gap-[30px]">
      <DesignContextProvider stroke="#825FA3">
        <HeaderCard
          text="name your soil"
          classNames={{
            title: 'text-[32px] text-color-1 font-black',
            outerTitle: 'text-white',
            base: 'w-[523px] h-[88.5px] before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_#825FA3_3.4%,_#100E1A_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0',
          }}
        />
      </DesignContextProvider>

      <p className="text-base font-bold text-white">
        Name the eight plots of soil that ground your evolution
      </p>

      <FlowerPicker
        flowers={soils}
        onSelectionChange={(keys: any) => setSelectedSoils(Array.from(keys))}
      />
      <div className="flex items-center gap-4">
        <input
          placeholder="| create your own"
          className="border-none bg-transparent text-center text-base font-black text-white placeholder:text-white focus:border-none focus:outline-none"
          onChange={(e) => setInputSoil(e.target.value)}
          value={inputSoil}
        />
        {inputSoil && (
          <Button
            onPress={handleAdd}
            polygon={Rexagon}
            strokeWidth={0}
            variant="solid"
            className="h-[39.25px] w-[84.08px] bg-[#F4EB22]"
          >
            <p className="text-bse font-bold text-[#100E1A]">add</p>
          </Button>
        )}
      </div>
    </section>
  )
}

interface SoilPageProps {}

export default SoilPage
