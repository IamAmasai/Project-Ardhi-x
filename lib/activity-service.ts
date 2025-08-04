import { Activity, ActivityType, UserRole } from "@/types/auth"

class ActivityService {
  private activities: Activity[] = [
    // Sample data for development
    {
      id: "act_001",
      userId: "admin_001",
      userName: "John Doe",
      type: "document_upload",
      description: "Uploaded Title Deed.pdf",
      metadata: {
        documentId: "doc_001",
        documentName: "Title Deed.pdf",
        propertyId: "prop_001",
        propertyTitle: "Nairobi Property"
      },
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "act_002",
      userId: "admin_001",
      userName: "John Doe",
      type: "document_approve",
      description: "Document Title Deed.pdf was approved",
      metadata: {
        documentId: "doc_001",
        documentName: "Title Deed.pdf",
        propertyId: "prop_001"
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "act_003",
      userId: "user_002",
      userName: "Jane Smith",
      type: "document_upload",
      description: "Uploaded Survey Report.pdf",
      metadata: {
        documentId: "doc_002",
        documentName: "Survey Report.pdf",
        propertyId: "prop_002",
        propertyTitle: "Mombasa Property"
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    },
    {
      id: "act_004",
      userId: "admin_001",
      userName: "John Doe",
      type: "property_create",
      description: "Created new property: Nairobi Commercial Plot",
      metadata: {
        propertyId: "prop_003",
        propertyTitle: "Nairobi Commercial Plot"
      },
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    },
    {
      id: "act_005",
      userId: "user_002",
      userName: "Jane Smith",
      type: "user_login",
      description: "User logged in",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    }
  ]

  // Get activities for a specific user (for regular users)
  getUserActivities(userId: string): Activity[] {
    return this.activities
      .filter(activity => activity.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // Get all activities (for admin users)
  getAllActivities(): Activity[] {
    return this.activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // Get activities based on user role
  getActivitiesForRole(userId: string, userRole: UserRole): Activity[] {
    if (userRole === 'admin') {
      return this.getAllActivities()
    }
    return this.getUserActivities(userId)
  }

  // Add a new activity
  addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Activity {
    const newActivity: Activity = {
      ...activity,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }
    
    this.activities.unshift(newActivity) // Add to beginning for chronological order
    return newActivity
  }

  // Helper method to log document actions
  logDocumentAction(
    userId: string,
    userName: string,
    type: Extract<ActivityType, 'document_upload' | 'document_download' | 'document_delete' | 'document_approve' | 'document_reject'>,
    documentName: string,
    documentId?: string,
    propertyId?: string,
    propertyTitle?: string
  ): Activity {
    const actionVerbs = {
      document_upload: 'Uploaded',
      document_download: 'Downloaded',
      document_delete: 'Deleted',
      document_approve: 'Approved',
      document_reject: 'Rejected'
    }

    const description = `${actionVerbs[type]} ${documentName}`
    
    return this.addActivity({
      userId,
      userName,
      type,
      description,
      metadata: {
        documentId,
        documentName,
        propertyId,
        propertyTitle
      }
    })
  }

  // Helper method to log property actions
  logPropertyAction(
    userId: string,
    userName: string,
    type: Extract<ActivityType, 'property_create' | 'property_update' | 'property_delete' | 'property_verify'>,
    propertyTitle: string,
    propertyId?: string
  ): Activity {
    const actionVerbs = {
      property_create: 'Created new property:',
      property_update: 'Updated property:',
      property_delete: 'Deleted property:',
      property_verify: 'Verified property:'
    }

    const description = `${actionVerbs[type]} ${propertyTitle}`
    
    return this.addActivity({
      userId,
      userName,
      type,
      description,
      metadata: {
        propertyId,
        propertyTitle
      }
    })
  }

  // Helper method to log user actions
  logUserAction(
    userId: string,
    userName: string,
    type: Extract<ActivityType, 'user_login' | 'user_logout' | 'user_register' | 'profile_update'>,
    description?: string
  ): Activity {
    const defaultDescriptions = {
      user_login: 'User logged in',
      user_logout: 'User logged out',
      user_register: 'User registered',
      profile_update: 'Profile updated'
    }

    return this.addActivity({
      userId,
      userName,
      type,
      description: description || defaultDescriptions[type]
    })
  }
}

export const activityService = new ActivityService()