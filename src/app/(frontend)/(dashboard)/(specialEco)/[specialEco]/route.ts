import getCurrentCreator from '@/actions/get-current-creator'
// import handleEcosystemRedirect from '@/actions/handle-ecosystem-redirect'
// import { redirect } from 'next/navigation'
import { payload } from '@/utils/payload'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ specialEco: string }> },
) {
  const { specialEco } = await params

  const { creator } = await getCurrentCreator()

  if (!creator) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { docs: cocoon } = await payload.find({
    collection: 'cocoon',
    where: {
      creator: {
        equals: creator.id,
      },
      specialeco: {
        equals: specialEco,
      },
    },
  })

  const stepRoutes = [
    '/onboarding/landscape',
    '/onboarding/zone',
    '/onboarding/name',
    '/onboarding/bio',
    '/onboarding/grow',
  ]

  // if (cocoon.length === 0) {
  //   return NextResponse.redirect(
  //     new URL(`/${encodeURIComponent(specialEco)}/onboarding`, request.url),
  //   )
  // }

  if (!cocoon || cocoon.length === 0) {
    return NextResponse.redirect(new URL(`/onboarding-action`, request.url))
  }

  if (cocoon[0].step && cocoon[0].step < 5) {
    return NextResponse.redirect(
      new URL(`/${encodeURIComponent(specialEco)}${stepRoutes[cocoon[0].step - 1]}`, request.url),
    )
  }

  return NextResponse.redirect(new URL(`/${encodeURIComponent(specialEco)}/builder`, request.url))
}
