"use client"

import { MapPin } from "lucide-react"

interface PropertyImageProps {
  src: string
  alt: string
  className?: string
}

export function PropertyImage({ src, alt, className }: PropertyImageProps) {
  return (
    <div className="aspect-video bg-muted relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={className || "w-full h-full object-cover"}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
            e.currentTarget.onerror = null
          }}
        />
        <MapPin className="absolute h-8 w-8 text-primary opacity-50" />
      </div>
    </div>
  )
}
