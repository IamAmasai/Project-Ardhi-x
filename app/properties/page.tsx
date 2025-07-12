import type { Metadata } from "next"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, CheckCircle, Clock, AlertCircle, Grid, List, SlidersHorizontal, Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Properties | ArdhiX Land Registry System",
  description: "Properties listing for the ArdhiX Land Registry System",
}

export default function PropertiesPage() {
  // Sample properties data
  const properties = [
    {
      id: "xyz123456",
      title: "Residential Plot",
      location: "Nairobi, Kenya",
      size: "2.5 Acres",
      status: "verified",
      lastUpdated: "Yesterday",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "abc789012",
      title: "Commercial Land",
      location: "Mombasa, Kenya",
      size: "1.2 Acres",
      status: "pending",
      lastUpdated: "3 days ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "def345678",
      title: "Agricultural Land",
      location: "Nakuru, Kenya",
      size: "5.0 Acres",
      status: "rejected",
      lastUpdated: "1 week ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "ghi901234",
      title: "Urban Plot",
      location: "Kisumu, Kenya",
      size: "0.8 Acres",
      status: "verified",
      lastUpdated: "2 weeks ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "jkl567890",
      title: "Beachfront Property",
      location: "Malindi, Kenya",
      size: "3.5 Acres",
      status: "pending",
      lastUpdated: "1 month ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "mno123456",
      title: "Forest Land",
      location: "Eldoret, Kenya",
      size: "10.0 Acres",
      status: "verified",
      lastUpdated: "2 months ago",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground">Manage your land properties</p>
          </div>
          <Button className="flex items-center gap-2" asChild>
            <Link href="/properties/add">
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search properties..." className="pl-8 h-10" />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Property Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Advanced filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {properties.length} properties</p>
            <TabsList className="grid w-[120px] grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                            e.currentTarget.onerror = null
                          }}
                        />
                        <MapPin className="absolute h-8 w-8 text-primary opacity-50" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col space-y-1.5">
                        <h3 className="text-lg font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.size} • {property.location}
                        </p>
                      </div>
                      <div className="flex items-center mt-4 mb-6">
                        {property.status === "verified" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        ) : property.status === "pending" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-destructive border-destructive"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Rejected
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">Updated {property.lastUpdated}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/properties/${property.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/map?id=${property.id}`}>View on Map</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                      <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center mr-4 overflow-hidden">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                            e.currentTarget.onerror = null
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.size} • {property.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {property.status === "verified" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        ) : property.status === "pending" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-destructive border-destructive"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Rejected
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/properties/${property.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{properties.length}</span>{" "}
            of <span className="font-medium">{properties.length}</span> properties
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
