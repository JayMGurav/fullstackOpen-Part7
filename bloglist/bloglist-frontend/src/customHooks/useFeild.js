import { useState } from 'react'

const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    id: name,
    name,
    reset
  }
}

export default useField