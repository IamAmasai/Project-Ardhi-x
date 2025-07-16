"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink } from "lucide-react"

export default function RouteTestPage() {
  const routes = [
    { name: "Dashboard", href: "/dashboard", description: "Main dashboard view" },
    { name: "Properties", href: "/properties", description: "List of all properties" },
    { name: "Add Property", href: "/properties/add", description: "Add new property form" },
    { name: "Map View", href: "/map", description: "Interactive map with properties" },
    { name: "Documents", href: "/documents", description: "Document management" },
    { name: "Upload Document", href: "/documents/upload", description: "Upload new documents" },
    { name: "History", href: "/history", description: "Activity history" },
    { name: "Profile", href: "/profile", description: "User profile management" },
    { name: "Settings", href: "/settings", description: "User settings" },
    { name: "Sign Up", href: "/auth/sign-up", description: "User registration" },
    { name: "Forgot Password", href: "/auth/forgot-password", description: "Password reset" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Testing</h1>
          <p className="text-muted-foreground">Test all application routes to ensure they work properly</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <Card key={route.href} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {route.name}
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{route.description}</p>
                <p className="text-xs font-mono bg-muted px-2 py-1 rounded">{route.href}</p>
                <Button asChild className="w-full">
                  <Link href={route.href}>
                    Test Route
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Route Testing Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">How to test:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click each "Test Route" button above</li>
                <li>Verify the page loads correctly</li>
                <li>Check that the URL changes properly</li>
                <li>Ensure no errors appear in the browser console</li>
                <li>Verify navigation works in both directions</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Expected behavior:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Protected routes should redirect to login if not authenticated</li>
                <li>All authenticated routes should load properly</li>
                <li>Navigation should be smooth without unnecessary redirects</li>
                <li>Browser back/forward buttons should work correctly</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
