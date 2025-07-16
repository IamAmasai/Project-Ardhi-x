"use client"

import type { Metadata } from "next"
import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUpload } from "@/components/document-upload"
import { AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"

export default function TransferOwnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const resolvedParams = use(params)
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfer Ownership</h1>
          <p className="text-muted-foreground">Property ID: {resolvedParams.id}</p>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div className="h-0.5 w-12 bg-primary"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                2
              </div>
              <div className="h-0.5 w-12 bg-muted"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                3
              </div>
              <div className="h-0.5 w-12 bg-muted"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                4
              </div>
            </div>
            <TabsList className="hidden">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
              <TabsTrigger value="complete">Complete</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Current Owner</Label>
                    <Input value={user?.name || "Loading..."} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Owner ID</Label>
                    <Input value={user?.nationalId || "Loading..."} readOnly />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">New Owner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="national-id">National ID Number</Label>
                      <Input id="national-id" placeholder="Enter ID number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-reason">Transfer Reason</Label>
                      <Select>
                        <SelectTrigger id="transfer-reason">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="inheritance">Inheritance</SelectItem>
                          <SelectItem value="gift">Gift</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea id="notes" placeholder="Enter any additional information" rows={4} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="confirm" />
                  <Label htmlFor="confirm" className="text-sm">
                    I confirm that all information provided is accurate and complete.
                  </Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/properties/${resolvedParams.id}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Link>
                  </Button>
                  <Button>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-6">
                  <p>Please upload the required documents to verify the transfer of ownership.</p>
                </div>

                <div className="space-y-6">
                  <DocumentUpload propertyId={resolvedParams.id} />

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Required Documents</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Transfer Agreement (Uploaded)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>ID Document for New Owner (Required)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>Payment Receipt (Required)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmation">
            <Card>
              <CardHeader>
                <CardTitle>Confirm Transfer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-6">
                  <p>Please review the information below and confirm the transfer of ownership.</p>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Property Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Property ID</p>
                        <p className="font-medium">{resolvedParams.id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">Nairobi, Kenya</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Size</p>
                        <p className="font-medium">2.5 Acres</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">Residential</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Current Owner</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p className="font-medium">{user?.name || "Current Owner"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ID Number</p>
                        <p className="font-medium">{user?.nationalId || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">New Owner</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p className="font-medium">New Owner Name</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ID Number</p>
                        <p className="font-medium">Will be filled from form</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">Will be filled from form</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">Will be filled from form</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Transfer Reason</p>
                        <p className="font-medium">Sale</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="final-confirm" />
                  <Label htmlFor="final-confirm" className="text-sm">
                    I confirm that I want to transfer ownership of this property to the new owner.
                  </Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button>
                    Confirm Transfer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complete">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Transfer Initiated Successfully</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Your property transfer request has been submitted successfully. You will receive updates on the
                  progress via email and SMS.
                </p>
                <div className="border rounded-md p-4 w-full max-w-md mb-6">
                  <h3 className="font-medium mb-2">Transaction Details</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-medium">
                        TRX-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium text-warning">Pending Verification</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/properties/${resolvedParams.id}`}>View Property</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
