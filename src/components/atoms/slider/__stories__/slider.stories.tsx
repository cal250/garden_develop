import React from 'react'
import { Meta } from '@storybook/react'
import { cn, slider } from '@nextui-org/theme'
import { InfoIcon, VolumeHighBoldIcon, VolumeLowBoldIcon } from '@nextui-org/shared-icons'
import { Tooltip } from '../../tooltip'

import { Slider, SliderProps, SliderValue } from '../index'

export default {
  title: 'Components/Atoms/Slider',
  component: Slider,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    fillOffset: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'select' },
      options: ['foreground', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    showTooltip: {
      control: {
        type: 'boolean',
      },
    },
    step: {
      control: {
        type: 'number',
      },
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
    },
    showSteps: {
      control: {
        type: 'boolean',
      },
    },
    startContent: {
      table: {
        disable: true,
      },
    },
    endContent: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Slider>

const defaultProps = {
  ...slider.defaultVariants,
}

const VerticalTemplate = (args: SliderProps) => (
  <div className="flex h-[348px] max-w-md items-center justify-start p-4">
    <Slider {...args} />
  </div>
)

const HorizontalTemplate = (args: SliderProps) => (
  <div className="flex h-full w-full max-w-md items-center justify-start">
    <Slider {...args} />
  </div>
)

const Template = (args: SliderProps) => {
  if (args.orientation === 'vertical') {
    return <VerticalTemplate {...args} />
  }

  return <HorizontalTemplate {...args} />
}

const CustomStylesTemplate = (args: SliderProps) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="flex h-full w-full max-w-md items-center justify-center">
      <Slider
        {...args}
        classNames={{
          filler: ['bg-gradient-to-r from-primary-500 to-secondary-400'],
          labelWrapper: 'mb-2',
          label: 'font-medium text-default-700 text-medium',
          value: 'font-medium text-default-500 text-small',
          thumb: [
            'transition-size',
            'bg-gradient-to-r from-secondary-400 to-primary-500',
            'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
            args.size === 'sm' || args.size === 'md'
              ? 'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6'
              : '',
          ],
          step:
            args.size === 'sm' && args.showSteps
              ? 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50'
              : '',
        }}
        disableThumbScale={args.size !== 'lg'}
        showOutline={args.showOutline && args.size !== 'lg'}
        tooltipProps={{
          offset: 10,
          placement: 'bottom',
          classNames: {
            base: [
              // arrow color
              'before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500',
            ],
            content: [
              'py-2 shadow-xl',
              'text-white bg-gradient-to-r from-secondary-400 to-primary-500',
            ],
          },
        }}
      />
    </div>
  </div>
)

const CustomValueTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>(0.2)
  const [inputValue, setInputValue] = React.useState<string>('0.2')

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return

    setValue(value)
    setInputValue(value.toString())
  }

  return (
    <div className="flex h-full w-full max-w-md items-center justify-start">
      <Slider
        classNames={{
          label: 'text-medium',
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderValue={({ children, ...props }) => (
          <output {...props}>
            <Tooltip
              className="rounded-md text-tiny text-default-500"
              content="Press Enter to confirm"
              placement="left"
            >
              <input
                aria-label="Temperature"
                className="w-12 rounded-small border-medium border-transparent bg-default-100 px-1 py-0.5 text-right text-small font-medium text-default-700 outline-none transition-colors hover:border-primary focus:border-primary"
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const v = e.target.value

                  setInputValue(v)
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && !isNaN(Number(inputValue))) {
                    setValue(Number(inputValue))
                  }
                }}
              />
            </Tooltip>
          </output>
        )}
        value={value}
        onChange={handleChange}
        {...args}
      />
    </div>
  )
}

const ControlledTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>(25)

  return (
    <div className="flex h-full w-full max-w-md flex-col items-start justify-center gap-2">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-small text-default-500">Current volume: {value}</p>
    </div>
  )
}

const ControlledRangeTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>([25, 75])

  return (
    <div className="flex max-w-md flex-col items-start justify-center gap-2">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-small text-default-500">
        Current volume: {Array.isArray(value) && value.join(' – ')}
      </p>
    </div>
  )
}

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Select a number',
  },
}

export const ShowSteps = {
  render: Template,
  args: {
    ...defaultProps,
    showSteps: true,
    step: 5,
    label: 'Select a number',
  },
}

export const Range = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Select a range',
    formatOptions: { style: 'currency', currency: 'USD' },
    defaultValue: [20, 80],
  },
}

export const FillOffset = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Select a value',
    maxValue: 50,
    minValue: -50,
    fillOffset: 0,
    defaultValue: 20,
  },
}

export const WithMarks = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Select a value',
    formatOptions: { style: 'percent' },
    maxValue: 1,
    minValue: 0,
    step: 0.1,
    marks: [
      {
        value: 0.2,
        label: '20%',
      },
      {
        value: 0.5,
        label: '50%',
      },
      {
        value: 0.8,
        label: '80%',
      },
    ],
    defaultValue: 0.2,
  },
}

