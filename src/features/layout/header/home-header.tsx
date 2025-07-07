'use client'

import { Logo } from '@/components/atoms/logo/logo'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import UserButton from './user-button'
import Link from 'next/link'

export default function HomeHeader() {
  return (
    <header className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-center bg-transparent">
      <div className="z-0 relative px-8 flex h-full w-full max-w-[1440px] items-center justify-between gap-5 bg-black/70">
        <Link href={'/'} className="hidden md:block">
          <Logo className="z-50 h-auto w-[130px] text-color-2" />
        </Link>

        <div className="relative w-full md:w-[75%] overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: '0%' }}
            animate={{ x: '-185%' }}
            transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
          >
            <p className="text-color-2 font-semibold text-lg">
              🌱 Hope sprouting in the Garden, with a 60% chance of Breakthroughs! 🌿 Self-trust
              +14% | 🌊 Anxiety -8% | 🌞 Joy surging New Wellgorithm challenge unlocked:
              Sapiens—spend 24 hours believing you&apos;re missing out on nothing.
            </p>
            <p className="text-color-2 font-semibold text-lg">
              🌱 Hope sprouting in the Garden, with a 60% chance of Breakthroughs! 🌿 Self-trust
              +14% | 🌊 Anxiety -8% | 🌞 Joy surging New Wellgorithm challenge unlocked:
              Sapiens—spend 24 hours believing you&apos;re missing out on nothing.
            </p>
          </motion.div>
        </div>
        <div className="hidden md:block shrink-0">
          <UserButton />
        </div>
      </div>
    </header>
  )
}
