'use client'

import React, { useRef, useState } from 'react'
// import '../../global.css'
import MoonLoader from 'react-spinners/MoonLoader'
import { toast, ToastContainer } from 'react-toastify'

type ImportMediaButtonProps = {
  collection: string
}

export const ImportMediaButton: React.FC<ImportMediaButtonProps> = ({
  collection: _collection,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [importedFiles, setImportedFiles] = useState<FileList | null>()
  const [tag, setTag] = useState('')

  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setImportedFiles(files)
  }

  const handleConfirmButtonClick = async () => {
    setLoading(true)

    const tagValue = tag // Get the tag value

    if (importedFiles) {
      const filePromises = Array.from(importedFiles).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file as Blob) // Append the file
        formData.append('tag', tagValue) // Append the tag

        return uploadImage(formData) // Goes to line number 58
      })

      try {
        await Promise.all(filePromises) // Wait for all uploads to complete
        setImportedFiles(null)
        toast.success('All files uploaded successfully.')
        window.location.reload()
      } catch (error) {
        console.error('Error uploading files:', error)
        toast.error('An error occurred while uploading files.')
      } finally {
        setLoading(false) // Ensure loading is set to false in both success and error cases
      }
    } else {
      setLoading(false) // If no files are selected, stop loading
    }
  }

  const uploadImage = async (formData: FormData) => {
    // From line 39
    try {
      // Send files to the API endpoint
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      console.log('Upload result:', result)

      if (response.ok) {
        return toast.success('Files uploaded successfully.')
      } else {
        return toast.error('An error occurred while uploading files.')
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('An error occurred while uploading files.')
      return error
    }
  }

  //---------------------------------------------------------------------------------------------------

  //------------------------------------Export Button Functionality------------------------------------

  // Function to handle image downloads
  const downloadImages = async (item: { url: string; filename: string }) => {
    const url = item.url
    try {
      // Fetch the image as a blob
      const response = await fetch(url)
      const blob = await response.blob()

      // Create a temporary download link
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = item.filename // You can set a custom name here
      document.body.appendChild(link)
      link.click()

      // Clean up the link element
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error downloading the image:', error)
    }
  }

  const handleExportButtonClick = async () => {
    window.alert('Export button clicked')

    const data = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/fetch/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        depth: 1,
      }),
    })

    let res = await data.json()
    res = res.data.docs

    res.map((item: { url: string; filename: string }) => {
      downloadImages(item)
    })
  }
  if (typeof window === 'undefined') return null;

  return (
    <>
      <ToastContainer />
      <div className="flex bg-[rgb(34,34,34)] w-full items-center justify-between">
        <div className="flex items-center w-full">
          <a
            className="pill pill--style-light pill--has-link pill--has-action my-[1%] mx-[1%]"
            onClick={handleButtonClick}
          >
            <span className="pill__label">Import Images</span>
          </a>
          <label htmlFor="tag">Tag - </label>
          <input
            id="tag"
            type="text"
            placeholder="Eg: Shadow,People...."
            className="px-[6px] outline-none decoration-transparent border-none focus:outline-none mx-1 rounded-sm"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          {importedFiles && <span>File selected - {Object.keys(importedFiles).length}</span>}
          {importedFiles && (
            <button
              className={`pill pill--style-light pill--has-link pill--has-action my-[1%] mx-[1%] ${loading ? 'px-[4px]' : ''}`}
              onClick={handleConfirmButtonClick}
            >
              <span className={`${loading ? 'hidden' : 'block'}`}>Confirm</span>
              <MoonLoader
                color={'#fff'}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          )}
        </div>
        <a className="pill pill--style-light pill--has-link pill--has-action my-[1%] mx-[1%]">
          <span className="pill__label" onClick={handleExportButtonClick}>
            Export Images
          </span>
        </a>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
      </div>
    </>
  )
}

export default ImportMediaButton