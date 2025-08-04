import { DocumentAction, SystemActivity } from '@/types/auth'

class DocumentHistoryService {
  private static actions: DocumentAction[] = [
    {
      id: '1',
      userId: 'admin_001',
      userName: 'John Doe',
      documentId: 'doc_001',
      documentName: 'Title Deed.pdf',
      action: 'verify',
      description: 'Document verified successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      metadata: {
        verificationNotes: 'All requirements met'
      }
    },
    {
      id: '2',
      userId: 'admin_001',
      userName: 'John Doe',
      documentId: 'doc_002',
      documentName: 'Survey Report.pdf',
      action: 'upload',
      description: 'Uploaded Survey Report.pdf for property verification',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      metadata: {
        fileSize: 2048576,
        fileType: 'application/pdf',
        propertyId: 'prop_001'
      }
    },
    {
      id: '3',
      userId: 'admin_001',
      userName: 'John Doe',
      documentId: 'doc_003',
      documentName: 'Land Rates Receipt.pdf',
      action: 'reject',
      description: 'Document rejected due to unclear signatures',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      metadata: {
        verificationNotes: 'Signatures not clearly visible, please resubmit'
      }
    },
    {
      id: '4',
      userId: 'admin_001',
      userName: 'John Doe',
      documentId: 'doc_002',
      documentName: 'Survey Report.pdf',
      action: 'download',
      description: 'Downloaded Survey Report.pdf',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    },
    {
      id: '5',
      userId: 'admin_001',
      userName: 'John Doe',
      documentId: 'doc_001',
      documentName: 'Title Deed.pdf',
      action: 'upload',
      description: 'Uploaded Title Deed.pdf for property registration',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      metadata: {
        fileSize: 1536000,
        fileType: 'application/pdf',
        propertyId: 'prop_001'
      }
    }
  ]

  static getUserHistory(userId: string): DocumentAction[] {
    return this.actions.filter(action => action.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  static getAllSystemActivity(): SystemActivity[] {
    return this.actions.map(action => ({
      ...action,
      userEmail: `${action.userName.toLowerCase().replace(' ', '.')}@example.com`,
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
      userAgent: 'Mozilla/5.0 (compatible browser)'
    })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  static addAction(action: Omit<DocumentAction, 'id' | 'timestamp'>): DocumentAction {
    const newAction: DocumentAction = {
      ...action,
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }
    
    this.actions.unshift(newAction)
    return newAction
  }

  static getFilteredHistory(
    userId?: string, 
    action?: string, 
    dateRange?: { start: string; end: string }
  ): DocumentAction[] {
    let filtered = userId ? this.getUserHistory(userId) : this.actions

    if (action && action !== 'all') {
      filtered = filtered.filter(item => item.action === action)
    }

    if (dateRange) {
      const start = new Date(dateRange.start).getTime()
      const end = new Date(dateRange.end).getTime()
      filtered = filtered.filter(item => {
        const itemTime = new Date(item.timestamp).getTime()
        return itemTime >= start && itemTime <= end
      })
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  static getActionsByDocument(documentId: string): DocumentAction[] {
    return this.actions.filter(action => action.documentId === documentId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }
}

export { DocumentHistoryService }