export interface GeoPoint {
  lat: number;
  lng: number;
}

export type PropertyCategory = 'Villa' | 'Apartment' | 'Land';
export type ListingType = 'Sale' | 'Rent';
export type RentalPeriod = 'night' | 'day' | 'month' | 'year';

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: ListingType;
  category: PropertyCategory;
  period?: RentalPeriod;
  coordinates?: GeoPoint;
}

export interface PropertyMapData {
  property: Property;
  position: GeoPoint;
}
