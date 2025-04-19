import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
