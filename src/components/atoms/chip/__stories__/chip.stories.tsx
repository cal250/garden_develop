import React from 'react'
import { Meta } from '@storybook/react'
import { chip } from '@nextui-org/theme'
import { Avatar } from '@/components/atoms/avatar'
import { CheckIcon } from '@/components/atoms/icons'

import { Chip, ChipProps } from '../index'

export default {
  name: 'Components/Atoms/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'dot'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Chip>

const defaultProps = {
  ...chip.defaultVariants,
  children: 'Chip',
}

export const Default = {
  args: {
    ...defaultProps,
  },
}

export const StartContent = {
  args: {
    ...defaultProps,
    startContent: (
      <span aria-label="celebration" className="ml-1" role="img">
        🎉
      </span>
    ),
  },
}

export const EndContent = {
  args: {
    ...defaultProps,
    endContent: (
      <span aria-label="rocket" className="mr-1" role="img">
        🚀
      </span>
    ),
  },
}

export const Closeable = {
  args: {
    ...defaultProps,

    onClose: () => console.log('Close'),
  },
}

export const CustomCloseIcon = {
  args: {
    ...defaultProps,
    endContent: <CheckIcon />,

    onClose: () => console.log('Close'),
  },
}

export const WithAvatar = {
  args: {
    ...defaultProps,
    variant: 'flat',
    color: 'secondary',
    avatar: <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />,
  },
}

const HiddenOverflowTemplate = (args: ChipProps) => (
  <div className="w-20 border-2 border-danger-500">
    <Chip {...args} />
  </div>
)

export const HiddenOverflow = {
  render: HiddenOverflowTemplate,
  args: {
    ...defaultProps,
    children: 'Hello World!',
  },
}
