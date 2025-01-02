'use client' // Mark this as a Client Component

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

export const ButtonAlert = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  )
}
