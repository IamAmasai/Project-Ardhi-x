import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapComponent } from "@/components/map-component"
import { DocumentUpload } from "@/components/document-upload"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Add Property | ArdhiX Land Registry System",
  description: "Add a new property to the ArdhiX Land Registry System",
}

export default function AddPropertyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Property</h1>
            <p className="text-muted-foreground">Register a new land property</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="Enter property title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select>
                      <SelectTrigger id="property-type">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size (Acres)</Label>
                    <Input id="size" type="number" step="0.01" placeholder="Enter property size" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input id="registration-number" placeholder="Enter registration number" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter property description"
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ownership Information</CardTitle>
                <CardDescription>Enter the ownership details of your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Owner Name</Label>
                    <Input id="owner-name" placeholder="Enter owner name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-id">Owner ID Number</Label>
                    <Input id="owner-id" placeholder="Enter owner ID number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisition-date">Acquisition Date</Label>
                    <Input id="acquisition-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisition-type">Acquisition Type</Label>
                    <Select>
                      <SelectTrigger id="acquisition-type">
                        <SelectValue placeholder="Select acquisition type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                        <SelectItem value="gift">Gift</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>
                Save and Continue
                <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>Enter the location details of your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Select>
                      <SelectTrigger id="county">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="eldoret">Eldoret</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sub-county">Sub-County</Label>
                    <Input id="sub-county" placeholder="Enter sub-county" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Input id="ward" placeholder="Enter ward" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input id="postal-code" placeholder="Enter postal code" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Physical Address</Label>
                    <Input id="address" placeholder="Enter physical address" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Map Location</CardTitle>
                <CardDescription>Mark your property location on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MapComponent />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" placeholder="Enter latitude" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" placeholder="Enter longitude" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>
                Save and Continue
                <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Upload the required documents for property verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <DocumentUpload />

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Required Documents</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span>Title Deed</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span>Survey Plan</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span>ID Document</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span>Land Rates Receipt (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Property</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
