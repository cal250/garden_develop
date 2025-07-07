import { FlowerPicker, FlowerPickerProps } from '@/components/organisms/flower-picker/flower-picker'
import { useState } from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Button } from '@/components/atoms/button'
import getTags from '@/actions/get-tags'
import { useMutation, useQuery } from '@tanstack/react-query'
import queryClient from '@/components/utils/react-query-client'
import axios, { AxiosError } from 'axios'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Tag } from '@/payload-types'

export interface BuilderTagsInputProps extends Pick<FlowerPickerProps, 'onSelectionChange'> {
  tags: Tag[]
}

export default function BuilderTagsInput({ onSelectionChange, tags }: BuilderTagsInputProps) {
  const [customTag, setCustomTag] = useState('')

  const { mutate: addTag, isPending: isAddingTag } = useMutation({
    mutationFn: (tag: string) => {
      return axios.post('/api/tag', {
        name: tag,
        id: tag,
      })
    },
    onSuccess: (response: any) => {
      onSelectionChange?.(new Set([response.doc.id]))
      setCustomTag('')
      queryClient.refetchQueries({ queryKey: ['tags'] })
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 400) {
        console.log(error)
        setCustomTag('')
        return
      }
      console.error('Error adding tag')
    },
  })

  const flowerPickerGap = useResponsiveValue({ base: 6, md: 18 })

  const handleAdd = () => {
    if (!customTag) return
    addTag(customTag)
  }

  return (
    <div className="flex flex-col gap-6">
      <FlowerPicker
        gap={flowerPickerGap}
        flowers={tags.map((tag) => ({
          id: tag.name || '',
          name: tag.name || '',
        }))}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
        style={{ width: 300 }}
      />
      <div className="flex items-center gap-4 mx-auto">
        <input
          disabled={isAddingTag}
          placeholder="| create your own"
          className="border-none bg-transparent text-center text-base font-black text-white placeholder:text-white focus:border-none focus:outline-none"
          onChange={(e) => setCustomTag(e.target.value)}
          value={customTag}
        />
        {customTag && (
          <Button
            disabled={isAddingTag}
            onPress={handleAdd}
            polygon={Rexagon}
            strokeWidth={0}
            variant="solid"
            className="h-[39.25px] w-[84.08px] bg-[#F4EB22]"
          >
            <p className="text-base font-bold text-color-8">add</p>
          </Button>
        )}
      </div>
    </div>
  )
}
