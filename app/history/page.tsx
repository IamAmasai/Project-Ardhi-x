"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Upload, UserPlus, Search, Download, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useEffect, useState } from "react"
import { activityService } from "@/lib/activity-service"
import { Activity } from "@/types/auth"

export default function HistoryPage() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (user) {
      const userActivities = activityService.getActivitiesForRole(user.id, user.role)
      setActivities(userActivities)
    }
  }, [user])

  const getActivityIcon = (type: string) => {
    const icons: Record<string, any> = {
      document_upload: Upload,
      document_download: Download,
      document_approve: CheckCircle,
      document_reject: CheckCircle,
      property_create: Shield,
      property_verify: CheckCircle,
      user_login: UserPlus,
      user_logout: UserPlus,
      user_register: UserPlus
    }
    return icons[type] || FileText
  }

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      document_upload: "bg-blue-500",
      document_download: "bg-green-500", 
      document_approve: "bg-success",
      document_reject: "bg-destructive",
      property_create: "bg-purple-500",
      property_verify: "bg-success",
      user_login: "bg-muted",
      user_logout: "bg-muted",
      user_register: "bg-primary"
    }
    return colors[type] || "bg-muted"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {user?.role === 'admin' ? 'System History' : 'History'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'View system-wide activity history' 
              : 'View your activity history'
            }
          </p>
          {user?.role === 'admin' && (
            <Badge variant="outline" className="mt-2">
              <Shield className="h-3 w-3 mr-1" />
              Admin View - All Users
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l space-y-6">
              {activities.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                const colorClass = getActivityColor(activity.type)
                
                return (
                  <div key={activity.id} className="relative">
                    <div className={`absolute -left-[25px] h-6 w-6 rounded-full ${colorClass} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="mb-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {user?.role === 'admin' && activity.userId !== user.id 
                            ? `${activity.userName}: ${activity.description}`
                            : activity.description
                          }
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                          {new Date(activity.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      {user?.role === 'admin' && activity.userId !== user.id && (
                        <p className="text-xs text-muted-foreground">User ID: {activity.userId}</p>
                      )}
                    </div>
                    <Card className="bg-muted/50 border-0">
                      <CardContent className="p-3 text-sm">
                        {activity.metadata?.propertyTitle && (
                          <p className="mb-1">
                            <strong>Property:</strong> {activity.metadata.propertyTitle}
                          </p>
                        )}
                        {activity.metadata?.documentName && (
                          <p className="mb-1">
                            <strong>Document:</strong> {activity.metadata.documentName}
                          </p>
                        )}
                        {activity.type.includes('document') && (
                          <p className="text-muted-foreground">
                            Document action performed on the system.
                          </p>
                        )}
                        {activity.type.includes('property') && (
                          <p className="text-muted-foreground">
                            Property-related action in the system.
                          </p>
                        )}
                        {activity.type.includes('user') && (
                          <p className="text-muted-foreground">
                            User account activity.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
              
              {activities.length === 0 && (
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mb-1">
                    <h3 className="font-medium">No Activity Yet</h3>
                    <p className="text-xs text-muted-foreground">Start using the system to see activity here</p>
                  </div>
                  <Card className="bg-muted/50 border-0">
                    <CardContent className="p-3 text-sm">
                      <p>Your activity will appear here as you use the system.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
