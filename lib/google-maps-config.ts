// Google Maps Configuration
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
  libraries: ['places', 'geometry'] as const,
  version: 'weekly'
}

export const isGoogleMapsAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         window.google && 
         window.google.maps
}

export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsAvailable()) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(',')}&v=${GOOGLE_MAPS_CONFIG.version}`
    script.async = true
    script.defer = true
    
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Maps script'))
    
    document.head.appendChild(script)
  })
}
