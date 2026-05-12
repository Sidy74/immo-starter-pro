import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PropertyDetails } from '../../shared/models/property.model';
import { ActivatedRoute } from '@angular/router';
import { PropertyCard } from '../../shared/components/property-card/property-card.component';
import { DecimalPipe } from '@angular/common';
import { MapView } from '../map-view.component/map-view.component';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DetailNavbarComponent } from "../detail-navbar/detail-navbar.component";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  imports: [PropertyCard, DecimalPipe, MapView, DetailNavbarComponent],
})
export class PropertyDetailsComponent implements OnInit {
  private http = inject(HttpClient);

  private route = inject(ActivatedRoute);
  //   private propertyService = inject(PropertyService);

  // Utilisation d'un signal pour la propriété
  property = signal<PropertyDetails | null>(null);

  stats = computed(() => {
    const p = this.property();
    if (!p) return [];

    return [
      { label: 'Surface', value: `${p.sqft} m²` },
      { label: 'Chambres', value: p.beds.toString() },
      { label: 'Douches', value: p.baths.toString() },
      { label: 'Type', value: p.category },
    ];
  });
  similarProperties = signal<PropertyDetails[]>([]);


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
          forkJoin({
            recent: this.http.get<PropertyDetails[]>('assets/data/recent_properties-details.json'),
            // popular: this.http.get<PropertyDetails[]>('assets/data/popular_properties-details.json'),
            // all: this.http.get<PropertyDetails[]>('assets/data/properties-details.json'),
          }).subscribe({
            next: (results) => {
              // Mise à jour de tes signaux respectifs
              this.property.set(results.recent[id ? parseInt(id) - 1 : 0]); // Exemple de sélection d'une propriété
            //   this.mostLikedProperties.set(results.popular);
            console.log(results);
            
            //   this.properties.set(results.all);
    
            //   this.isLoading.set(false);
            },
            error: (err) => {
              console.error('Erreur lors du chargement des données', err);
            //   this.isLoading.set(false);
            },
          });
        }, 1000);
    if (id) {
      this.property.set(data);
    }


  }
}

const data: PropertyDetails = {
  id: 1,
  title: 'Villa Moderne - ACI 2000',
  price: 750000,
  location: 'Bamako, Mali',
  beds: 4,
  baths: 3,
  sqft: 250,
  image: 'assets/main.jpg',
  images: ['assets/main.jpg', 'assets/interior1.jpg', 'assets/interior2.jpg', 'assets/garden.jpg'],
  type: 'Rent',
  category: 'Villa',
  period: 'month',
  description: "Superbe villa située au coeur de l'ACI 2000, idéale pour bureau ou résidence...",
  amenities: ['WiFi', 'Groupe Électrogène', 'Climatisation', 'Sécurité 24/7'],
  agent: {
    name: 'Moussa Diarra',
    phone: '+223 00 00 00 00',
    image: 'assets/agent.jpg',
    verified: true,
  },
  features: {
    yearBuilt: 2020,
    floors: 3,
    furnished: true,
  },
  isFavorite: false,
};
