"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CheckCircle, 
  FileText, 
  Upload, 
  UserPlus, 
  Search, 
  Download,
  X,
  AlertCircle,
  Clock,
  Filter
} from "lucide-react"
import { DocumentHistoryService } from "@/lib/document-history-service"
import { useState, useMemo } from "react"

export default function HistoryPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const userHistory = user ? DocumentHistoryService.getUserHistory(user.id) : []

  const filteredHistory = useMemo(() => {
    let filtered = userHistory

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(action => 
        action.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by action type
    if (actionFilter !== "all") {
      filtered = filtered.filter(action => action.action === actionFilter)
    }

    // Filter by date range
    if (dateFilter !== "all") {
      const now = new Date()
      let startDate: Date
      
      switch (dateFilter) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "month":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          startDate = new Date(0)
      }
      
      filtered = filtered.filter(action => new Date(action.timestamp) >= startDate)
    }

    return filtered
  }, [userHistory, searchQuery, actionFilter, dateFilter])

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'upload': return Upload
      case 'download': return Download
      case 'verify': return CheckCircle
      case 'reject': return X
      case 'delete': return AlertCircle
      default: return FileText
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'upload': return 'bg-blue-500'
      case 'download': return 'bg-green-500'
      case 'verify': return 'bg-emerald-500'
      case 'reject': return 'bg-red-500'
      case 'delete': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (action: string) => {
    switch (action) {
      case 'verify': return 'text-emerald-600 border-emerald-600'
      case 'reject': return 'text-red-600 border-red-600'
      case 'upload': return 'text-blue-600 border-blue-600'
      case 'download': return 'text-green-600 border-green-600'
      case 'delete': return 'text-orange-600 border-orange-600'
      default: return 'text-gray-600 border-gray-600'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">History</h1>
            <p className="text-muted-foreground">View your activity history and document actions</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {filteredHistory.length} actions
          </Badge>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents or actions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="upload">Uploads</SelectItem>
                  <SelectItem value="download">Downloads</SelectItem>
                  <SelectItem value="verify">Verifications</SelectItem>
                  <SelectItem value="reject">Rejections</SelectItem>
                  <SelectItem value="delete">Deletions</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* History Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No activity found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || actionFilter !== "all" || dateFilter !== "all" 
                    ? "Try adjusting your filters to see more results."
                    : "Start uploading documents to see your activity here."
                  }
                </p>
              </div>
            ) : (
              <div className="relative pl-6 border-l space-y-6">
                {filteredHistory.map((action, index) => {
                  const IconComponent = getActionIcon(action.action)
                  const colorClass = getActionColor(action.action)
                  const statusColor = getStatusColor(action.action)
                  
                  return (
                    <div key={action.id} className="relative">
                      <div className={`absolute -left-[25px] h-6 w-6 rounded-full ${colorClass} flex items-center justify-center`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="mb-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{action.description}</h3>
                          <Badge variant="outline" className={statusColor}>
                            {action.action}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(action.timestamp)}</p>
                      </div>
                      <Card className="bg-muted/50 border-0">
                        <CardContent className="p-3 text-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p><strong>Document:</strong> {action.documentName}</p>
                              {action.metadata?.fileSize && (
                                <p><strong>Size:</strong> {(action.metadata.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                              )}
                              {action.metadata?.fileType && (
                                <p><strong>Type:</strong> {action.metadata.fileType}</p>
                              )}
                              {action.metadata?.verificationNotes && (
                                <p><strong>Notes:</strong> {action.metadata.verificationNotes}</p>
                              )}
                            </div>
                            {action.action === 'download' && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download Again
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
