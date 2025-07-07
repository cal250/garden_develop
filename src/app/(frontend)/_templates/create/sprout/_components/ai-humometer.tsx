import React, { useEffect, useState } from 'react'
import { Slider } from '@/components/atoms/slider'
import { twMerge } from 'tailwind-merge'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { useListData } from '@react-stately/data'

const HumometerSlider: React.FC<HumometerSliderProps> = ({ parameter, onValueChange, value }) => {
  const [valueChanged, setValueChanged] = useState(false)

  return (
    <div key={parameter} className="flex flex-col gap-2">
      <span className="pl-20 text-[20px] font-bold">{parameter}</span>
      <div className="relative">
        <RegularPolygon
          sides={8}
          className={twMerge(
            'font-bold text-[16px] size-[48px] absolute left-0 top-1/2 -translate-y-1/2 bg-[#564A8D] z-10 -translate-x-1/2',
            valueChanged ? 'bg-color-2 text-[#564A8D]' : '',
          )}
          stroke="#825FA3"
        >
          me
        </RegularPolygon>
        <RegularPolygon
          sides={8}
          className={twMerge(
            `font-bold text-[16px] size-[48px] absolute right-0 top-1/2 -translate-y-1/2 bg-[#564A8D] z-10 translate-x-1/2`,
            valueChanged ? 'bg-[#14DEB2] text-white' : '',
          )}
          stroke={valueChanged ? 'white' : '#825FA3'}
        >
          AI
        </RegularPolygon>
        <Slider
          minValue={0}
          maxValue={100}
          value={value}
          onChange={(value) => {
            setValueChanged(true)
            onValueChange(value as number)
          }}
          classNames={{
            track: twMerge(
              'bg-[#564A8D80] border border-[4px] border-[#825FA3] h-[26px]',
              valueChanged ? 'bg-[#14DEB2] border border-[4px] border-white' : '',
            ),
            filler: valueChanged
              ? 'bg-color-2 border border-[4px] border-[#825FA3] absolute h-[calc(100%_+_8px)] top-[-4px]'
              : 'bg-[#564A8D80]',
          }}
          renderThumb={(props) => {
            return (
              <RegularPolygon
                sides={8}
                {...props}
                className={twMerge(
                  props.className,
                  'border-none size-[60px] bg-[#564A8D] before:hidden after:hidden',
                  valueChanged ? 'bg-[#F6AA22]' : '',
                )}
                stroke={valueChanged ? 'rgb(var(--color-2))' : 'white'}
              >
                <span className="text-[20px] font-bold">{valueChanged ? value : ''}</span>
              </RegularPolygon>
            )
          }}
        />
      </div>
    </div>
  )
}

interface HumometerSliderProps {
  parameter: string
  onValueChange: (value: number) => void
  value: number
}

export const AiHumometer: React.FC<AiHumometerProps> = (props) => {
  const { items, update, getItem } = useListData<{ id: string; value: number }>({
    initialItems: props.parameters.map((parameter) => ({ id: parameter, value: 50 })),
    getKey: (item) => item.id,
  })

  useEffect(() => {
    const total = items.reduce((acc, cur) => acc + cur.value, 0)

    props.onValueChange?.(Math.round(total / items.length))
  }, [items, props.onValueChange])

  return (
    <div className={twMerge('w-full flex flex-col gap-4', props.className)}>
      {props.parameters.map((parameter, index) => {
        return (
          <HumometerSlider
            parameter={parameter}
            value={getItem(parameter)?.value ?? 0}
            key={index}
            onValueChange={(value) => update(parameter, { id: parameter, value })}
          />
        )
      })}
    </div>
  )
}

interface AiHumometerProps {
  parameters: Array<string>
  className?: string
  onValueChange?: (value: number) => void
}
