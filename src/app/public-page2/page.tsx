'use client'
import React from 'react'
import { Button } from '@/components/atoms/button'

const CreativityCompostFertilize = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#38254D] to-[#926BC0] flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full bg-[#2D1B3A] rounded-3xl shadow-lg p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="rounded-full bg-[#825FA3] w-24 h-24 flex items-center justify-center mb-2">
            {/* Avatar placeholder */}
            <span className="text-4xl text-white">👩‍🎨</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#F7D046] text-[#2D1B3A] font-bold px-3 py-1 rounded">
              creativity
            </span>
            <span className="bg-[#fff] text-[#2D1B3A] font-bold px-3 py-1 rounded">Compost</span>
          </div>
          <p className="text-white text-lg text-center">
            Let your spirit run free, blooming in every direction
          </p>
        </div>
        <div className="w-full bg-[#3E2A55] rounded-xl p-6 mb-6 flex flex-col items-center">
          <span className="text-[#F7D046] font-bold mb-4">fertilize</span>
          <p className="text-white text-center mb-6">Which words are nourishing your journey?</p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Button variant="solid" className="bg-[#825FA3] text-white">
              quantum
            </Button>
            <Button variant="solid" className="bg-[#825FA3] text-white">
              classical
            </Button>
            <Button variant="solid" className="bg-[#825FA3] text-white">
              special
            </Button>
          </div>
          <div className="flex gap-4 mb-6">
            <Button variant="solid" className="bg-[#F7D046] text-[#2D1B3A]">
              1 word
            </Button>
            <Button variant="solid" className="bg-[#F7D046] text-[#2D1B3A]">
              2 words
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="w-3 h-3 rounded-full bg-[#F7D046] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#fff] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#fff] inline-block"></span>
          </div>
        </div>
        <Button variant="solid" className="bg-[#F7D046] text-[#2D1B3A] font-bold w-full mt-4">
          share your sprout
        </Button>
      </div>
    </div>
  )
}

export default CreativityCompostFertilize
