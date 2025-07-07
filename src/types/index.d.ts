declare type UserType = {
  firstName: string
  lastName: string
  introduction_text: string
  inspiration_text: string
  avatar: string
  title: string
  website: string
  linkedIn: string
  role: 'Gardener' | 'Activist' | 'Pest'
  email: string
  password: string
  confirmPassword: string
  emailVerificationToken: string
}

declare type ParsedRow = {
  [key: string]: string | number | boolean | object | null
}

declare type SearchParams = Record<string, string | string[] | undefined>

declare type ServerProps = {
  params?: Promise<SegmentParams>
  searchParams?: Promise<SearchParams>
}

declare type Stepper = { tooltip: string; path: string; isCompleted: boolean }