'use client'
import React from 'react'
import { Button } from '@/components/atoms/button'

const CreativityCompostHumometer = () => {
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
        <div className="w-full bg-[#3E2A55] rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#F7D046] font-bold">gut humometer</span>
            <span className="text-xs text-[#F7D046]">
              How much is your gut calling you: how much from 0?
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white">big idea</span>
              <input type="range" min="0" max="10" className="w-2/3" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">main points</span>
              <input type="range" min="0" max="10" className="w-2/3" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">facts and favorites</span>
              <input type="range" min="0" max="10" className="w-2/3" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">editing</span>
              <input type="range" min="0" max="10" className="w-2/3" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">final polish</span>
              <input type="range" min="0" max="10" className="w-2/3" />
            </div>
          </div>
        </div>
        <Button variant="solid" className="bg-[#F7D046] text-[#2D1B3A] font-bold w-full mt-4">
          next
        </Button>
      </div>
    </div>
  )
}

export default CreativityCompostHumometer
