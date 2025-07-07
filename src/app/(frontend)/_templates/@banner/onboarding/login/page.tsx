import React from 'react'

const LoginPageBanner: React.FC<LoginPageBannerProps> = (props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-12 mt-[23px]" >
      <p className="text-center text-[36px] md:text-[31.27px] leading-[36px] md:leading-[38.12px] text-[#F2EB2E] font-black max-w-[601px]">
        become the master gardener of your psyche
      </p>
      <p className="text-center text-[14px] md:text-[16px] leading-[16px] md:leading-[22px] text-white font-semibold max-w-[443px] self-center">
        Enter a space where words evolve into worlds. Where struggles become seeds of
        transformation. Where your personalized cocoons take shape - each a portal into your
        evolving self.
      </p>
    </div>
  )
}

interface LoginPageBannerProps {}


export default LoginPageBanner;
