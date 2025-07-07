'use client'

import { useResponsiveValue } from '@/hooks/use-responsive-value'
import PrivateIcon from '@/features/icons/privacy-private-icon'
import PublicIcon from '@/features/icons/privacy-public-icon'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import getCocoon from '@/actions/get-cocoon'
import axios from 'axios'
import queryClient from '@/components/utils/react-query-client'
import CommonBodyCard from '@/components/common-body-card'
import { useState, useEffect } from 'react'
import { useAuth } from '@/features/providers/auth'

export interface PrivacyInputProps {}

export default function PrivacyInput() {
  const specialEco = useParams()?.specialEco as string
  const { user } = useAuth()

  const { data: cocoon } = useQuery({
    queryKey: [`cocoon-${specialEco}`],
    queryFn: () => getCocoon(specialEco),
  })

  // Local state for optimistic updates
  const [localPrivacy, setLocalPrivacy] = useState<'Public' | 'Private' | undefined>(undefined)

  // Sync local state with server data when it loads
  useEffect(() => {
    if (cocoon?.privacy) {
      setLocalPrivacy(cocoon.privacy as 'Public' | 'Private')
    }
  }, [cocoon?.privacy])

  const { mutate: setPrivacy, isError } = useMutation({
    mutationFn: async (privacy: 'Public' | 'Private') => {
      if (!cocoon) {
        throw new Error('Cocoon not found')
      }

      await axios.patch(`/api/cocoon/${cocoon.id}`, {
        privacy,
      })
    },
    // Optimistically update UI
    onMutate: (newPrivacy) => {
      // Set local state immediately for responsive UI
      setLocalPrivacy(newPrivacy)
    },
    onError: () => {
      // Revert to server state on error
      setLocalPrivacy(cocoon?.privacy as 'Public' | 'Private' | undefined)
    },
  })

  // Use local state for UI if available, fall back to server state
  const privacy = localPrivacy || cocoon?.privacy

  const headerCardHeight = useResponsiveValue({
    base: 51.42,
    sm: 70,
    md: 88.5,
  })

  return (
    <CommonBodyCard
      title={user?.username ?? ''}
      headerCardProps={{
        classNames: {
          outerTitle:
            'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-1',
        },
      }}
      className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 h-full flex-grow w-full justify-start"
    >
      <div
        style={{
          position: 'relative',
          top: `-${headerCardHeight / 2}px`,
        }}
        className={`mt-[55px] sm:mt-[70px] md:mt-[80px] w-full flex flex-col items-center relative top-[-${headerCardHeight / 2}px]`}
      >
        <div className="flex flex-col items-center gap-6 pt-8">
          <p className="text-base font-bold text-white text-center px-3 md:px-0">
            would you like your wellgorithm to be public or private?
          </p>

          <div className="min-h-[90px]">
            {privacy === 'Public' ? <PublicIcon /> : <PrivateIcon />}
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setPrivacy('Public')}
              className="flex flex-col items-center gap-6"
            >
              <p
                style={{
                  color: privacy === 'Public' ? 'rgb(var(--color-1))' : 'rgb(var(--color-2))',
                  fontWeight: privacy === 'Public' ? 'bold' : 'normal',
                }}
                className="text-center px-3 md:px-0 text-2xl hover:underline"
              >
                public
              </p>
            </button>
            <button
              onClick={() => setPrivacy('Private')}
              className="flex flex-col items-center gap-6"
            >
              <p
                style={{
                  color: privacy === 'Private' ? 'rgb(var(--color-1))' : 'rgb(var(--color-2))',
                  fontWeight: privacy === 'Private' ? 'bold' : 'normal',
                }}
                className="text-center px-3 md:px-0 text-2xl hover:underline"
              >
                private
              </p>
            </button>
          </div>
          {isError && (
            <p className="text-red-500 text-sm">
              Failed to update privacy settings. Please try again.
            </p>
          )}
        </div>
      </div>
    </CommonBodyCard>
  )
}
