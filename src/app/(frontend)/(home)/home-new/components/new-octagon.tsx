'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
// import { newOctagonData } from '../_data/new-octagon-data'
import { createIcon } from '@/components/atoms/icons/utils/create-icon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import clsx from 'clsx'

// const FlowerIcon = createIcon<{ active?: boolean }>({
//   viewBox: '0 0 41 43',
//   path: ({ active }) => (
//     <>
//       <g clipPath="url(#clip0_9008_4309)">
//         <path
//           d="M15.0639 20.427C14.5583 23.217 16.4971 26.0821 19.2935 26.5889C22.0899 27.0957 24.8298 25.2012 25.395 22.422C25.9601 19.6429 24.0213 16.7778 21.2357 16.2116C18.3798 15.694 15.5803 17.5777 15.0639 20.427ZM32.3562 23.6837C36.3983 26.1329 36.7484 30.3042 34.7826 33.0134C32.4711 36.2731 28.9507 36.3707 24.4212 33.22C23.0903 38.1902 20.7452 40.2789 16.9754 39.7182C13.2055 39.1576 11.6129 36.4166 11.9375 30.8962C9.51585 32.0514 7.08787 32.2244 4.79338 30.6437C3.48378 29.7319 2.66598 28.4801 2.3292 26.9476C1.51449 23.3053 3.57212 20.4288 8.04323 19.1546C5.76521 17.8221 4.43849 15.9876 4.35487 13.3974C4.2776 11.7893 4.90355 10.37 5.98395 9.15571C8.51756 6.36546 11.9355 6.49444 15.9567 9.73696C16.1218 7.13055 16.9959 5.02049 19.32 3.72504C20.6821 2.99094 22.2069 2.71549 23.7323 3.11458C27.4971 4.04215 28.9599 6.82098 28.2132 11.9583C30.3968 10.76 32.5868 10.5438 34.7781 11.6767C36.2985 12.4427 37.2461 13.6567 37.7506 15.2809C39.0413 19.0095 37.1729 21.859 32.3562 23.6837Z"
//           fill='rgb(var(--color-2))'
//         />
//         <path
//           d="M19.6292 26.7725C22.5866 27.3085 25.4175 25.3511 25.9522 22.4006C26.487 19.4501 24.5231 16.6237 21.5657 16.0877C18.6084 15.5517 15.7774 17.5091 15.2427 20.4596C14.7079 23.4101 16.6718 26.2365 19.6292 26.7725Z"
//           fill={active ? '#F469B5' : 'rgb(var(--color-6))'}
//           stroke="white"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_9008_4309">
//           <rect
//             width="34.2"
//             height="37.24"
//             fill="white"
//             transform="translate(6.64062) rotate(10.2727)"
//           />
//         </clipPath>
//       </defs>
//     </>
//   ),
// })

const FlowerIcon = createIcon<{ active?: boolean }>({
  viewBox: '0 0 45 46',
  path: ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="46" fill="none" viewBox="0 0 45 46">
      <path
        fill={active ? 'rgb(var(--color-1))' : 'rgb(var(--color-13))'}
        stroke="#F469B5"
        d="M24.89 27.56a5.267 5.267 0 0 0 3.161-6.744 5.267 5.267 0 0 0-6.75-3.146 5.267 5.267 0 0 0-3.163 6.744 5.267 5.267 0 0 0 6.751 3.146Z"
      ></path>
      <path
        fill={active ? 'rgb(var(--color-4))' : 'rgb(var(--color-12))'}
        stroke="#fff"
        strokeWidth={active ? '2' : '0'}
        d="M14.277 39.03h.005c2.556.195 4.523-.82 6.029-2.464 1.05 1.763 2.206 3.067 3.533 3.832 1.713.987 3.566.997 5.509.221 1.932-.771 3.275-2.03 3.887-3.856.484-1.445.477-3.149.087-5.083 2.164.025 3.992-.353 5.398-1.214 1.745-1.068 2.694-2.79 2.892-4.978.333-3.34-1.763-6.685-5.751-7.524 1-1.53 1.581-3.039 1.648-4.505.09-1.974-.758-3.699-2.39-5.107-1.39-1.27-3.03-1.935-4.967-1.819-2.138.11-3.815 1.013-5.103 2.467-.838-1.62-1.835-2.852-3.045-3.629-1.627-1.044-3.485-1.172-5.495-.583-1.75.49-3.083 1.646-3.974 3.102l-.004.006-.003.007c-1.21 2.041-1.226 4.061-.59 6.016-1.853-.095-3.465.17-4.778.843-1.749.899-2.834 2.456-3.267 4.492l-.002.01c-.352 1.739-.176 3.51.841 5.082 1.174 1.87 2.812 2.902 4.763 3.295-.913 1.285-1.466 2.621-1.603 3.965-.196 1.907.459 3.7 1.86 5.213 1.196 1.3 2.723 2.066 4.52 2.211Zm9.902-12.402c-2.057.746-4.512-.423-5.265-2.498-.761-2.099.37-4.473 2.503-5.254 2.095-.704 4.533.485 5.233 2.549.71 2.097-.403 4.453-2.47 5.203Z"
      ></path>
    </svg>
  ),
})

