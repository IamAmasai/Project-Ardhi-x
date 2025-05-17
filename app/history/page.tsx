import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Upload, UserPlus, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "History | ArdhiX Land Registry System",
  description: "Activity History for the ArdhiX Land Registry System",
}

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-muted-foreground">View your activity history</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l space-y-6">
              <div className="relative">
                <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-success flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-success-foreground" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">Property Verification Completed</h3>
                  <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                </div>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-3 text-sm">
                    <p>Your property at Nairobi, Kenya has been successfully verified.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-warning flex items-center justify-center">
                  <Upload className="h-4 w-4 text-warning-foreground" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">Document Uploaded</h3>
                  <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                </div>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-3 text-sm">
                    <p>
                      You uploaded <strong>Survey Report.pdf</strong> for your property at Mombasa, Kenya.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Search className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">Property Search</h3>
                  <p className="text-xs text-muted-foreground">2 days ago at 11:20 AM</p>
                </div>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-3 text-sm">
                    <p>You searched for properties in Nairobi, Kenya.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">Document Verification</h3>
                  <p className="text-xs text-muted-foreground">5 days ago at 2:15 PM</p>
                </div>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-3 text-sm">
                    <p>
                      Your document <strong>Title Deed.pdf</strong> has been verified.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">Account Created</h3>
                  <p className="text-xs text-muted-foreground">January 15, 2023 at 9:00 AM</p>
                </div>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-3 text-sm">
                    <p>You created your ArdhiX account.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
