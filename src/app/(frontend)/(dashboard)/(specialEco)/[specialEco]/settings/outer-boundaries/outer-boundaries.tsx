'use client'

import OuterBoundariesInput from './outer-boundaries-input'
import OuterBoundariesOctagon from './outer-boundaries-octagon'
import { useRef, useState } from 'react'
import { Flower } from '@/components/organisms/flower-picker/useFlowerSections'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Cocoon, Tag } from '@/payload-types'
import queryClient from '@/components/utils/react-query-client'
import { throttle } from 'lodash'

export default function OuterBoundaries({ cocoon, tags }: { cocoon: Cocoon; tags: Tag[] }) {
  const specialEco = useParams()?.specialEco as string
  queryClient.setQueryData(['tags'], tags)

  const defaultOuterBoundaries = Array(8).fill(null)
  
  // Place each boundary at its proper position in the array
  cocoon.outerBoundaries?.forEach((boundary) => {
    const position = boundary.position as number | undefined;
    if (position !== undefined && position !== null && position < 8) {
      defaultOuterBoundaries[position] = boundary.id ?? null
    }
  })

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState(0)
  const [outerBoundaries, setOuterBoundaries] =
    useState<Array<string | null>>(defaultOuterBoundaries)

  const outerBoundariesMutation = useMutation({
    mutationFn: (outerBoundaries: Array<Flower | null>) => {
      return axios.patch(`/api/cocoon/${cocoon.id}`, {
        outerBoundaries,
      })
    },
  })

  const throttledUpdateOuterBoundariesRef = useRef(
    throttle((newBoundaries: Array<string | null>) => {
      outerBoundariesMutation.mutate(
        newBoundaries.map((boundary, index) => {
          if (!boundary) {
            return null
          }

          return {
            name: boundary ?? '',
            id: boundary ?? '',
            position: index,
          }
        }).filter((boundary) => boundary !== null),
      )
    }, 3500, { leading: false, trailing: true })
  )

  const handleSelectBoundary = (boundary: string) => {
    setOuterBoundaries((prev) => {
      const newBoundaries = [...prev]
      newBoundaries[currentWedgeIndex] = boundary

      throttledUpdateOuterBoundariesRef.current(newBoundaries)

      const firstEmptyWedgeIndex = newBoundaries.findIndex(
        (boundary) => typeof boundary !== 'string',
      )

      if (firstEmptyWedgeIndex !== -1) {
        setCurrentWedgeIndex(firstEmptyWedgeIndex)
      }

      return newBoundaries
    })
  }

  return (
    <div className="flex size-full flex-col items-center">
      <OuterBoundariesOctagon
        cocoon={cocoon}
        currentWedgeIndex={currentWedgeIndex}
        onSegmentClick={(_, wedgeIndex) => {
          setCurrentWedgeIndex(wedgeIndex)
        }}
        octagonData={outerBoundaries.map((boundary) => boundary ?? '')}
      />
      <OuterBoundariesInput
        outerBoundary={outerBoundaries[currentWedgeIndex]}
        onSelectBoundary={handleSelectBoundary}
        currentWedgeIndex={currentWedgeIndex}
      />
    </div>
  )
}
