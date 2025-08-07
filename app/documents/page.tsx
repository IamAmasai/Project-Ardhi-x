"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Upload, Clock, CheckCircle, AlertCircle, Download, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { DocumentHistoryService } from "@/lib/document-history-service"
import { PropertyService } from "@/lib/property-service"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import type { PropertyDocument } from "@/types/auth"

export default function DocumentsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [documents, setDocuments] = useState<PropertyDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const userDocuments = PropertyService.getAllUserDocuments(user.id)
      setDocuments(userDocuments)
    } else {
      // For demo purposes when user is not authenticated, show sample documents
      const sampleDocuments = PropertyService.getAllUserDocuments('admin_001')
      setDocuments(sampleDocuments)
    }
    setLoading(false)
  }, [user])

  const handleDownload = (docName: string, docId: string) => {
    const userId = user?.id || 'admin_001' // Fallback for demo
    const userName = user?.name || 'Demo User' // Fallback for demo
    
    DocumentHistoryService.addAction({
      userId,
      userName,
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

  const handleDelete = async (docName: string, docId: string) => {
    const userId = user?.id || 'admin_001' // Fallback for demo
    const userName = user?.name || 'Demo User' // Fallback for demo
    
    try {
      // Delete from service
      const success = PropertyService.deleteDocument(docId)
      
      if (success) {
        // Update local state
        setDocuments(prev => prev.filter(doc => doc.id !== docId))
        
        // Log the action
        DocumentHistoryService.addAction({
          userId,
          userName,
          documentId: docId,
          documentName: docName,
          action: 'delete',
          description: `Deleted ${docName}`,
        })

        toast({
          title: "Document deleted",
          description: `${docName} has been deleted successfully`,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Delete failed",
          description: "Failed to delete the document. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the document",
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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : documents.length > 0 ? (
              <div className="divide-y">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{document.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Uploaded {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${
                          document.status === 'approved'
                            ? 'text-success border-success'
                            : document.status === 'pending'
                            ? 'text-warning border-warning'
                            : 'text-destructive border-destructive'
                        }`}
                      >
                        {document.status === 'approved' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : document.status === 'pending' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {document.status === 'approved' ? 'Verified' : document.status === 'pending' ? 'Pending' : 'Rejected'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(document.name, document.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(document.name, document.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't uploaded any documents yet. Start by adding your property documents.
                </p>
                <Button asChild>
                  <Link href="/documents/upload">Upload First Document</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}