'use client'

import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { usePathname } from 'next/navigation'

export const InnerAIFooter = () => {
  const pathname = usePathname()
  return (
    <div className="mt-10 md:mt-[57px] flex flex-col items-center gap-9">
      <div className="flex flex-col items-center gap-2.5">
      <h3 className="text-lg leading-[100%] sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white">
          subscribe to
        </h3>

        {pathname?.endsWith('/innervision') ? (
          <div className="flex items-start gap-0.5">
            <BracketedText
              outerText="Vision"
              bracketFill="#F6AA22"
              className="text-3xl leading-[100%] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-[#F6AA22]"
              classNames={{
                outerText:
                  'text-3xl leading-[100%] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-[#F6AA22]',
                brackets: 'h-6 sm:h-7 md:h-8 w-3 md:w-4',
              }}
            >
              inner
            </BracketedText>

            <sup className="font-normal text-xs text-white/80 mt-1.5 sm:mt-2 md:mt-2.5">™</sup>
          </div>
        ) : (
          <div className="flex items-start gap-1">
            <h1 className="text-3xl leading-[100%] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-color-6">
              innerAI
            </h1>
            <sup className="font-normal text-xs text-white/80 mt-1.5 sm:mt-2 md:mt-2.5">®</sup>
          </div>
        )}
      </div>

      <p className="max-w-[650px] px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-semibold">
        a weekly blast of AI-inspired Wellgorithms to warm your heart, deepen your mindfulness
        exercises, and share your journey with our community.
      </p>
    </div>
  )
}
