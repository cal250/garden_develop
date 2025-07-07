'use client'
import React, { useEffect, useState } from 'react'
// import './logo.scss'

export const Logo = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, []);

  if (isClient) {
  return (

  <div className="logo">
    <img
      src="/logo.svg"
      style={{
        width: 250,
        margin: 'auto',
      }}
      alt="TRBL Design Logo"
    />
  </div>
)
}
}
export default Logo
