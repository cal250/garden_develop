'use client'
import React, { useState } from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { FlowerPicker } from '@/components/organisms/flower-picker/flower-picker'
import { Button } from '@/components/atoms/button'
import { IntegralIcon } from '@/components/atoms/icons'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'

const Page: React.FC<PageProps> = (props) => {
  const [words, setWords] = useState([
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

  const { words: selectedWords, updateWords } = useWordsContext()

  const [inputWord, setInputWord] = useState('')

  function handleAdd() {
    setWords([...words, { id: inputWord, name: inputWord }])
    setInputWord('')
  }
  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <Rexagon
        className="h-[88px] w-[607px] text-[36px] font-black"
        style={{
          background:
            'radial-gradient(39.95% 82.08% at 56.81% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
        }}
      >
        <div className="grid grid-cols-2 items-center w-full gap-[40px]">
          <span className="justify-self-end">{selectedWords[0]}</span>
          <IntegralIcon className="absolute h-full text-color-2 scale-[2] left-1/2 -translate-x-1/2" />
          <span className="justify-self-start">{selectedWords[1]}</span>
        </div>
      </Rexagon>
      <FlowerPicker
        flowers={words}
        selectedKeys={selectedWords}
        onSelectionChange={(keys: any) => {
          const selected = Array.from(keys) as Array<string>
          updateWords(selected)
        }}
        itemClasses={{
          base: [
            'text-sm text-[#F2EB2E] font-black bg-[#8858B5] data-[selected=true]:bg-[#8858B5] data-[selected=true]:text-[#F2EB2E] data-[selected=true]:border-[4px] data-[selected=true]:border-[#F2EB2E]',
          ],
        }}
      />
      <div className="flex items-center gap-4">
        <input
          placeholder="| create your own"
          className="border-none bg-transparent text-center text-base font-black text-white placeholder:text-white focus:border-none focus:outline-none"
          onChange={(e) => setInputWord(e.target.value)}
          value={inputWord}
        />
        {inputWord && (
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

interface PageProps {}

export default Page
