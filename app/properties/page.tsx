"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { PropertyImage } from "@/components/property-image"
import { ListImage } from "@/components/list-image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock, AlertCircle, Grid, List, SlidersHorizontal, Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PropertiesPage() {
  const { getUserProperties, loading } = useAuth()
  const properties = getUserProperties()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>Loading properties...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground">Manage your land properties</p>
          </div>
          <Button className="flex items-center gap-2 w-full sm:w-auto" asChild>
            <Link href="/properties/add">
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search properties..." className="pl-8 h-10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
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
              <SelectTrigger className="w-full sm:w-[180px]">
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
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Advanced filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">Showing {properties.length} properties</p>
            <TabsList className="grid w-full sm:w-[120px] grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-4">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <PropertyImage 
                      src="/placeholder.svg"
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col space-y-1.5">
                        <h3 className="text-lg font-semibold truncate">{property.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.size} • {property.location}
                        </p>
                      </div>
                      <div className="flex items-center mt-4 mb-4 md:mb-6">
                        {property.status === "verified" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                            <CheckCircle className="h-3 w-3" />
                            <span className="text-xs">Verified</span>
                          </Badge>
                        ) : property.status === "pending" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">Pending</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-destructive border-destructive"
                          >
                            <AlertCircle className="h-3 w-3" />
                            <span className="text-xs">Rejected</span>
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          Updated {new Date(property.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 text-xs">
                          <Link href={`/properties/${property.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1 text-xs">
                          <Link href={`/map?id=${property.id}`}>View on Map</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto mb-4">
                    <Search className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't added any properties yet. Start building your land portfolio today.
                  </p>
                  <Button asChild>
                    <Link href="/properties/add">Add Your First Property</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {properties.length > 0 ? (
                  <div className="divide-y">
                    {properties.map((property) => (
                    <div key={property.id} className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-muted/50 transition-colors gap-4">
                      <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center overflow-hidden shrink-0 mx-auto sm:mx-0">
                        <ListImage 
                          src="/placeholder.svg"
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.size} • {property.location}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        {property.status === "verified" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                            <CheckCircle className="h-3 w-3" />
                            <span className="text-xs">Verified</span>
                          </Badge>
                        ) : property.status === "pending" ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">Pending</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-destructive border-destructive"
                          >
                            <AlertCircle className="h-3 w-3" />
                            <span className="text-xs">Rejected</span>
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                          <Link href={`/properties/${property.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4">
                      <Search className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't added any properties yet. Start building your land portfolio today.
                    </p>
                    <Button asChild>
                      <Link href="/properties/add">Add Your First Property</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{properties.length}</span>{" "}
            of <span className="font-medium">{properties.length}</span> properties
          </div>
          <div className="flex items-center justify-center space-x-2">
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