export const WithTooltip = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Select a value',
    showTooltip: true,
    formatOptions: { style: 'percent' },
    maxValue: 1,
    minValue: 0,
    step: 0.1,
    marks: [
      {
        value: 0.2,
        label: '20%',
      },
      {
        value: 0.5,
        label: '50%',
      },
      {
        value: 0.8,
        label: '80%',
      },
    ],
    defaultValue: 0.2,
  },
}

export const ThumbHidden = {
  render: Template,
  args: {
    ...defaultProps,
    'aria-label': 'Player progress',
    color: 'foreground',
    hideThumb: true,
    maxValue: 1,
    minValue: 0,
    step: 0.1,
    marks: [
      {
        value: 0.2,
        label: '20%',
      },
      {
        value: 0.5,
        label: '50%',
      },
      {
        value: 0.8,
        label: '80%',
      },
    ],
    defaultValue: 0.2,
  },
}

export const CustomGetValue = {
  render: Template,
  args: {
    ...defaultProps,
    size: 'sm',
    label: 'Donuts to buy',
    maxValue: 60,
    getValue: (donuts: any) => `${donuts} of 60 Donuts`,
  },
}

export const CustomRenderValue = {
  render: CustomValueTemplate,
  args: {
    ...defaultProps,
    size: 'sm',
    label: 'Temperature',
    maxValue: 1,
    minValue: 0,
    step: 0.01,
  },
}

export const CustomRenderThumb = {
  render: Template,
  args: {
    ...defaultProps,
    size: 'sm',
    label: 'Select brightness',
    classNames: {
      track: 'border-s-secondary-100 gap-3',
      filler: ['bg-gradient-to-r from-secondary-100 to-secondary-500'],
    },
    renderThumb: (props: any) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span className="block h-5 w-5 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-500 shadow-small transition-transform group-data-[dragging=true]:scale-80" />
      </div>
    ),
  },
}

export const CustomRenderRangeThumb = {
  render: Template,
  args: {
    ...defaultProps,
    size: 'lg',
    label: 'Price Range',
    maxValue: 1000,
    step: 10,
    defaultValue: [100, 300],
    formatOptions: { style: 'currency', currency: 'USD' },
    classNames: {
      base: 'gap-3',
      filler: ['bg-gradient-to-r from-pink-300 to-cyan-300'],
    },
    renderThumb: ({ index, ...props }: any) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span
          className={cn(
            'block h-5 w-5 rounded-full bg-gradient-to-br shadow-small transition-transform group-data-[dragging=true]:scale-80',
            index === 0 ? 'from-pink-200 to-pink-500' : 'from-cyan-100 to-cyan-500',
          )}
        />
      </div>
    ),
  },
}

export const CustomRenderLabel = {
  render: Template,
  args: {
    ...defaultProps,
    size: 'lg',
    label: 'Price Range',
    maxValue: 1000,
    step: 10,
    defaultValue: [100, 300],
    formatOptions: { style: 'currency', currency: 'USD' },
    classNames: {
      base: 'gap-3',
      filler: ['bg-gradient-to-r from-pink-300 to-cyan-300'],
    },
    renderLabel: ({ children, ...props }: any) => (
      <label {...props} className="flex items-center gap-2 text-medium">
        {children}
        <Tooltip
          className="w-[200px] rounded-small"
          content="The price range you want to search for."
          placement="right"
        >
          <span className="opacity-60 transition-opacity hover:opacity-100">
            <InfoIcon />
          </span>
        </Tooltip>
      </label>
    ),
    renderThumb: ({ index, ...props }: any) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span
          className={cn(
            'block h-5 w-5 rounded-full bg-gradient-to-br shadow-small transition-transform group-data-[dragging=true]:scale-80',
            index === 0 ? 'from-pink-200 to-pink-500' : 'from-cyan-100 to-cyan-500',
          )}
        />
      </div>
    ),
  },
}

export const VerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    'aria-label': 'Select a value',
    orientation: 'vertical',
    defaultValue: 20,
  },
}

export const WithMarksVerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    label: 'Current value',
    orientation: 'vertical',
    formatOptions: { style: 'percent' },
    maxValue: 1,
    minValue: 0,
    step: 0.1,
    marks: [
      {
        value: 0.2,
        label: '20%',
      },
      {
        value: 0.5,
        label: '50%',
      },
      {
        value: 0.8,
        label: '80%',
      },
    ],
    defaultValue: 0.2,
  },
}

export const VerticalWithSteps = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    step: 5,
    showSteps: true,
    'aria-label': 'Select a value',
    orientation: 'vertical',
    defaultValue: 20,
  },
}

export const WithStartAndEndContent = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: 20,
    'aria-label': 'Volume',
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
  },
}

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
    'aria-label': 'Volume',
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
  },
}

export const ControlledRange = {
  render: ControlledRangeTemplate,
  args: {
    ...defaultProps,
    label: 'Select a budget',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
}

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
    label: 'Price Range',
    maxValue: 1000,
    size: 'md',
    step: 100,
    showSteps: true,
    showOutline: true,
    defaultValue: [100, 300],
    disableThumbScale: true,
    showTooltip: true,
    formatOptions: { style: 'currency', currency: 'USD' },
    tooltipValueFormatOptions: {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    },
  },
}
