"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { PropertyService } from "@/lib/property-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUpload } from "@/components/document-upload"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"

interface TransferFormData {
  nationalId: string
  fullName: string
  phone: string
  email: string
  transferReason: string
  notes: string
}

interface TransferState {
  currentStep: number
  formData: TransferFormData
  isFormValid: boolean
  detailsConfirmed: boolean
  finalConfirmed: boolean
  transferCompleted: boolean
  transactionId: string
}

export default function TransferOwnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const resolvedParams = use(params)
  
  const [state, setState] = useState<TransferState>({
    currentStep: 1,
    formData: {
      nationalId: '',
      fullName: '',
      phone: '',
      email: '',
      transferReason: '',
      notes: ''
    },
    isFormValid: false,
    detailsConfirmed: false,
    finalConfirmed: false,
    transferCompleted: false,
    transactionId: ''
  })

  const updateFormData = (field: keyof TransferFormData, value: string) => {
    const newFormData = { ...state.formData, [field]: value }
    const isValid = newFormData.nationalId && newFormData.fullName && 
                   newFormData.phone && newFormData.email && newFormData.transferReason

    setState(prev => ({
      ...prev,
      formData: newFormData,
      isFormValid: !!isValid
    }))
  }

  const goToNextStep = () => {
    if (state.currentStep < 4) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
    }
  }

  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))
    }
  }

  const handleDetailsNext = () => {
    if (!state.isFormValid || !state.detailsConfirmed) {
      toast({
        title: "Form incomplete",
        description: "Please fill in all required fields and confirm the information.",
        variant: "destructive"
      })
      return
    }
    goToNextStep()
  }

  const handleVerificationNext = () => {
    // In a real app, you'd check if required documents are uploaded
    goToNextStep()
  }

  const handleConfirmTransfer = async () => {
    if (!state.finalConfirmed) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that you want to transfer ownership.",
        variant: "destructive"
      })
      return
    }

    try {
      // Simulate transfer processing
      const transactionId = `TRX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      
      // In a real app, you would:
      // 1. Call API to create transfer request
      // 2. Update property ownership in database
      // 3. Send notifications to involved parties
      // 4. Create blockchain record if applicable
      
      // For now, we'll update the property status to show it's in transfer
      PropertyService.updateProperty(resolvedParams.id, {
        status: 'pending'
      })

      setState(prev => ({
        ...prev,
        transferCompleted: true,
        transactionId,
        currentStep: 4
      }))

      toast({
        title: "Transfer initiated",
        description: "Your property transfer request has been submitted successfully.",
      })
    } catch (error) {
      console.error('Transfer error:', error)
      toast({
        title: "Transfer failed",
        description: "There was an error processing your transfer request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const getActiveTab = () => {
    switch (state.currentStep) {
      case 1: return "details"
      case 2: return "verification"
      case 3: return "confirmation"
      case 4: return "complete"
      default: return "details"
    }
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfer Ownership</h1>
          <p className="text-muted-foreground">Property ID: {resolvedParams.id}</p>
        </div>

        <Tabs value={getActiveTab()} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                state.currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <div className={`h-0.5 w-12 ${state.currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                state.currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <div className={`h-0.5 w-12 ${state.currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                state.currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <div className={`h-0.5 w-12 ${state.currentStep >= 4 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                state.currentStep >= 4 ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
              }`}>
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
                      <Input 
                        id="national-id" 
                        placeholder="Enter ID number" 
                        value={state.formData.nationalId}
                        onChange={(e) => updateFormData('nationalId', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input 
                        id="full-name" 
                        placeholder="Enter full name" 
                        value={state.formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter phone number" 
                        value={state.formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        placeholder="Enter email address" 
                        value={state.formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-reason">Transfer Reason</Label>
                      <Select value={state.formData.transferReason} onValueChange={(value) => updateFormData('transferReason', value)}>
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
                      <Textarea 
                        id="notes" 
                        placeholder="Enter any additional information" 
                        rows={4} 
                        value={state.formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox 
                    id="confirm" 
                    checked={state.detailsConfirmed}
                    onCheckedChange={(checked) => setState(prev => ({ ...prev, detailsConfirmed: !!checked }))}
                  />
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
                  <Button onClick={handleDetailsNext}>
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
                  <Button variant="outline" onClick={goToPreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleVerificationNext}>
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
                        <p className="font-medium">{state.formData.fullName || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ID Number</p>
                        <p className="font-medium">{state.formData.nationalId || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">{state.formData.phone || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">{state.formData.email || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Transfer Reason</p>
                        <p className="font-medium">{state.formData.transferReason || 'Not specified'}</p>
                      </div>
                      {state.formData.notes && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Additional Notes</p>
                          <p className="font-medium">{state.formData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox 
                    id="final-confirm" 
                    checked={state.finalConfirmed}
                    onCheckedChange={(checked) => setState(prev => ({ ...prev, finalConfirmed: !!checked }))}
                  />
                  <Label htmlFor="final-confirm" className="text-sm">
                    I confirm that I want to transfer ownership of this property to the new owner.
                  </Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleConfirmTransfer}>
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
                        {state.transactionId}
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
