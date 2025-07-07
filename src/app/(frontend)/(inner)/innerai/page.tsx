import { InnerAI } from '../_sections/inner-ai'

const NewHomePage = () => {
  return (
    <div className="relative flex h-full w-full max-w-[1440px] flex-col overflow-hidden">
      <div
        className="absolute left-0 top-0 pointer-events-none  flex h-full w-full flex-col bg-top bg-repeat-x"
        style={{
          backgroundImage: `url("/assets/inner/inner-banner.webp")`,
        }}
      />
      <InnerAI />
    </div>
  )
}

export default NewHomePage
