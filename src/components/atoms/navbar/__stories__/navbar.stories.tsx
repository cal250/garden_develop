import React from 'react'
import { Meta } from '@storybook/react'
import { navbar } from '@nextui-org/theme'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import Lorem from 'react-lorem-component'
import {
  ActivityIcon,
  ChevronDownIcon,
  FlashIcon,
  LockIcon,
  ScaleIcon,
  SearchIcon,
  ServerIcon,
  TagUserIcon,
} from '@/components/atoms/icons'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarProps,
} from '../index'
import { Link } from '@/components/atoms/link'
import { Avatar } from '@/components/atoms/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'

export default {
  name: 'Components/Atoms/Navbar',
  component: Navbar,
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['static', 'fixed'],
    },
    maxWidth: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    isBlurred: {
      control: {
        type: 'boolean',
      },
    },
    shouldBlockScroll: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Navbar>

const defaultProps = {
  ...navbar.defaultVariants,
}

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

const App = React.forwardRef(({ children }: any, ref: any) => {
  return (
    <div
      ref={ref}
      className="relative max-h-[90vh] max-w-[90%] overflow-x-hidden overflow-y-scroll border border-default shadow-md sm:max-w-[80%]"
    >
      {children}
      <div className="mt-8 flex max-w-5xl flex-col gap-4 px-10">
        <h1>Lorem ipsum dolor sit ame</h1>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Lorem key={i} className="mb-5 text-lg" count={1} sentenceUpperBound={40} />
        ))}
      </div>
    </div>
  )
})

App.displayName = 'App'

const Template = (args: NavbarProps) => {
  // for hide on scroll cases
  const parentRef = React.useRef(null)

  return (
    <App ref={parentRef}>
      <Navbar {...args} parentRef={parentRef}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="hidden font-bold text-inherit sm:block">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

const WithMenuTemplate = (args: any) => {
  const parentRef = React.useRef(null)

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false)

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ]

  return (
    <App ref={parentRef}>
      <Navbar parentRef={parentRef} position="sticky" onMenuOpenChange={setIsMenuOpen} {...args}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="hidden font-bold text-inherit sm:block">ACME</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </App>
  )
}

const WithDropdownMenuTemplate = (args: NavbarProps) => {
  const icons = {
    chevron: <ChevronDownIcon fill="currentColor" size={16} />,
    scale: <ScaleIcon className="text-warning" fill="currentColor" size={30} />,
    lock: <LockIcon className="text-success" fill="currentColor" size={30} />,
    activity: <ActivityIcon className="text-secondary" fill="currentColor" size={30} />,
    flash: <FlashIcon className="text-primary" fill="currentColor" size={30} />,
    server: <ServerIcon className="text-success" fill="currentColor" size={30} />,
    user: <TagUserIcon className="text-danger" fill="currentColor" size={30} />,
  }

  return (
    <App>
      <Navbar {...args}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="hidden font-bold text-inherit sm:block">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-0 sm:flex">
          <DropdownMenu>
            <NavbarItem>
              <DropdownMenuTrigger>
                <Button endContent={icons.chevron} radius="full" variant="light">
                  Features
                </Button>
              </DropdownMenuTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="ACME features">
              <DropdownMenuItem
                key="autoscaling"
                title="ACME scales apps to meet user demand, automagically, based on load."
              >
                <ScaleIcon />
                Autoscaling
              </DropdownMenuItem>
              <DropdownMenuItem
                key="safe_and_sound"
                title="A secure mission control, without the policy headache. Permissions, 2FA, and more."
              >
                <LockIcon />
                Safe and Sound
              </DropdownMenuItem>
              <DropdownMenuItem
                key="usage_metrics"
                title="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                <ActivityIcon />
                Usage Metrics
              </DropdownMenuItem>
              <DropdownMenuItem
                key="production_ready"
                title="ACME runs on ACME, join us and others serving requests at web scale."
              >
                <FlashIcon />
                Production Ready
              </DropdownMenuItem>
              <DropdownMenuItem
                key="99_uptime"
                title="Applications stay on the grid with high availability and high uptime guarantees."
              >
                <ServerIcon />
                +99% Uptime
              </DropdownMenuItem>
              <DropdownMenuItem
                key="supreme_support"
                title="Overcome any challenge with a supporting team ready to respond."
              >
                <TagUserIcon />
                +Supreme Support
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenu>
          <NavbarItem isActive>
            <Link className="px-4" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="px-4" color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="px-4" color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden px-4 lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

const WithAvatarUserTemplate = (args: NavbarProps) => {
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Logout',
  ]

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-3 md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="secondary" href="#">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent aria-label="Profile Actions" color="secondary">
              <DropdownMenuItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownMenuItem>
              <DropdownMenuItem key="settings">My Settings</DropdownMenuItem>
              <DropdownMenuItem key="team_settings">Team Settings</DropdownMenuItem>
              <DropdownMenuItem key="analytics">Analytics</DropdownMenuItem>
              <DropdownMenuItem key="system">System</DropdownMenuItem>
              <DropdownMenuItem key="configurations">Configurations</DropdownMenuItem>
              <DropdownMenuItem key="help_and_feedback">Help & Feedback</DropdownMenuItem>
              <DropdownMenuItem key="logout" color="danger">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

const WithSearchInputTemplate = (args: NavbarProps) => {
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Logout',
  ]

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent className="hidden gap-3 md:flex" justify="start">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarItem>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="secondary" href="#">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Input
            className="w-fit"
            classNames={{
              input: 'text-base',
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon className="pointer-events-none flex-shrink-0 text-base" />}
            onClear={() => {
              console.log('clear')
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent aria-label="Profile Actions" color="secondary">
              <DropdownMenuItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownMenuItem>
              <DropdownMenuItem key="settings">My Settings</DropdownMenuItem>
              <DropdownMenuItem key="team_settings">Team Settings</DropdownMenuItem>
              <DropdownMenuItem key="analytics">Analytics</DropdownMenuItem>
              <DropdownMenuItem key="system">System</DropdownMenuItem>
              <DropdownMenuItem key="configurations">Configurations</DropdownMenuItem>
              <DropdownMenuItem key="help_and_feedback">Help & Feedback</DropdownMenuItem>
              <DropdownMenuItem key="logout" color="danger">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

export const Static = {
  render: Template,

  args: {
    ...defaultProps,
    position: 'static',
  },
}

export const Sticky = {
  render: Template,

  args: {
    ...defaultProps,
    position: 'sticky',
  },
}

export const HideOnScroll = {
  render: Template,

  args: {
    ...defaultProps,
    position: 'sticky',
    shouldHideOnScroll: true,
  },
}

export const WithMenu = {
  render: WithMenuTemplate,

  args: {
    ...defaultProps,
  },
}

export const WithDropdownMenu = {
  render: WithDropdownMenuTemplate,

  args: {
    ...defaultProps,
  },
}

export const WithAvatarUser = {
  render: WithAvatarUserTemplate,

  args: {
    ...defaultProps,
  },
}

export const WithSearchInput = {
  render: WithSearchInputTemplate,

  args: {
    ...defaultProps,
  },
}

export const WithShouldBlockScroll = {
  render: (args: NavbarProps) => {
    return (
      <div className="flex w-[1024px] gap-8">
        <WithMenuTemplate {...args} label="shouldBlockScroll: false" shouldBlockScroll={false} />
        <WithMenuTemplate {...args} label="shouldBlockScroll: true" shouldBlockScroll={true} />
      </div>
    )
  },

  args: {
    ...defaultProps,
  },
}
