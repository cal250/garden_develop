'use client'
import React from 'react'
import { UploadButton } from './_components/upload-button'

const CocoonPage: React.FC<CocoonPageProps> = (props) => {
  return (
    <section className="mt-[-45px] flex flex-col items-center gap-[60px]">
      <div className="flex w-full max-w-[278px] items-center justify-between">
        <UploadButton onFileSelect={() => {}} text="your avatar" />
        <UploadButton onFileSelect={() => {}} text="your landscape" />
      </div>

      <p className="max-w-[700px] text-center text-xl font-bold text-white">
        Your avatar personalizes your journey. <br />
        Your landscape sets the stage for your transformation.
      </p>
    </section>
  )
}

interface CocoonPageProps {}

export default CocoonPage
