import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DocumentUpload } from "@/components/document-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Upload Document | ArdhiX Land Registry System",
  description: "Upload documents to the ArdhiX Land Registry System",
}

export default function UploadDocumentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
          <p className="text-muted-foreground">Upload and manage your property documents</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <DocumentUpload />

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Guidelines</CardTitle>
                <CardDescription>Requirements for document uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Accepted Formats</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>PDF documents (preferred)</li>
                    <li>JPG or PNG images</li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Document Quality</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Documents must be clearly legible</li>
                    <li>All pages must be included</li>
                    <li>Official stamps and signatures must be visible</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-md flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Important</p>
                    <p>
                      All uploaded documents will be verified for authenticity. Submitting falsified documents is a
                      criminal offense.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Process</CardTitle>
                <CardDescription>What happens after upload</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative pl-8 space-y-4 text-sm text-muted-foreground">
                  <li className="relative">
                    <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                    <p className="font-medium text-foreground">Document Upload</p>
                    <p>You upload your document to the system</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-muted"></div>
                    <p className="font-medium text-foreground">Initial Review</p>
                    <p>Our system performs an initial check (1-2 hours)</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-muted"></div>
                    <p className="font-medium text-foreground">Expert Verification</p>
                    <p>Land registry experts verify the document (1-3 days)</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-muted"></div>
                    <p className="font-medium text-foreground">Blockchain Recording</p>
                    <p>Document is recorded on the blockchain for security</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-muted"></div>
                    <p className="font-medium text-foreground">Verification Complete</p>
                    <p>You receive notification of verification status</p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
