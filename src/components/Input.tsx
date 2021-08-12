import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
}

export default function Input({className, ...props}: InputProps) {
  return (
    <input
      className={`h-full my-3 bg-transparent w-full font-semibold ${className}`}
      {...props}
    />
  )
}
