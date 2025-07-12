"use client"

interface ListImageProps {
  src: string
  alt: string
  className?: string
}

export function ListImage({ src, alt, className }: ListImageProps) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className || "w-full h-full object-cover"}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg?height=200&width=300"
        e.currentTarget.onerror = null
      }}
    />
  )
}
