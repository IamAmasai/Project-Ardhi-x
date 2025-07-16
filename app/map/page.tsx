"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapComponent } from "@/components/map-component"
import { MapPin, X } from "lucide-react"

export default function MapPage() {
  // Sample markers data
  const markers = [
    {
      id: "xyz123456",
      position: { lat: -1.2921, lng: 36.8219 },
      title: "Residential Plot, Nairobi",
      status: "verified" as const,
    },
    {
      id: "abc789012",
      position: { lat: -1.295, lng: 36.818 },
      title: "Commercial Land, Nairobi",
      status: "pending" as const,
    },
    {
      id: "def345678",
      position: { lat: -1.288, lng: 36.825 },
      title: "Agricultural Land, Nairobi",
      status: "rejected" as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
          <p className="text-muted-foreground">Explore and manage land parcels</p>
        </div>

        <MapComponent
          initialCenter={{ lat: -1.2921, lng: 36.8219 }}
          initialZoom={13}
          markers={markers}
          selectedMarkerId="xyz123456"
        />

        {/* Selected Parcel Info */}
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Selected Parcel</h3>
                <p className="text-sm text-muted-foreground">Geo-hash: XYZ123456</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
