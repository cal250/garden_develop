'use client'

import { DesignContextProvider } from '@/hooks/use-design-context'
import { ResetPasswordForm } from './reset-password-form'
import CommonBodyCard from '@/components/common-body-card'

const ResetPasswordClientPage: React.FC<ResetPasswordFormProps> = ({ token }) => {
  return (
    <DesignContextProvider stroke="rgb(var(--color-4))" strokeWidth={4}>
      <CommonBodyCard className="mt-[60px] mb-[60px] md:mb-0 flex-grow w-full h-full justify-normal">
        <div
          className={`h-full w-full mt-[-25px] sm:mt-[-30px] md:mt-[-36px] flex flex-col items-center gap-10`}
        >
          <ResetPasswordForm token={token} />

          {/* <div className="flex flex-col items-center gap-10 pb-[31.23px] sm:pb-[65.23px] md:pb-[120.26px]">
                <p className="font-bold text-base leading-[100%] text-center text-white">
                  how it works
                </p>
  
                <TutorialVideoCard stroke="#EDC3D7" strokeWidth={4} />
              </div> */}
        </div>
      </CommonBodyCard>
    </DesignContextProvider>
  )
}

export default ResetPasswordClientPage

interface ResetPasswordFormProps {
  token: string
}