export const NewOctagon: React.FC<NewOctagonProps> = ({
  currentHeaderIndex,
  setCurrentHeaderIndex,
  octagonData,
  setAnimationActive,
}) => {
  // const [currentIndex, setCurrentIndex] = useState(3)

  // const data = ['tending', '', '', 'weaves', 'seeds', 'seasons', 'gardens', 'wellgorithms']

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => {
  //       if (prevIndex === 7) {
  //         setCurrentHeaderIndex(0)
  //         return 0
  //       }
  //       if (prevIndex === 0) {
  //         setCurrentHeaderIndex(3)
  //         return 3
  //       } // Skip 1 and 2 after reaching 8
  //       setCurrentHeaderIndex(prevIndex + 1)
  //       return prevIndex + 1
  //     })
  //   }, 4000) // Change every six seconds

  //   return () => clearInterval(interval)
  // }, [])

  // const newOctagonData: Array<WedgeData> = data.map((flower, index) => ({
  //   boundary: {
  //     left: index === 1 ? { strokeWidth: 4 } : undefined,
  //     right: index === 2 ? { strokeWidth: 4 } : undefined,
  //     outer:
  //       index === currentIndex ? { strokeWidth: 0, className: 'shadow-yellow-glow' } : undefined,
  //   },
  //   className:
  //     index === 1 || index === 2
  //       ? 'bg-[#65438A]'
  //       : index === currentIndex
  //         ? 'bg-[#F469B5] shadow-yellow'
  //         : '',
  //   hasFloatingLayer: index === currentIndex,
  //   floatingLayerClassName:
  //     index === 0
  //       ? `opacity-60 shadow-yellow`
  //       : index === 3
  //         ? `opacity-60 shadow-yellow`
  //         : index === 4
  //           ? `opacity-50 shadow-yellow`
  //           : index === 5
  //             ? `opacity-30 shadow-yellow`
  //             : index === 6
  //               ? `opacity-30 shadow-yellow`
  //               : index === 7
  //                 ? `opacity-60 shadow-yellow`
  //                 : index === 1
  //                   ? `opacity-0`
  //                   : index === 2
  //                     ? `opacity-0`
  //                     : '',
  //   segments: [
  //     {
  //       content: flower ? (
  //         <div>
  //           <h1
  //             className={clsx('text-sm font-extrabold text-color-1 md:text-xl', {
  //               'text-white': index === currentIndex,
  //             })}
  //           >
  //             {flower}
  //           </h1>
  //         </div>
  //       ) : (
  //         <div />
  //       ),
  //     },
  //     {
  //       content: flower ? (
  //         <FlowerIcon className="h-8 w-8" active={index === currentIndex} />
  //       ) : (
  //         <div />
  //       ),
  //     },
  //   ],
  // }))

  function onSegmentClick(index: number, wedgeIndex: number) {
    console.log({ index, wedgeIndex })

    if (wedgeIndex === 0 || wedgeIndex === 1) return

    setCurrentHeaderIndex(wedgeIndex)
    setAnimationActive(false)
  }

  const newOctagonData: Array<WedgeData> = useMemo(() => {
    return octagonData.map((flower, index) => ({
      boundary: {
        // left: index === 1 ? { strokeWidth: 4 } : undefined,
        // right: index === 2 ? { strokeWidth: 4 } : undefined,
        outer:
          index === currentHeaderIndex
            ? { strokeWidth: 0, stroke: '#ffffff', className: 'shadow-yellow' }
            : undefined,
      },
      className: index === currentHeaderIndex ? 'bg-color-2 shadow-yellow' : '',
      hasFloatingLayer: index === currentHeaderIndex,
      floatingLayerClassName:
        index === 2 || index === 7
          ? 'opacity-70 shadow-yellow z-0'
          : index === 3 || index === 6
            ? 'opacity-60 shadow-yellow z-0'
            : index === 4 || index === 5
              ? 'opacity-30 shadow-yellow'
              : index === 0 || index === 1
                ? 'opacity-0'
                : '',
      segments: [
        {
          content: flower ? (
            <div>
              <h1
                className={clsx('text-sm font-extrabold text-color-1 md:leading-[21.94px]', {
                  '!text-[#F469B5]': index === currentHeaderIndex,
                })}
              >
                {flower.name}
              </h1>
            </div>
          ) : (
            <div />
          ),
        },
        {
          content: flower ? (
            <FlowerIcon className="h-8 w-8" active={index === currentHeaderIndex} />
          ) : (
            <div />
          ),
        },
      ],
    }))
  }, [octagonData, currentHeaderIndex])

  return (
    <RadialPolygon
      sides={8}
      data={newOctagonData}
      rotation={45}
      numLayers={2}
      coreSize={0.43}
      onSegmentClick={onSegmentClick}
      classNames={{
        floatingLayer: 'bg-color-2 shadow-lg',
      }}
      boundary={{
        radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
        outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
      }}
      style={{
        background:
          'conic-gradient(from 89.99deg at 50% 50%, #442E5D 0deg, #482B6A 175.94deg, #6B4596 222.83deg, #8759BA 269.34deg, #7E52AF 315.38deg, #442E5D 360deg)',
      }}
    >
      <img
        alt="banner"
        src="/assets/home/banner.png"
        className="h-full object-cover object-bottom"
      />
    </RadialPolygon>
  )
}

interface NewOctagonProps {
  currentHeaderIndex: number
  octagonData: any[]
  setCurrentHeaderIndex: Dispatch<SetStateAction<number>>
  setAnimationActive: Dispatch<SetStateAction<boolean>>
}
