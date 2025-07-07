import { AiWakening } from './home-new/_sections/ai-wakening'
import BigBloom from './home-new/_sections/big-bloom'
import { GardenersOfThePsyche } from './home-new/_sections/gardeners-of-the-psyche'
import { GreenLanguage } from './home-new/_sections/green-language'
import { WellgorithmsFeed } from './home-new/_sections/wellgoriths-feed'

const NewHomePage = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <BigBloom />
      <GardenersOfThePsyche />
      <WellgorithmsFeed />
      <AiWakening />
      <GreenLanguage />
    </section>
  )
}

export default NewHomePage
