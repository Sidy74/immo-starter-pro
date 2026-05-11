import { Component, computed, inject, signal } from '@angular/core';
import { LucideMoon, LucideMap, LucideSun } from '@lucide/angular';
import { PropertyCard } from './shared/components/property-card/property-card';
import { Property } from './shared/models/property.model';
import { HttpClient } from '@angular/common/http';
import { FilterSection } from './components/filter-section/filter-section';

@Component({
  selector: 'app-root',
  imports: [LucideSun, LucideMoon, LucideMap, PropertyCard, FilterSection],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('immo-starter-pro');

  viewMode = signal<'grid' | 'map'>('grid');

  searchQuery = signal('');
  selectedCategory = signal<string>('All');

  maxPrice = signal<number>(1000000);
  minBeds = signal<number>(0);
  showAdvanced = signal(false);

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

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  private http = inject(HttpClient);
  properties = signal<Property[]>([]);

  constructor() {
    this.loadProperties();
  }

  loadProperties() {
    this.http
      .get<Property[]>('assets/data/properties.json')
      .subscribe((data: Property[]) => this.properties.set(data));
  }
  // Logique favoris centralisée
  handleFavorite(property: any) {
    console.log(`Favorite toggled: ${property.title}`);
  }
}
