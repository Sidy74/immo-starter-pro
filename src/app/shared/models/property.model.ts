export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  /** 'Sale' for Vente, 'Rent' for Location */
  type: 'Sale' | 'Rent'; 
  /** Property categories */
  category: 'Villa' | 'Apartment' | 'Land';
  /** Optional period: 'night' | 'day' | 'month' | 'year' */
  period?: 'night' | 'day' | 'month' | 'year';
}