"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Upload, Clock, CheckCircle, AlertCircle, Download } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { activityService } from "@/lib/activity-service"
import { useState } from "react"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!user) return
    
    setIsUploading(true)
    
    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Log the upload activity
      activityService.logDocumentAction(
        user.id,
        user.name,
        'document_upload',
        'New Document.pdf',
        `doc_${Date.now()}`,
        'prop_001',
        'Sample Property'
      )
      
      toast.success('Document uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload document')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async (documentName: string) => {
    if (!user) return
    
    // Log the download activity
    activityService.logDocumentAction(
      user.id,
      user.name,
      'document_download',
      documentName
    )
    
    toast.success(`Downloaded ${documentName}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">Manage your property documents</p>
          </div>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleUpload}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search documents..." className="pl-8 h-10" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Title Deed</h3>
                    <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDownload('Title Deed.pdf')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Survey Report</h3>
                    <p className="text-xs text-muted-foreground">Uploaded yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                    <Clock className="h-3 w-3" />
                    Pending
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDownload('Survey Report.pdf')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Land Rates Receipt</h3>
                    <p className="text-xs text-muted-foreground">Uploaded 5 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1 text-destructive border-destructive">
                    <AlertCircle className="h-3 w-3" />
                    Rejected
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDownload('Land Rates Receipt.pdf')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
