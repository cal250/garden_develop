'use client'
import React from 'react'
// import './styles.scss'

interface CellProps {
  cellData?: string
}

const Cell: React.FC<CellProps> = ({ cellData }) => {
  console.log(cellData)
  if (!cellData) return null

  if (typeof window === 'undefined') return null
  return <div className="chip" style={{ backgroundColor: cellData }} />
}

export default Cell
