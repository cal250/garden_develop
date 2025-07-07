'use client'

import InnerBoundariesInput from './inner-boundaries-input'
import InnerBoundariesOctagon from './inner-boundaries-octagon'
import { useRef, useState } from 'react'
import { Flower } from '@/components/organisms/flower-picker/useFlowerSections'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Cocoon, Tag } from '@/payload-types'
import queryClient from '@/components/utils/react-query-client'
import { useParams } from 'next/navigation'
import { throttle } from 'lodash';

export default function InnerBoundaries({cocoon,tags}: {cocoon: Cocoon; tags: Tag[];}) {
  const specialEco = useParams()?.specialEco as string
  queryClient.setQueryData(['tags'], tags)

  const defaultInnerBoundaries = Array(8).fill(null)
  
  // Place each boundary at its proper position in the array
  cocoon.innerBoundaries?.forEach((boundary) => {
    const position = boundary.position as number | undefined;
    if (position !== undefined && position !== null && position < 8) {
      defaultInnerBoundaries[position] = boundary.id ?? null
    }
  })

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState(0)
  const [innerBoundaries, setInnerBoundaries] =
    useState<Array<string | null>>(defaultInnerBoundaries)

  const innerBoundariesMutation = useMutation({
    mutationFn: (innerBoundaries: Array<Flower | null>) => {
      return axios.patch(`/api/cocoon/${cocoon.id}`, {
        innerBoundaries,
      })
    },
  })

  const throttledUpdateInnerBoundariesRef = useRef(
  throttle((newBoundaries: Array<string | null>) => {
    innerBoundariesMutation.mutate(
      newBoundaries.map((boundary,index) => {
        if(!boundary) {
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
          setInnerBoundaries((prev) => {
            const newBoundaries = [...prev]
            newBoundaries[currentWedgeIndex] = boundary

            throttledUpdateInnerBoundariesRef.current(newBoundaries)

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
      <InnerBoundariesOctagon
        cocoon={cocoon}
        currentWedgeIndex={currentWedgeIndex}
        onSegmentClick={(_, wedgeIndex) => {
          setCurrentWedgeIndex(wedgeIndex)
        }}
        octagonData={innerBoundaries.map((boundary) => boundary ?? '')}
      />
      <InnerBoundariesInput
        innerBoundary={innerBoundaries[currentWedgeIndex]}
        onSelectBoundary={handleSelectBoundary}
      />
    </div>
  )
}
