"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Search, Crosshair, Navigation } from 'lucide-react'
import { KENYA_CENTER, getCountyCenter } from '@/lib/google-maps'
import { getCountyByName } from '@/lib/kenya-locations'

interface PropertyLocationMapProps {
  coordinates: {
    lat: number | null
    lng: number | null
  }
  onCoordinatesChange: (lat: number, lng: number) => void
  county?: string
  className?: string
}

export function PropertyLocationMap({ 
  coordinates, 
  onCoordinatesChange, 
  county, 
  className = "" 
}: PropertyLocationMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const autocompleteRef = useRef<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Initialize Google Maps
  useEffect(() => {
      const determineInitialCenter = function () {
          // Determine initial center
          let center = KENYA_CENTER
          if (coordinates.lat && coordinates.lng) {
              center = { lat: coordinates.lat, lng: coordinates.lng }
          } else if (county) {
              const countyData = getCountyByName(county)
              if (countyData) {
                  center = getCountyCenter(countyData.code)
              }
          }
          return center
      }

      const initMap = () => {
          if (!mapRef.current || typeof window === 'undefined' || !window.google) return

          // Determine initial center
          const center = determineInitialCenter()

          // Create map
          const map = new window.google.maps.Map(mapRef.current, {
              center,
              zoom: coordinates.lat && coordinates.lng ? 16 : 8,
              mapTypeId: window.google.maps.MapTypeId.HYBRID,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
              zoomControl: true,
              gestureHandling: 'cooperative',
              restriction: {
                  latLngBounds: {
                      north: 5.0,
                      south: -4.7,
                      east: 41.9,
                      west: 33.9,
                  },
              },
          })

          googleMapRef.current = map

          // Create marker
          const marker = new window.google.maps.Marker({
              position: center,
              map,
              draggable: true,
              title: 'Property Location - Drag to adjust',
              animation: window.google.maps.Animation.DROP,
          })

          markerRef.current = marker

          // Handle marker drag
          marker.addListener('dragend', () => {
              const position = marker.getPosition()
              if (position) {
                  const lat = position.lat()
                  const lng = position.lng()
                  onCoordinatesChange(lat, lng)
              }
          })

          // Handle map click
          map.addListener('click', (event: any) => {
              if (event.latLng) {
                  const lat = event.latLng.lat()
                  const lng = event.latLng.lng()
                  marker.setPosition({ lat, lng })
                  map.panTo({ lat, lng })
                  onCoordinatesChange(lat, lng)
              }
          })

          // Setup autocomplete
          if (searchInputRef.current && window.google.maps.places) {
              const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                  types: ['geocode'],
                  componentRestrictions: { country: 'KE' },
                  fields: ['geometry', 'formatted_address']
              })

              autocompleteRef.current = autocomplete

              autocomplete.addListener('place_changed', () => {
                  const place = autocomplete.getPlace()
                  if (place.geometry?.location) {
                      const lat = place.geometry.location.lat()
                      const lng = place.geometry.location.lng()

                      map.setCenter({ lat, lng })
                      map.setZoom(16)
                      marker.setPosition({ lat, lng })
                      onCoordinatesChange(lat, lng)
                  }
              })
          }

          setIsLoaded(true)
      }

    // Load Google Maps API if not already loaded
    if (typeof window !== 'undefined') {
      if (window.google && window.google.maps) {
        initMap()
      } else {
        // Check if script is already loading
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
        if (!existingScript) {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
          script.async = true
          script.defer = true
          
          script.onload = () => {
            initMap()
          }
          
          script.onerror = () => {
            console.error('Failed to load Google Maps API')
          }
          
          document.head.appendChild(script)
        } else {
          // Script is already loading, wait for it
          const checkGoogleMaps = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(checkGoogleMaps)
              initMap()
            }
          }, 100)
          
          // Clear interval after 10 seconds to prevent infinite loop
          setTimeout(() => {
            clearInterval(checkGoogleMaps)
          }, 10000)
        }
      }
    }
  }, [county, onCoordinatesChange])

  // Update marker position when coordinates change externally
  useEffect(() => {
    if (markerRef.current && coordinates.lat && coordinates.lng) {
      const position = { lat: coordinates.lat, lng: coordinates.lng }
      markerRef.current.setPosition(position)
      if (googleMapRef.current) {
        googleMapRef.current.setCenter(position)
        googleMapRef.current.setZoom(16)
      }
    }
  }, [coordinates])

  // Update map center when county changes
  useEffect(() => {
    if (googleMapRef.current && county && (!coordinates.lat || !coordinates.lng)) {
      const countyData = getCountyByName(county)
      if (countyData) {
        const center = getCountyCenter(countyData.code)
        googleMapRef.current.setCenter(center)
        googleMapRef.current.setZoom(10)
      }
    }
  }, [county, coordinates])

  // Get current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          
          if (googleMapRef.current && markerRef.current) {
            googleMapRef.current.setCenter({ lat, lng })
            googleMapRef.current.setZoom(16)
            markerRef.current.setPosition({ lat, lng })
            onCoordinatesChange(lat, lng)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your current location. Please ensure location access is enabled.')
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Property Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Controls */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location in Kenya..."
              className="w-full"
            />
          </div>
          <Button onClick={handleCurrentLocation} size="sm" variant="outline" title="Use current location">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-[450px] rounded-lg border bg-muted"
            style={{ minHeight: '450px' }}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
                <p className="text-sm text-muted-foreground">Loading interactive map...</p>
                <p className="text-xs text-muted-foreground mt-1">Make sure you have internet connection</p>
              </div>
            </div>
          )}
        </div>

        {/* Coordinates Display */}
        {coordinates.lat && coordinates.lng && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Latitude</Label>
              <Input 
                value={coordinates.lat.toFixed(6)} 
                readOnly 
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Longitude</Label>
              <Input 
                value={coordinates.lng.toFixed(6)} 
                readOnly 
                className="text-sm"
              />
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Click anywhere on the map to set the property location</p>
          <p>• Drag the red marker to fine-tune the position</p>
          <p>• Use the search box to find specific addresses</p>
          <p>• Click the navigation button to use your current location</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Global type declaration for Google Maps API
declare global {
  interface Window {
    google: any
    initMap?: () => void
  }
}
