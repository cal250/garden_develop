'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/atoms/icons'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { useAuth } from '@/features/providers/auth'
import useLandscapeStore from '@/stores/landscape-store'
import handleUploadFile from '../../_handlers/handle-upload-file'
import handleUpdateCocoon from '../../_handlers/handle-update-cocoon'
import handleCreateCocoon from '../../_handlers/handle-create-cocoon'
import UploadButton from '../../_components/upload-button'
import CommonBodyCard from '@/components/common-body-card'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
interface props {
  specialEco: string
  specialEcosystem: any
  cocoon: any
}
const OnboardingLandscapeClientPage = ({ specialEco, specialEcosystem, cocoon }: props) => {
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(cocoon?.image?.url)
  const [landscapeId, setLandscapeId] = useState<string>(cocoon?.landscape?.id ?? '')
  const [avatarId, setAvatarId] = useState<string>(cocoon?.image?.id ?? '')
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const [creatingCocoon, setCreatingCocoon] = useState(false)
  const [description, setDescription] = useState(
    'Make it yours—choose how you’ll be seen and the environment of your blooming.',
  )

  const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
    useStepperContentContext()
  const { setIsLoading, updateUrl, reset } = useLandscapeStore()

  const { user, setUser, isLoading } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })
  const innerOctagonSize = useResponsiveValue<string | number>({
    base: 180,
    sm: 200,
    md: 225,
  })

  const router = useRouter()

  async function handleAvatarSelect(file: File, previewUrl: string) {
    setDescription('Make it yours—choose how you’ll be seen and the environment of your blooming.')
    setAvatarUploading(true)
    // setAvatarFile(file)
    setAvatarPreviewUrl(previewUrl)

    const avatarFormData = new FormData()
    avatarFormData.append('file', file)

    try {
      setUploadErr('')
      const result = await handleUploadFile(avatarFormData)

      if (result) {
        setAvatarId(result.doc.id)

        if (user) {
          const res = await fetch(`/api/creator/${user?.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: result.doc.id }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })

          const userResult = await res.json()
          // console.log(userResult, 'This is user result')
          setUser(userResult.doc)
        } else {
          setUploadErr('No user found!')
        }
      }
    } catch (error) {
      // Safely log the error message
      if (error instanceof Error) {
        console.log(error.message, 'Checking the error')
        // setLoginErr('Error logging in')
      } else {
        console.log('An unknown error occurred:', error)
      }
    } finally {
      setAvatarUploading(false)
    }
  }

  async function handleLandscapeSelect(file: File, previewUrl: string) {
    setDescription('Make it yours—choose how you’ll be seen and where your journey begins.')
    setIsLoading(true)

    const landscapeFormData = new FormData()
    landscapeFormData.append('file', file)

    try {
      setUploadErr('')
      const result = await handleUploadFile(landscapeFormData)

      if (result) {
        // console.log(result)
        setLandscapeId(result.doc.id)
        updateUrl(previewUrl)
      }
    } catch (error) {
      // Safely log the error message
      if (error instanceof Error) {
        console.log(error.message, 'Checking the error')
        // setLoginErr('Error logging in')
      } else {
        console.log('An unknown error occurred:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handleBack() {
    router.push(`/onboarding-action`)
  }

  function cb() {
    setStepperContent((prev) =>
      prev.map((step) => {
        if (step.tooltip === 'landscape') {
          return {
            ...step,
            isCompleted: true,
          }
        }
        return step
      }),
    )

    if (!cocoon) {
      setCurrentStep(2)
    } else {
      setCurrentStep(Number(cocoon?.step) < 2 ? 2 : Number(cocoon.step))
    }

    router.push(`/${specialEco}/onboarding/zone`)
  }

  async function handleNext() {
    if (landscapeId && avatarId) {
      if (cocoon) {
        setCreatingCocoon(true)
        setUploadErr('')

        const payload = {
          image: avatarId,
          landscape: landscapeId,
        }

        try {
          const result = await handleUpdateCocoon({ payload, id: cocoon.id })

          if (result) {
            cb()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setCreatingCocoon(false)
        }
      } else {
        setCreatingCocoon(true)
        setUploadErr('')

        const payload = {
          specialeco: specialEco,
          creator: user?.id,
          name: specialEcosystem?.ecosystem?.name,
          description: specialEcosystem?.ecosystem?.description,
          image: avatarId,
          landscape: landscapeId,
          step: 2,
        }

        try {
          const result = await handleCreateCocoon(payload)

          if (result) {
            cb()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setCreatingCocoon(false)
        }
      }
    } else {
      setUploadErr('Please upload both avatar and landscape')
    }
  }

  useEffect(() => {
    if (cocoon) {
      if (!cocoon?.image?.id) {
        setAvatarId(user?.avatar?.id as string)
      }

      if (cocoon?.landscape?.url) {
        updateUrl(cocoon?.landscape?.url)
      } else if (specialEcosystem?.image?.url) {
        updateUrl(specialEcosystem.image.url)
        setLandscapeId(specialEcosystem.image.id)
      } else {
        reset()
      }
      setCurrentStep(cocoon.step ? cocoon.step : 1)
    } else {
      setAvatarId(user?.avatar?.id as string)
      if (specialEcosystem?.image?.url) {
        updateUrl(specialEcosystem.image.url)
        setLandscapeId(specialEcosystem.image.id)
      } else {
        reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocoon, specialEcosystem])

  return (
    <div className="flex size-full flex-col items-center">
      <div
        style={{ width: octagonSize, height: octagonSize }}
        className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center gap-[57.85px]"
      >
        <RadialPolygon
          sides={8}
          rotation={45}
          numLayers={2}
          coreSize={0.43}
          boundary={{
            radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
            chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
            inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
            outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 5 },
          }}
          style={{
            width: octagonSize,
            height: octagonSize,
            background:
              'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
          }}
        >
          {avatarUploading ? (
            <div className="h-full w-full flex items-center justify-center">
              {/* <LoaderCircle /> */}
            </div>
          ) : (
            <img
              alt="banner"
              src={
                avatarPreviewUrl
                  ? avatarPreviewUrl
                  : user?.avatar?.url
                    ? user?.avatar?.url
                    : '/assets/onboarding/bee.png'
              }
              className="h-full object-cover object-center"
              style={{
                width: innerOctagonSize,
              }}
            />
          )}
        </RadialPolygon>

        {/* <RegularOctagon
          strokeWidth={5}
          stroke="rgb(var(--color-4))"
          style={{
            width: octagonSize,
            height: octagonSize,
            background:
              'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
          }}
        >
          
          <RegularOctagon
            strokeWidth={5}
            stroke="rgb(var(--color-4))"
            className="flex flex-col"
            style={{
              width: innerOctagonSize,
            }}
          >
            {avatarUploading ? (
              <div className="h-full w-full flex items-center justify-center">
               
              </div>
            ) : (
              <img
                alt="banner"
                src={
                  avatarPreviewUrl
                    ? avatarPreviewUrl
                    : user?.avatar?.url
                      ? user?.avatar?.url
                      : '/assets/onboarding/bee.png'
                }
                className="h-full object-cover object-center"
                style={{
                  width: innerOctagonSize,
                }}
              />
            )}
          </RegularOctagon>
        </RegularOctagon> */}
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={['inner', 'Landscape']}
          headerCardType="bracketed"
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[100px] h-full flex-grow w-full justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 items-center justify-between relative">
            <div
              className="hidden absolute m-auto w-full md:flex justify-between z-40"
              style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
            >
              <RegularPolygon
                as="button"
                type="button"
                disabled={creatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
                stroke={creatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleBack}
                style={{
                  transform: `translateX(calc(-50% - 8px))`,
                }}
              >
                <ArrowLeftIcon
                  className={twMerge(
                    `size-[28px] `,
                    creatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
              <RegularPolygon
                as="button"
                type="button"
                disabled={creatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
                stroke={creatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleNext}
                style={{
                  transform: `translateX(calc(50% + 8px))`,
                }}
              >
                <ArrowRightIcon
                  className={twMerge(
                    `size-[28px] `,
                    creatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
            </div>

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center gap-10 md:gap-[60px]">
              <p className="max-w-[450px] px-4 md:px-0 text-center text-lg font-bold text-white">
                {description}
              </p>

              <div className="flex items-center justify-center gap-[89px] sm:gap-[120px] md:gap-[158px]">
                <UploadButton
                  onFileSelect={handleAvatarSelect}
                  text="avatar"
                  disable={creatingCocoon || isLoading}
                />

                <UploadButton
                  onFileSelect={handleLandscapeSelect}
                  text="landscape"
                  disable={creatingCocoon || isLoading}
                />
              </div>

              {uploadErr && (
                <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
                  {uploadErr}
                </p>
              )}
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              <RegularPolygon
                as="button"
                type="button"
                disabled={creatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={creatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleBack}
              >
                <ArrowLeftIcon
                  className={twMerge(
                    `size-3 `,
                    creatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>

              <Rexagon
                className="bg-color-1 pl-4 pr-4 h-[37.81px] z-10 flex items-center gap-1"
                tipAngle={100}
                strokeWidth={0}
                overflow={true}
              >
                {stepperContent.map((stepper, index) => {
                  if (index === 0) {
                    return (
                      <div key={index} className="relative">
                        <RegularPolygon
                          sides={6}
                          className="w-[50px] h-[38px] bg-color-4"
                          stroke="rgb(var(--color-4))"
                          strokeWidth={0}
                        >
                          <span className="text-color-1 font-black text-[20px]">{index + 1}</span>
                        </RegularPolygon>
                        <span className="absolute top-[-15px] left-1/2 -translate-x-1/2 ">
                          <p className="text-color-1 font-black text-xs leading-[100%]">
                            {stepper.tooltip}
                          </p>
                        </span>
                      </div>
                    )
                  }

                  return (
                    <button
                      type="button"
                      onClick={() => router.push(`${stepper.path}`)}
                      key={index}
                      disabled={!stepper.isCompleted && currentStep < index + 1}
                      className={twMerge(
                        'z-50 w-8 h-8 flex disabled:opacity-30 cursor-pointer items-center justify-center text-color-2 font-black text-[20px]',
                      )}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </Rexagon>

              <RegularPolygon
                as="button"
                type="button"
                disabled={creatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={creatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon
                  className={twMerge(
                    `size-3 `,
                    creatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default OnboardingLandscapeClientPage
