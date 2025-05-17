"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Layers, MapPin, ZoomIn, ZoomOut, Maximize, LocateFixed } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface MapComponentProps {
  initialCenter?: { lat: number; lng: number }
  initialZoom?: number
  markers?: Array<{
    id: string
    position: { lat: number; lng: number }
    title: string
    status?: "verified" | "pending" | "rejected"
  }>
  onMarkerClick?: (markerId: string) => void
  selectedMarkerId?: string
}

export function MapComponent({
  initialCenter = { lat: -1.2921, lng: 36.8219 }, // Nairobi, Kenya
  initialZoom = 12,
  markers = [],
  onMarkerClick,
  selectedMarkerId,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapView, setMapView] = useState<"standard" | "satellite" | "terrain">("standard")
  const [searchQuery, setSearchQuery] = useState("")
  const [zoom, setZoom] = useState(initialZoom)
  const [showControls, setShowControls] = useState(true)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleZoomIn = () => {
    if (zoom < 20) setZoom(zoom + 1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would trigger a geocoding API call
    console.log("Searching for:", searchQuery)
  }

  const toggleFullscreen = () => {
    if (mapRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        mapRef.current.requestFullscreen()
      }
    }
  }

  const handleMarkerClick = (markerId: string) => {
    if (onMarkerClick) {
      onMarkerClick(markerId)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs value={mapView} onValueChange={(value) => setMapView(value as any)} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="standard">Map View</TabsTrigger>
            <TabsTrigger value="satellite">Satellite View</TabsTrigger>
            <TabsTrigger value="terrain">Topographic</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search location or geo-hash"
              className="pl-8 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Layers className="h-4 w-4" />
            <span className="sr-only">Toggle layers</span>
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <LocateFixed className="h-4 w-4" />
            <span className="sr-only">My location</span>
          </Button>
        </div>

        <div
          ref={mapRef}
          className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden"
          style={{
            backgroundImage:
              mapView === "standard"
                ? "url('/map-standard-bg.png')"
                : mapView === "satellite"
                  ? "url('/map-satellite-bg.png')"
                  : "url('/map-terrain-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <LoadingSpinner size={40} />
            </div>
          ) : (
            <>
              {/* Map markers */}
              {markers.map((marker) => (
                <button
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${
                    selectedMarkerId === marker.id ? "z-10" : "z-0"
                  }`}
                  style={{
                    left: `${(marker.position.lng - initialCenter.lng) * 10 + 50}%`,
                    top: `${(marker.position.lat - initialCenter.lat) * -10 + 50}%`,
                  }}
                  onClick={() => handleMarkerClick(marker.id)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        selectedMarkerId === marker.id
                          ? "bg-primary text-primary-foreground"
                          : marker.status === "verified"
                            ? "bg-success text-success-foreground"
                            : marker.status === "pending"
                              ? "bg-warning text-warning-foreground"
                              : "bg-muted text-muted-foreground"
                      } shadow-md transition-all duration-200 hover:scale-110`}
                    >
                      <MapPin className="h-5 w-5" />
                    </div>
                    {selectedMarkerId === marker.id && (
                      <div className="absolute top-full mt-2 bg-background rounded-md shadow-lg p-2 min-w-[150px] text-left">
                        <p className="font-medium text-sm">{marker.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{marker.status || "unknown"}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}

              {/* Map controls */}
              {showControls && (
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <Card className="p-1">
                    <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8">
                      <ZoomIn className="h-4 w-4" />
                      <span className="sr-only">Zoom in</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8">
                      <ZoomOut className="h-4 w-4" />
                      <span className="sr-only">Zoom out</span>
                    </Button>
                  </Card>
                  <Card className="p-1">
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
                      <Maximize className="h-4 w-4" />
                      <span className="sr-only">Fullscreen</span>
                    </Button>
                  </Card>
                </div>
              )}

              {/* Zoom level indicator */}
              <div className="absolute left-4 bottom-4 bg-background rounded-md shadow-md px-2 py-1 text-xs">
                Zoom: {zoom}x
              </div>
            </>
          )}
        </div>
      </Tabs>
    </div>
  )
}
