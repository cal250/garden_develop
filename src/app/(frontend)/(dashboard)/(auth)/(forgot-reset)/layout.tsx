export default async function ForgotResetLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative font-extrabold flex h-full min-h-screen w-full max-w-[1440px] flex-col overflow-y-auto ">
      <div
        className="z-0 absolute left-0 top-0 pointer-events-none  flex h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundImage: 'url("/assets/onboarding/onboarding-bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light',
        }}
      />

      <div className="z-10 min-h-[100dvh] flex w-full flex-col items-center overflow-y-hidden ">
        <div className="w-full mt-[150px] max-w-[500px] md:max-w-[650px] flex flex-col items-center gap-[19px] md:gap-[28px] px-4">
          <p className="text-center text-[28px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#F2EB2E] font-black">
            become the master gardener of your psyche
          </p>
          <p className="w-full max-w-[500px] text-center text-[16px] md:text-[16px] leading-[22px] md:leading-[24px] text-white font-semibold">
            Enter a space where words evolve into worlds. Where struggles become seeds of
            transformation. Where your personalized cocoons take shape - each a portal into your
            evolving self.
          </p>
        </div>

        <div className="w-full h-full flex-grow">{children}</div>
      </div>
    </div>
  )
}
