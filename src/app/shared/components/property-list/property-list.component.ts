import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { Property } from '../../models/property.model';
import { FilterSection } from '../../../components/filter-section/filter-section';
import { PropertyCard } from '../property-card/property-card.component';
import { LucideMap } from '@lucide/angular';
import { SectionContainerComponent } from '../../../components/section-container/section-container.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterSection,
    PropertyCard,
    LucideMap,
    PropertyCard,
    FilterSection,
    SectionContainerComponent,
  ],
  templateUrl: './property-list.component.html',
})
export class PropertyList {
  scrollToPage(_t47: number, _t16: HTMLDivElement) {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  properties = signal<Property[]>([]);
  recentProperties = signal<Property[]>([]);
  mostLikedProperties = signal<Property[]>([]);

  searchQuery = signal('');
  selectedCategory = signal<string>('All');

  maxPrice = signal<number>(1000000);
  minBeds = signal<number>(0);
  showAdvanced = signal(false);
  isLoading = signal(false);

  viewMode = signal<'grid' | 'map'>('grid');

  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
  filteredProperties = computed(() => {
    return this.properties().filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        p.location.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesCategory =
        this.selectedCategory() === 'All' || p.category === this.selectedCategory();

      // Nouveaux critères
      const matchesPrice = p.price <= this.maxPrice();
      const matchesBeds = p.beds >= this.minBeds();

      return matchesSearch && matchesCategory && matchesPrice && matchesBeds;
    });
  });
  updatePrice(event: Event) {
    this.maxPrice.set(Number((event.target as HTMLInputElement).value));
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
    this.maxPrice.set(1000000);
    this.minBeds.set(0);
  }
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  constructor() {
    this.loadProperties();
  }
  // Méthode réutilisable
getSkeletonCount(properties: any[]): number {
  const count = properties.length;
  // Si vide (chargement), on affiche 3 ou 4 pour remplir l'espace
  // Sinon on plafonne à 10
  return count > 0 ? Math.min(count, 10) : 5;
}

  loadProperties() {
    this.isLoading.set(true);
    setTimeout(() => {
      forkJoin({
        recent: this.http.get<Property[]>('assets/data/recent_properties.json'),
        popular: this.http.get<Property[]>('assets/data/popular_properties.json'),
        all: this.http.get<Property[]>('assets/data/properties.json'),
      }).subscribe({
        next: (results) => {
          // Mise à jour de tes signaux respectifs
          this.recentProperties.set(results.recent);
          this.mostLikedProperties.set(results.popular);
          this.properties.set(results.all);

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des données', err);
          this.isLoading.set(false);
        },
      });
    }, 1000);
  }
  // Logique favoris centralisée
  handleFavorite(property: any) {
    console.log(`Favorite toggled: ${property.title}`);
  }

  scroll(el: HTMLElement, distance: number) {
    el.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }
}
