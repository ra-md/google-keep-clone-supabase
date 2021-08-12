import React from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  visible: boolean
  toggle: () => void
  children: React.ReactNode
  height?: string
  width?: string
}

export default function Modal({ toggle, children, visible, width = 'w-72 md:w-screen', height }: ModalProps) {
  return createPortal(
    visible && <>
      <div
        className={`z-30 bg-primary fixed inset-0 duration-400 ease-in-out bg-opacity-70`}
        onClick={toggle}
      >
      </div>
      <div
        className={`z-40 bg-primary fixed max-w-xl border border-secondary rounded-lg shadow-lg-darker transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${width} ${height}`}
      >
        {children}
      </div>
    </>,
    document.querySelector('body')!
  )
}
