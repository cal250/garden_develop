'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useField } from '@payloadcms/ui'
import { Button, TextInput, FieldLabel, usePreferences } from '@payloadcms/ui'
import { validateHexColor } from './validator'
import { TextFieldClientComponent } from 'payload'
import './styles.scss'

const defaultColors = ['#333333', '#9A9A9A', '#F3F3F3', '#FF6F76', '#FDFFA4', '#B2FFD6', '#F3DDF3']
const baseClass = 'custom-color-picker'
const preferenceKey = 'color-picker-colors'

const InputField: TextFieldClientComponent = ({ path, field }) => {
  // TODO: Find a way to add validation here
  // const { value = '', setValue, showError, errorMessage } = useField({ path, validate: rest. })

  const {
    value = '',
    setValue,
    showError,
    errorMessage,
  } = useField({
    path,
    validate: validateHexColor,
  })

  const { getPreference, setPreference } = usePreferences()

  const [colorOptions, setColorOptions] = useState(defaultColors)
  const [isAdding, setIsAdding] = useState(false)
  const [colorToAdd, setColorToAdd] = useState('')

  useEffect(() => {
    const loadColors = async () => {
      const storedColors = await getPreference(preferenceKey)
      if (storedColors) setColorOptions(storedColors)
    }
    loadColors()
  }, [getPreference])

  const handleAddColor = useCallback(() => {
    if (!validateHexColor(colorToAdd) || colorOptions.includes(colorToAdd)) return

    const newOptions = [colorToAdd, ...colorOptions]
    setColorOptions(newOptions)
    setPreference(preferenceKey, newOptions)
    setValue(colorToAdd)
    setIsAdding(false)
  }, [colorToAdd, colorOptions, setPreference, setValue])

  return (
    <div className={`${baseClass} ${showError ? 'error' : ''}`}>
      <FieldLabel htmlFor={path} required={field.required} label={field.label} />

      <div className="color-pallet">
        <input
          type="color"
          id="colorPicker"
          className="color-pallet-input"
          value={colorToAdd}
          onChange={(e) => setColorToAdd(e.target.value)}
        />
        <TextInput
          placeholder="Hex Code"
          value={colorToAdd}
          className="color-pallet-input-hex w-fit"
          onChange={(e: { target: { value: string } }) =>
            setColorToAdd('#' + e.target.value.replace('#', ''))
          }
          path={path}
        />
        <Button
          className={`${baseClass}__btn`}
          buttonStyle="primary"
          iconPosition="left"
          iconStyle="with-border"
          size="small"
          onClick={handleAddColor}
          disabled={!validateHexColor(colorToAdd)}
        >
          Add
        </Button>
      </div>

      {showError && <p className="error-message">{errorMessage}</p>}

      {isAdding && (
        <div>
          <input
            className={`${baseClass}__input`}
            type="text"
            placeholder="#000000"
            onChange={(e) => setColorToAdd('#' + e.target.value.replace('#', ''))}
            value={colorToAdd}
            maxLength={7}
          />
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
            disabled={validateHexColor(colorToAdd) !== true}
          >
            Add
          </Button>
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="secondary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}

      {!isAdding && (
        <>
          <ul className={`${baseClass}__colors`}>
            {colorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`chip ${color === value ? 'chip--selected' : ''}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                  onClick={() => setValue(color)}
                />
              </li>
            ))}
          </ul>
          <Button icon="plus" onClick={() => setIsAdding(true)}>
            Add Color
          </Button>
        </>
      )}
    </div>
  )
}

export default InputField
