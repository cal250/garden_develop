'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
// import '../../global.css'
import MoonLoader from 'react-spinners/MoonLoader'
import Papa from 'papaparse' // Import PapaParse for CSV parsing
import { toast, ToastContainer, ToastContentProps } from 'react-toastify'
import { ClientToastContainer } from './client-toast-container'
export const ImportButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [importedFileName, setImportedFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ParsedRow[]>([])
  const [collection, setCollection] = useState<string | undefined>()

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  // Handle the file change event - triggered when a file is selected
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setImportedFileName(file?.name || null)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const csvData = e.target?.result as string
        Papa.parse(csvData, {
          header: true, // Convert rows into objects using the header row
          dynamicTyping: false, // Keep everything as strings initially
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data as ParsedRow[])
          },
        })
      }
      // Trigger the file read
      reader.readAsText(file)
    } else {
      console.error('No file provided.')
    }
  }
  // Handle the file change event - triggered when a file is selected

  //--------------------------------------------------------------------------------

  // Handle the confirm button click event -- triggered when the confirm button is clicked
  const handleConfirmButtonClick = async () => {
    setLoading(true)

    const transformedData = await Promise.all(
      data?.map(async (row) => {
        const transformedRow: ParsedRow = {}
        await Promise.all(
          Object.keys(row).map(async (key) => {
            // if (key === 'icon' || key === 'image' || key === 'thumbnail' || key === 'background' || key === 'backgroundImage'  || key === 'logo' || key === 'avatar' || key === 'photo' || key === 'picture' || key === 'profile') {

            //   // Await the async sendImageField function
            //   const sendImageFieldResult = await sendImageField(row[key]);

            //   transformedRow[key] = sendImageFieldResult;
            // } else {
            let value = row[key]

            // Check if value is a JSON array, object, or boolean
            if (typeof value === 'string') {
              if (value.startsWith('[') || value.startsWith('{')) {
                try {
                  value = JSON.parse(value)
                  if (Array.isArray(value) || typeof value === 'object') {
                    transformedRow[key] = value
                  } else {
                    transformedRow[key] = row[key]
                  }
                } catch (e) {
                  transformedRow[key] = row[key]
                }
              } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                transformedRow[key] = value.toLowerCase() === 'true'
              } else {
                transformedRow[key] = row[key]
              }
            } else {
              transformedRow[key] = row[key]
            }
            // }
          }),
        )
        return transformedRow
      }),
    )

    // Proceed with your fetch and post logic
    const importData = await fetch(`/api/import-data/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transformedData }),
    })

    const importResult = await importData.json()

    if (importResult.error) {
      console.error('importResult.error - ', importResult.error)
    } else {
      if (importResult?.duplicates) {
        let duplicateDataToast: ToastContentProps<unknown> | undefined

        const dups: string[] = []
        for (const index in importResult?.duplicates) {
          dups.push(` ${importResult?.duplicates[index].title} `)
        }
        toast(
          (t) => {
            duplicateDataToast = t
            return <>{dups} are the duplicate wellgorithms.</>
          },
          {
            autoClose: 50000,
          },
        )

        toast(
          (t) => (
            <span>
              Overwrite theses wellgorithms
              <button
                className="bg-green-500 p-2 px-4 mx-2 rounded-lg text-black"
                onClick={async () => {
                  t.closeToast()
                  duplicateDataToast?.closeToast()
                  const dups = importResult?.duplicates
                  const overWriteResponse = await fetch(`/api/overwrite-data/${collection}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ dups }),
                  })
                  const overWriteResult = await overWriteResponse.json()
                  if (overWriteResult?.success) {
                    toast.success('Data updated successfully.')
                    setTimeout(() => {
                      setLoading(false)
                      setData([]) // Clear the data after import
                      setImportedFileName(null)
                      window.location.reload()
                    }, 10000)
                  } else if (overWriteResult?.error) {
                    toast.error(overWriteResult?.message)
                    setTimeout(() => {
                      setLoading(false)
                      setData([]) // Clear the data after import
                      setImportedFileName(null)
                      window.location.reload()
                    }, 5000)
                  }
                }}
              >
                Yes
              </button>
              <button
                className="bg-red-500 p-2 px-4 mx-2 rounded-lg text-black"
                onClick={() => {
                  setLoading(false)
                  setData([]) // Clear the data after import
                  setImportedFileName(null)
                  t.closeToast()
                  duplicateDataToast?.closeToast()
                }}
              >
                No
              </button>
            </span>
          ),
          {
            autoClose: 50000,
          },
        )
      }
      toast.success(importResult.success)
      setTimeout(function () {
        setLoading(false)
        setData([]) // Clear the data after import
        setImportedFileName(null)
      }, 6000)
    }
  }

  // const sendImageField = async (imageField: string) => {

  //   const result = await fetch('/api/imageUpload', {

  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       imageField: imageField
  //     })
  //   })

  //   const response = await result.json();

  //   if (response.success) {
  //     return response.result.id
  //   }
  // }

  // Handle the confirm button click event -- triggered when the confirm button is clicked

  //--------------------------------------------------------------------------------

  // Handle the export button click event -- triggered when the export button is clicked
  const handleExportButtonClick = async () => {
    const exportFromJSON = (await import('export-from-json')).default
    // Ensure exportFromJSON is defined before using it
    if (exportFromJSON && exportFromJSON.types) {
      // Your logic here
    } else {
      console.error('exportFromJSON or its types are undefined')
    }

    setLoading(true)

    const exportData = await fetch(`/api/export-data/${collection}`, {
      method: 'GET',
    })

    const exportResult = await exportData.json()

    if (exportResult.docs?.length === 0) {
      toast.error('No data to export.')
      setLoading(false)
      return
    }
    const data = exportResult.docs
    const fileName = `${collection}-collection-data`
    const exportType = exportFromJSON.types.csv

    exportFromJSON({ data, fileName, exportType })

    setLoading(false)
  }
  // Handle the export button click event -- triggered when the export button is clicked

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCollection(window.location.href.split('/').pop()?.split('?')[0])
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, []);

  if (isClient) {
  return (
    <>
      <ClientToastContainer />
      <div className="flex bg-[rgb(34,34,34)] w-full items-center justify-between">
        <div className="flex items-center w-full">
          <a
            className="pill pill--style-light pill--has-link pill--has-action my-[1%] mx-[1%]"
            onClick={handleButtonClick}
          >
            <span className="pill__label">Import</span>
          </a>
          {importedFileName && <span>File selected - {importedFileName}</span>}
          {importedFileName && (
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
            Export
          </span>
        </a>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
    </>
  )
}
}

export default ImportButton
