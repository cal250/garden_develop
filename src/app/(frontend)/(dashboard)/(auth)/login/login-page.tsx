'use client'

import { DesignContextProvider } from '@/hooks/use-design-context'
import { LoginForm } from './login-form'
import mobileAnimationData from './mobile-onboarding-animation.json'
import desktopAnimationData from './desktop-onboarding-animation.json'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CommonBodyCard from '@/components/common-body-card'
import dynamic from 'next/dynamic'

const LoginClientPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false)

  const Lottie = useMemo(() => dynamic(() => import('lottie-react'), { ssr: false }), [])

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  }

  return (
    <div className="relative font-extrabold flex h-full min-h-screen w-full max-w-[1440px] flex-col overflow-y-auto ">
      <div
        className="z-0 absolute left-0 top-0 pointer-events-none flex h-full w-full"
        style={{
          // backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundImage: 'url("/assets/auth/auth-bg.webp")',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backgroundBlendMode: 'soft-light',

          backgroundColor: 'rgb(var(--color-12))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'luminosity',
          opacity: 0.5,
        }}
      />

      <div className="z-10 min-h-[100dvh] flex w-full flex-col items-center overflow-y-hidden ">
        <div className="w-full pt-[150px] max-w-[500px] md:max-w-[701px] flex flex-col items-center gap-[8px] md:gap-2 px-4 mt-4">
          <p className="text-center text-[36px] leading-[48px] text-color-1 font-black hidden sm:block">
            welcome to your &#10096;<span className="text-color-13 scale-80">inner</span>
            &#10097;Garden.
          </p>
          <p className="sm:hidden flex flex-col items-center">
            <span className="font-bold text-color-1 text-[18px]">welcome to your</span>
            <span className="font-black text-color-1 text-[26px]">
              {' '}
              &#10096;<span className="text-color-13 scale-80">inner</span>
              &#10097;Garden.
            </span>
          </p>
          <p className="w-full text-center text-[16px] md:text-[24px] font-bold text-color-13 opacity-80 sm:opacity-100">
            where spirit meets tech, new worlds are born.
          </p>
        </div>

        <div className="relative w-full overflow-hidden min-h-[286px] block sm:hidden mt-[-32px]">
          <Lottie
            animationData={mobileAnimationData}
            loop={false}
            onComplete={handleAnimationComplete}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full min-w-[630px]"
          />
        </div>

        <div className="relative w-full overflow-hidden mb-5 min-h-[280px] hidden sm:block">
          <Lottie
            animationData={desktopAnimationData}
            loop={false}
            onComplete={handleAnimationComplete}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full scale-125"
          />
        </div>

        <div className="w-full h-full flex-grow min-h-[400px]">
          <DesignContextProvider stroke="rgb(var(--color-4))" strokeWidth={4}>
            <CommonBodyCard className="mb-[60px] md:mb-0 flex-grow w-full h-full justify-normal">
              <AnimatePresence>
                {animationComplete && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeIn',
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      className="text-base md:text-[22px] text-color-13 font-semibold text-center mb-[40px] max-w-[600px] px-4 md:px-0 mx-auto pt-10 leading-[30px]"
                    >
                      Where circle and square meet, the octagon is born — the symbol of balance, a
                      bridge between your inner and outer worlds. 
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="w-full flex flex-col items-center gap-10 px-4 mb-10 "
                    >
                      <LoginForm />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CommonBodyCard>
          </DesignContextProvider>
        </div>
      </div>
    </div>
  )
}

export default LoginClientPage
