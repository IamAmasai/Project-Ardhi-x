"use client"

import type { Metadata } from "next"
import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Download, CheckCircle, MapPin, User } from "lucide-react"

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const resolvedParams = use(params)
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Property Details</h1>
            <p className="text-muted-foreground">Geo-hash: {resolvedParams.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="aspect-video bg-muted rounded-lg relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground/50" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Property Type</div>
                  <div className="font-medium mt-1">Residential Land</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Size</div>
                  <div className="font-medium mt-1">2.5 Acres</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium mt-1">Nairobi, Kenya</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-medium">Verified</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Property Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Registration Date</div>
                        <div className="font-medium mt-1">January 15, 2023</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Last Updated</div>
                        <div className="font-medium mt-1">March 22, 2023</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Land Use</div>
                        <div className="font-medium mt-1">Residential</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Blockchain ID</div>
                        <div className="font-medium mt-1">0x8F3...E29</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Boundaries</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Coordinates (Lat/Long):</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground">North East:</div>
                          <div className="text-sm">1.2921° S, 36.8219° E</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">North West:</div>
                          <div className="text-sm">1.2925° S, 36.8210° E</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">South East:</div>
                          <div className="text-sm">1.2930° S, 36.8215° E</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">South West:</div>
                          <div className="text-sm">1.2935° S, 36.8205° E</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No documents available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No history available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Owner Information</h3>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name || "Property Owner"}</div>
                    <div className="text-sm text-muted-foreground">Owner since joining ArdhiX</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">ID Number</div>
                  <div className="font-medium">KE123456789</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href={`/properties/${resolvedParams.id}/transfer`}>Transfer Ownership</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Initiate Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
