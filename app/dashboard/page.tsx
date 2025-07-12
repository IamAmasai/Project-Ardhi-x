import type { Metadata } from "next"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin, FileText, AlertCircle, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | ArdhiX Land Registry System",
  description: "Dashboard for the ArdhiX Land Registry System",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, John Doe</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Properties</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success"></div>
                <span className="text-sm font-medium">Online</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Properties</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/properties" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-lg font-semibold">Residential Plot</h3>
                    <p className="text-sm text-muted-foreground">2.5 Acres • Nairobi, Kenya</p>
                  </div>
                  <div className="flex items-center mt-4 mb-6">
                    <Badge variant="outline" className="flex items-center gap-1 text-success border-success">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">Updated Yesterday</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="/properties/xyz123456">View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="/map?id=xyz123456">View on Map</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-lg font-semibold">Commercial Land</h3>
                    <p className="text-sm text-muted-foreground">1.2 Acres • Mombasa, Kenya</p>
                  </div>
                  <div className="flex items-center mt-4 mb-6">
                    <Badge variant="outline" className="flex items-center gap-1 text-warning border-warning">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">Updated Yesterday</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="/properties/abc789012">View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="/map?id=abc789012">View on Map</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/history" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">Property Verification</h3>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    Completed
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">Document Uploaded</h3>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                  <Badge variant="outline" className="text-warning border-warning">
                    Pending Review
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
