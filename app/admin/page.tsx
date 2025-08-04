"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, 
  FileText, 
  Users, 
  Activity,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Eye,
  Shield,
  User
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { activityService } from "@/lib/activity-service"
import { Activity as ActivityType } from "@/types/auth"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activities, setActivities] = useState<ActivityType[]>([])

  // Role-based access control
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard')
      return
    }
  }, [user, router])

  // Load activities
  useEffect(() => {
    if (user?.role === 'admin') {
      const allActivities = activityService.getAllActivities()
      setActivities(allActivities)
    }
  }, [user])

  // If not admin, don't render anything (redirect will happen)
  if (!user || user.role !== 'admin') {
    return null
  }

  // Mock data for demonstration
  const mockDocuments = [
    {
      id: "doc_001",
      name: "Title Deed.pdf",
      owner: "John Doe",
      property: "Nairobi Property",
      status: "approved",
      uploadedAt: "2 days ago"
    },
    {
      id: "doc_002", 
      name: "Survey Report.pdf",
      owner: "Jane Smith",
      property: "Mombasa Property",
      status: "pending",
      uploadedAt: "Yesterday"
    },
    {
      id: "doc_003",
      name: "Land Rates Receipt.pdf", 
      owner: "Bob Wilson",
      property: "Kisumu Property",
      status: "rejected",
      uploadedAt: "5 days ago"
    }
  ]

  const mockUsers = [
    {
      id: "admin_001",
      name: "John Doe", 
      email: "admin@ardhix.com",
      role: "admin",
      status: "active",
      joinedAt: "Jan 2023",
      properties: 2
    },
    {
      id: "user_002",
      name: "Jane Smith",
      email: "jane@example.com", 
      role: "user",
      status: "active",
      joinedAt: "Feb 2023",
      properties: 1
    },
    {
      id: "user_003",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "user", 
      status: "inactive",
      joinedAt: "Mar 2023",
      properties: 3
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      approved: { variant: "outline", className: "text-success border-success", icon: CheckCircle },
      pending: { variant: "outline", className: "text-warning border-warning", icon: Clock },
      rejected: { variant: "outline", className: "text-destructive border-destructive", icon: AlertCircle },
      active: { variant: "outline", className: "text-success border-success", icon: CheckCircle },
      inactive: { variant: "outline", className: "text-muted-foreground border-muted-foreground", icon: AlertCircle }
    }
    
    const config = variants[status] || variants.pending
    const Icon = config.icon
    
    return (
      <Badge {...config}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getActivityIcon = (type: string) => {
    const icons: Record<string, any> = {
      document_upload: FileText,
      document_download: Download,
      document_approve: CheckCircle,
      document_reject: AlertCircle,
      property_create: Shield,
      user_login: User
    }
    return icons[type] || Activity
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">Manage system users, documents, and monitor activity</p>
          </div>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search documents..." className="pl-8 h-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.owner}</TableCell>
                        <TableCell>{doc.property}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>{doc.uploadedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search users..." className="pl-8 h-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? <Shield className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.properties}</TableCell>
                        <TableCell>{user.joinedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Activity Log</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search activities..." className="pl-8 h-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.userName}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                          {activity.metadata?.propertyTitle && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Property: {activity.metadata.propertyTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}