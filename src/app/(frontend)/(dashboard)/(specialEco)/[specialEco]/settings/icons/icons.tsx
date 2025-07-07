'use client'

import IconOctagon from './icon-octagon'
import IconPicker from './icon-picker'
import { Cocoon, PlatformIcon } from '@/payload-types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {useState} from 'react';

export default function Icons({ icons, cocoon }: { icons: PlatformIcon[]; cocoon: Cocoon }) {
  const defaultIconUrl = typeof cocoon?.icon === 'string' ? cocoon.icon : (cocoon?.icon?.url ?? '')
  const [iconUrl, setIconUrl] = useState<string>(defaultIconUrl)

  const { mutate: setIcon } = useMutation({
    mutationFn: async (icon: PlatformIcon) => {
      setIconUrl(icon?.url ?? '')
      await axios.patch(`/api/cocoon/${cocoon.id}`, { icon })
    },
    onError: (error) => {
      setIconUrl(defaultIconUrl)
    },
  })

  return (
    <div className="flex size-full flex-col items-center">
      <IconOctagon cocoon={cocoon} iconUrl={iconUrl} />
      <IconPicker icons={icons} onIconChange={(icon) => setIcon(icon)} />
    </div>
  )
}
