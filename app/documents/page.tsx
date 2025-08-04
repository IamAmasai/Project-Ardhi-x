"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Upload, Clock, CheckCircle, AlertCircle, Download, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { DocumentHistoryService } from "@/lib/document-history-service"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function DocumentsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const handleDownload = (docName: string, docId: string) => {
    if (user) {
      DocumentHistoryService.addAction({
        userId: user.id,
        userName: user.name,
        documentId: docId,
        documentName: docName,
        action: 'download',
        description: `Downloaded ${docName}`
      })

      toast({
        title: "Document downloaded",
        description: `${docName} has been downloaded and logged to your history`,
      })
    }
  }

  const handleDelete = (docName: string, docId: string) => {
    if (user) {
      DocumentHistoryService.addAction({
        userId: user.id,
        userName: user.name,
        documentId: docId,
        documentName: docName,
        action: 'delete',
        description: `Deleted ${docName}`,
      })

      toast({
        title: "Document deleted",
        description: `${docName} has been deleted and logged to your history`,
        variant: "destructive"
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">Manage your property documents</p>
          </div>
          <Link href="/documents/upload">
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </Link>
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
                    onClick={() => handleDownload("Title Deed.pdf", "doc_001")}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDelete("Title Deed.pdf", "doc_001")}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
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
                    onClick={() => handleDownload("Survey Report.pdf", "doc_002")}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDelete("Survey Report.pdf", "doc_002")}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
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
                    onClick={() => handleDownload("Land Rates Receipt.pdf", "doc_003")}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDelete("Land Rates Receipt.pdf", "doc_003")}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
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