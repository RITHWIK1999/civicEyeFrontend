import React from 'react'

function InputBar({ type, placeholder, name, value, onChange,className }) {
  return (
    <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  </div>
  )
}

export default InputBar