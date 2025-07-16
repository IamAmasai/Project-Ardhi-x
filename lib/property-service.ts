import { Property, PropertyDocument, UserStats } from '@/types/auth'

// In-memory storage for properties (replace with database in production)
let properties: Property[] = [
  // Sample properties for demo admin user
  {
    id: 'prop_001',
    userId: 'admin_001',
    title: 'Residential Plot - Westlands',
    type: 'residential',
    location: 'Westlands, Nairobi',
    size: '2.5 Acres',
    status: 'verified',
    value: 25000000,
    currency: 'KES',
    documents: [
      {
        id: 'doc_001',
        propertyId: 'prop_001',
        name: 'Title Deed',
        type: 'title_deed',
        url: '/documents/title_deed_001.pdf',
        status: 'approved',
        uploadedAt: '2024-01-15T10:00:00Z'
      }
    ],
    coordinates: {
      lat: -1.2668,
      lng: 36.8060
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'prop_002',
    userId: 'admin_001',
    title: 'Commercial Land - Mombasa',
    type: 'commercial',
    location: 'Mombasa, Kenya',
    size: '1.2 Acres',
    status: 'pending',
    value: 18000000,
    currency: 'KES',
    documents: [
      {
        id: 'doc_002',
        propertyId: 'prop_002',
        name: 'Survey Map',
        type: 'survey_map',
        url: '/documents/survey_map_002.pdf',
        status: 'pending',
        uploadedAt: '2024-07-10T15:20:00Z'
      }
    ],
    coordinates: {
      lat: -4.0435,
      lng: 39.6682
    },
    createdAt: '2024-07-10T15:00:00Z',
    updatedAt: '2024-07-10T15:20:00Z'
  }
]

let documents: PropertyDocument[] = [
  {
    id: 'doc_003',
    propertyId: 'prop_001',
    name: 'Valuation Report',
    type: 'valuation',
    url: '/documents/valuation_001.pdf',
    status: 'pending',
    uploadedAt: '2024-07-11T09:15:00Z'
  },
  {
    id: 'doc_004',
    propertyId: 'prop_002',
    name: 'Tax Receipt 2024',
    type: 'tax_receipt',
    url: '/documents/tax_receipt_002.pdf',
    status: 'pending',
    uploadedAt: '2024-07-11T11:30:00Z'
  }
]

export class PropertyService {
  static getUserProperties(userId: string): Property[] {
    return properties.filter(property => property.userId === userId)
  }

  static getUserStats(userId: string): UserStats {
    const userProperties = this.getUserProperties(userId)
    const userDocuments = documents.filter(doc => 
      userProperties.some(prop => prop.id === doc.propertyId)
    )
    
    const verifiedProperties = userProperties.filter(prop => prop.status === 'verified').length
    const pendingProperties = userProperties.filter(prop => prop.status === 'pending').length
    const pendingDocuments = userDocuments.filter(doc => doc.status === 'pending').length
    const totalValue = userProperties.reduce((sum, prop) => sum + prop.value, 0)
    
    return {
      totalProperties: userProperties.length,
      verifiedProperties,
      pendingProperties,
      pendingDocuments,
      totalValue,
      currency: 'KES'
    }
  }

  static addProperty(userId: string, propertyData: Omit<Property, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Property {
    const newProperty: Property = {
      ...propertyData,
      id: `prop_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    properties.push(newProperty)
    return newProperty
  }

  static updateProperty(propertyId: string, updates: Partial<Property>): Property | null {
    const propertyIndex = properties.findIndex(prop => prop.id === propertyId)
    if (propertyIndex === -1) return null

    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return properties[propertyIndex]
  }

  static deleteProperty(propertyId: string): boolean {
    const propertyIndex = properties.findIndex(prop => prop.id === propertyId)
    if (propertyIndex === -1) return false

    properties.splice(propertyIndex, 1)
    
    // Also remove associated documents
    documents = documents.filter(doc => doc.propertyId !== propertyId)
    
    return true
  }

  static addDocument(document: Omit<PropertyDocument, 'id' | 'uploadedAt'>): PropertyDocument {
    const newDocument: PropertyDocument = {
      ...document,
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      uploadedAt: new Date().toISOString()
    }
    
    documents.push(newDocument)
    return newDocument
  }

  static getPropertyDocuments(propertyId: string): PropertyDocument[] {
    return documents.filter(doc => doc.propertyId === propertyId)
  }

  static getAllUserDocuments(userId: string): PropertyDocument[] {
    const userProperties = this.getUserProperties(userId)
    const propertyIds = userProperties.map(prop => prop.id)
    return documents.filter(doc => propertyIds.includes(doc.propertyId))
  }
}
