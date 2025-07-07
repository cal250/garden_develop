'use client'
import React, { useEffect, useState } from 'react'
// import './icon.scss'

export const Icon = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, []);

  if (isClient) {
  return (

  <div className="icon" style={{ width: 150 }}>
    <img src="/icon.svg" alt="Inner Garden Icon" />
  </div>
)
  }}
export default Icon
