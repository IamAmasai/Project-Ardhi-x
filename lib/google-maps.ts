// Google Maps Configuration and Utilities for ArdhiX

export interface GoogleMapsConfig {
  apiKey: string
  libraries: string[]
  region: string
  language: string
}

export const googleMapsConfig: GoogleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
  libraries: ['places', 'geometry', 'drawing'],
  region: 'KE', // Kenya
  language: 'en'
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface PlaceResult {
  place_id: string
  formatted_address: string
  coordinates: Coordinates
  types: string[]
}

// Kenya bounds for map initialization
export const KENYA_BOUNDS = {
  north: 5.0,
  south: -4.7,
  east: 41.9,
  west: 33.9
}

export const KENYA_CENTER: Coordinates = {
  lat: -0.0236,
  lng: 37.9062
}

// County centers for map navigation
export const COUNTY_CENTERS: Record<string, Coordinates> = {
  '001': { lat: -4.0435, lng: 39.6682 }, // Mombasa
  '002': { lat: -4.1692, lng: 39.4467 }, // Kwale
  '003': { lat: -3.5051, lng: 39.8498 }, // Kilifi
  '004': { lat: -1.8739, lng: 40.1667 }, // Tana River
  '005': { lat: -2.2717, lng: 40.9020 }, // Lamu
  '006': { lat: -3.3167, lng: 38.3500 }, // Taita-Taveta
  '007': { lat: -0.4536, lng: 39.6339 }, // Garissa
  '008': { lat: 1.7500, lng: 40.0500 }, // Wajir
  '009': { lat: 3.9366, lng: 41.8669 }, // Mandera
  '010': { lat: 2.3284, lng: 37.9899 }, // Marsabit
  '011': { lat: 0.3556, lng: 37.5833 }, // Isiolo
  '012': { lat: 0.0500, lng: 37.6500 }, // Meru
  '013': { lat: -0.3500, lng: 37.9833 }, // Tharaka-Nithi
  '014': { lat: -0.5333, lng: 37.4500 }, // Embu
  '015': { lat: -1.3667, lng: 38.0167 }, // Kitui
  '016': { lat: -1.5177, lng: 37.2634 }, // Machakos
  '017': { lat: -1.8038, lng: 37.6242 }, // Makueni
  '018': { lat: -0.6333, lng: 36.3667 }, // Nyandarua
  '019': { lat: -0.4167, lng: 36.9500 }, // Nyeri
  '020': { lat: -0.6667, lng: 37.3000 }, // Kirinyaga
  '021': { lat: -0.7167, lng: 37.1500 }, // Murang'a
  '022': { lat: -1.1744, lng: 36.8300 }, // Kiambu
  '023': { lat: 3.1167, lng: 35.6000 }, // Turkana
  '024': { lat: 1.1167, lng: 35.1167 }, // West Pokot
  '025': { lat: 1.3167, lng: 36.8000 }, // Samburu
  '026': { lat: 1.0167, lng: 35.0000 }, // Trans Nzoia
  '027': { lat: 0.5167, lng: 35.2833 }, // Uasin Gishu
  '028': { lat: 0.6167, lng: 35.4833 }, // Elgeyo-Marakwet
  '029': { lat: 0.1833, lng: 35.1000 }, // Nandi
  '030': { lat: 0.4667, lng: 35.9667 }, // Baringo
  '031': { lat: 0.1333, lng: 36.7833 }, // Laikipia
  '032': { lat: -0.3031, lng: 36.0800 }, // Nakuru
  '033': { lat: -1.0833, lng: 35.8667 }, // Narok
  '034': { lat: -1.8500, lng: 36.7833 }, // Kajiado
  '035': { lat: -0.3667, lng: 35.2833 }, // Kericho
  '036': { lat: -0.7833, lng: 35.3417 }, // Bomet
  '037': { lat: 0.2833, lng: 34.7500 }, // Kakamega
  '038': { lat: 0.0667, lng: 34.7333 }, // Vihiga
  '039': { lat: 0.5833, lng: 34.5667 }, // Bungoma
  '040': { lat: 0.4667, lng: 34.1167 }, // Busia
  '041': { lat: 0.0667, lng: 34.2833 }, // Siaya
  '042': { lat: -0.0917, lng: 34.7680 }, // Kisumu
  '043': { lat: -0.5167, lng: 34.4667 }, // Homa Bay
  '044': { lat: -1.0667, lng: 34.4667 }, // Migori
  '045': { lat: -0.6833, lng: 34.7667 }, // Kisii
  '046': { lat: -0.5667, lng: 34.9333 }, // Nyamira
  '047': { lat: -1.2921, lng: 36.8219 }, // Nairobi
}

// Utility functions
export const getCountyCenter = (countyCode: string): Coordinates => {
  return COUNTY_CENTERS[countyCode] || KENYA_CENTER
}

export const isValidCoordinates = (lat: number, lng: number): boolean => {
  return lat >= KENYA_BOUNDS.south && 
         lat <= KENYA_BOUNDS.north && 
         lng >= KENYA_BOUNDS.west && 
         lng <= KENYA_BOUNDS.east
}

export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

// Google Maps API key validation
export const isGoogleMapsConfigured = (): boolean => {
  return googleMapsConfig.apiKey !== 'YOUR_API_KEY_HERE' && 
         googleMapsConfig.apiKey.length > 0
}

export const getGoogleMapsUrl = (lat: number, lng: number, zoom: number = 15): string => {
  return `https://www.google.com/maps/@${lat},${lng},${zoom}z`
}
