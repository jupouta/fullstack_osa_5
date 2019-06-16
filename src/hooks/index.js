import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (changeValue) => {
    setValue(changeValue)
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export default useField
