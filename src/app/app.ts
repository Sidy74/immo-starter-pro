import { Component, inject, signal } from '@angular/core';
import { LucideMoon, LucideSun } from '@lucide/angular';
import { PropertyCard } from './shared/components/property-card/property-card';
import { Property } from './shared/models/property.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [LucideSun, LucideMoon, PropertyCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('immo-starter-pro');

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
