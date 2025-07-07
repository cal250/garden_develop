import RefreshIcon from '@/features/icons/refresh-icon'
import useSoilContentStore from '@/stores/soil-content-store'
import React from 'react'

function RefreshSoilPage() {
  const { resetSoil } = useSoilContentStore()
  return (
    <button type="button" onClick={resetSoil} className="w-10 bg-transparent text-color-1">
      <RefreshIcon />
    </button>
  )
}

export default RefreshSoilPage
