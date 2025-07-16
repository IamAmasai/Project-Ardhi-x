"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyLocationMap } from "@/components/property-location-map"
import { DocumentUpload } from "@/components/document-upload"
import { ArrowLeft, Save, MapPin, Upload, FileText, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { KENYA_COUNTIES, getWardsByCounty } from "@/lib/kenya-locations"
import Link from "next/link"

interface PropertyFormData {
  title: string
  type: 'residential' | 'commercial' | 'agricultural' | 'industrial' | ''
  county: string
  ward: string
  location: string
  physicalAddress: string
  size: string
  registrationNumber: string
  description: string
  value: string
  currency: string
  coordinates: {
    lat: number | null
    lng: number | null
  }
}

const initialFormData: PropertyFormData = {
  title: "",
  type: "",
  county: "",
  ward: "",
  location: "",
  physicalAddress: "",
  size: "",
  registrationNumber: "",
  description: "",
  value: "",
  currency: "KES",
  coordinates: {
    lat: null,
    lng: null
  }
}

export default function AddPropertyPage() {
  const { addProperty } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData)
  const [currentTab, setCurrentTab] = useState("details")
  const [availableWards, setAvailableWards] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update wards when county changes
  useEffect(() => {
    if (formData.county) {
      const county = KENYA_COUNTIES.find(c => c.name === formData.county)
      if (county) {
        const wards = getWardsByCounty(county.code)
        setAvailableWards(wards)
        // Reset ward selection when county changes
        setFormData(prev => ({ ...prev, ward: "" }))
      }
    } else {
      setAvailableWards([])
    }
  }, [formData.county])

  // Update location string when county/ward changes
  useEffect(() => {
    if (formData.county && formData.ward) {
      setFormData(prev => ({
        ...prev,
        location: `${formData.ward}, ${formData.county}, Kenya`
      }))
    } else if (formData.county) {
      setFormData(prev => ({
        ...prev,
        location: `${formData.county}, Kenya`
      }))
    }
  }, [formData.county, formData.ward])

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    try {
      // Save form data to localStorage for persistence
      localStorage.setItem('propertyFormData', JSON.stringify(formData))
      
      // Move to next tab
      if (currentTab === "details") {
        setCurrentTab("location")
      } else if (currentTab === "location") {
        setCurrentTab("documents")
      }
      
      toast({
        title: "Progress Saved",
        description: "Your progress has been saved. You can continue from where you left off.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveAsDraft = async () => {
    setIsSaving(true)
    try {
      const propertyData = {
        title: formData.title || "Draft Property",
        type: formData.type || 'residential' as const,
        location: formData.location || "Location pending",
        size: formData.size || "Size pending",
        status: 'pending' as const,
        value: parseFloat(formData.value) || 0,
        currency: formData.currency,
        documents: [],
        coordinates: formData.coordinates.lat && formData.coordinates.lng ? 
          { lat: formData.coordinates.lat, lng: formData.coordinates.lng } : 
          undefined
      }

      const result = await addProperty(propertyData)
      
      if (result.success) {
        toast({
          title: "Draft Saved",
          description: "Property saved as draft successfully.",
        })
        localStorage.removeItem('propertyFormData')
        router.push('/properties')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitProperty = async () => {
    setIsSubmitting(true)
    try {
      // Validate required fields
      if (!formData.title || !formData.type || !formData.size || !formData.county) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return
      }

      const propertyData = {
        title: formData.title,
        type: formData.type as 'residential' | 'commercial' | 'agricultural' | 'industrial',
        location: `${formData.ward ? formData.ward + ', ' : ''}${formData.county}, Kenya`,
        size: formData.size,
        status: 'pending' as const,
        value: parseFloat(formData.value) || 0,
        currency: formData.currency,
        documents: [],
        coordinates: formData.coordinates.lat && formData.coordinates.lng ? 
          { lat: formData.coordinates.lat, lng: formData.coordinates.lng } : 
          undefined
      }

      const result = await addProperty(propertyData)
      
      if (result.success) {
        toast({
          title: "Property Submitted",
          description: "Property submitted for verification successfully.",
        })
        localStorage.removeItem('propertyFormData')
        router.push('/properties')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit property. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('propertyFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        toast({
          title: "Progress Restored",
          description: "Your previous progress has been restored.",
        })
      } catch (error) {
        console.error('Failed to restore form data:', error)
      }
    }
  }, [])

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

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Property Details
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documents
            </TabsTrigger>
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
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Golden Creek Residential Plot"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="size">Size (Acres) *</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      placeholder="e.g., 2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      placeholder="e.g., LR123456"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="value">Property Value (KES)</Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.value}
                      onChange={(e) => handleInputChange('value', e.target.value)}
                      placeholder="e.g., 2500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                        <SelectItem value="USD">USD (US Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter property description"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveAndContinue} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save and Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>Enter the location details of your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="county">County *</Label>
                    <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        {KENYA_COUNTIES.map((county, index) => (
                          <SelectItem key={`${county.code}-${index}`} value={county.name}>
                            {county.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Select value={formData.ward} onValueChange={(value) => handleInputChange('ward', value)} disabled={!formData.county}>
                      <SelectTrigger>
                        <SelectValue placeholder={formData.county ? "Select ward" : "Select county first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableWards.map((ward, index) => (
                          <SelectItem key={`${ward}-${index}`} value={ward}>
                            {ward}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physicalAddress">Physical Address</Label>
                  <Input
                    id="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
                    placeholder="e.g., Haile Selassie Avenue, Nairobi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Generated Location String</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    readOnly
                    placeholder="Location will be generated from county and ward selection"
                    className="bg-muted"
                  />
                </div>
              </CardContent>
            </Card>

            <PropertyLocationMap 
              coordinates={formData.coordinates}
              onCoordinatesChange={(lat, lng) => 
                handleInputChange('coordinates', { lat, lng })
              }
              county={formData.county}
            />

            <div className="flex justify-end">
              <Button onClick={handleSaveAndContinue} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save and Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
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
              <Button variant="outline" onClick={handleSaveAsDraft} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button onClick={handleSubmitProperty} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Property
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
