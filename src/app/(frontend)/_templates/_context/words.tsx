import { createContext } from '@/components/utils/react/context'

interface Props {
  words: Array<string>
  updateWords: (words: Array<string>) => void
}

const [Provider, useWordsContext] = createContext<Props>({
  name: 'WordsProvider',
})

export { Provider as WordsProvider, useWordsContext }
