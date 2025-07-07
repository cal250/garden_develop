import React from 'react'
import { Meta } from '@storybook/react'
import { button } from '@nextui-org/theme'

import { Button, ButtonProps } from '../index'
import { SelfieIcon, WeatherIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'

export default {
  name: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    spinnerPlacement: {
      control: {
        type: 'select',
      },
      options: ['start', 'end'],
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Button>

const defaultProps = {
  children: 'Button',
  spinnerPlacement: 'start',
  polygon: Rexagon,
  className: 'px-8',
  ...button.defaultVariants,
}

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handlePress = (e: any) => {
    console.log('Pressed', e)
    setIsOpen((prev) => !prev)
  }

  return (
    <Button
      {...args}
      aria-label={isOpen ? 'Close' : 'Open'}
      aria-pressed={isOpen}
      onPress={handlePress}
    >
      {isOpen ? 'Close' : 'Open'}
    </Button>
  )
}

export const Default = {
  args: {
    ...defaultProps,
  },
}

export const WithState = {
  render: StateTemplate,

  args: {
    ...defaultProps,
  },
}

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
}

export const DisableRipple = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
}

export const WithIcons = {
  args: {
    ...defaultProps,
    startContent: <SelfieIcon className="fill-current" />,
    endContent: <WeatherIcon className="fill-current" />,
  },
}

export const IconButton = {
  args: {
    ...defaultProps,
    isIconOnly: true,
    children: <SelfieIcon className="h-5 w-5 fill-current" />,
    className: 'w-16 h-12',
  },
}

export const IsLoading = {
  args: {
    ...defaultProps,
    color: 'primary',
    isLoading: true,
  },
}

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    radius: 'full',
    className: 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg px-8',
  },
}
