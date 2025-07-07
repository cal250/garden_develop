'use client'

import NorthStarsInput from './north-stars-input'
import NorthStarsOctagon from './north-stars-octagon'
import { useRef, useState } from 'react'
import { Flower } from '@/components/organisms/flower-picker/useFlowerSections'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Cocoon, Tag } from '@/payload-types'
import queryClient from '@/components/utils/react-query-client'
import { throttle } from 'lodash'

export default function NorthStars({ cocoon, tags }: { cocoon: Cocoon; tags: Tag[] }) {
  const specialEco = useParams()?.specialEco as string
  queryClient.setQueryData([`cocoon-${specialEco}`], cocoon)
  queryClient.setQueryData(['tags'], tags)

  const defaultNorthStars = Array(8).fill(null)
  
  // Place each star at its proper position in the array
  cocoon.stars?.forEach((star) => {
    const position = star.position as number | undefined;
    if (position !== undefined && position !== null && position < 8) {
      defaultNorthStars[position] = star.id ?? null
    }
  })

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState(0)
  const [northStars, setNorthStars] = useState<Array<string | null>>(defaultNorthStars)

  const northStarsMutation = useMutation({
    mutationFn: (northStars: Array<Flower | null>) => {
      if (!cocoon) {
        throw new Error('Cocoon not found')
      }
      return axios.patch(`/api/cocoon/${cocoon.id}`, {
        stars: northStars,
      })
    },
  })

  const throttledUpdateNorthStarsRef = useRef(
    throttle((newStars: Array<string | null>) => {
      northStarsMutation.mutate(
        newStars.map((star, index) => {
          if (!star) {
            return null
          }

          return {
            name: star ?? '',
            id: star ?? '',
            position: index,
          }
        }).filter((star) => star !== null),
      )
    }, 3500, { leading: false, trailing: true })
  )

  const handleSelectNorthStar = (star: string) => {
    setNorthStars((prev) => {
      const newStars = [...prev]
      newStars[currentWedgeIndex] = star

      throttledUpdateNorthStarsRef.current(newStars)

      const firstEmptyWedgeIndex = newStars.findIndex((star) => typeof star !== 'string')

      if (firstEmptyWedgeIndex !== -1) {
        setCurrentWedgeIndex(firstEmptyWedgeIndex)
      }

      return newStars
    })
  }

  return (
    <div className="flex size-full flex-col items-center">
      <NorthStarsOctagon
        cocoon={cocoon}
        currentWedgeIndex={currentWedgeIndex}
        onSegmentClick={(_, wedgeIndex) => {
          setCurrentWedgeIndex(wedgeIndex)
        }}
        octagonData={northStars.map((star) => star ?? '')}
      />
      <NorthStarsInput
        northStar={northStars[currentWedgeIndex]}
        onSelectNorthStar={handleSelectNorthStar}
        currentWedgeIndex={currentWedgeIndex}
      />
    </div>
  )
}
