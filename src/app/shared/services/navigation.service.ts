import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // Gère l'onglet actif (home, favorites, search, profile, etc.)
  activeTab = signal<string>('home');

  // Gère le mode d'affichage (grid ou map)
  viewMode = signal<'grid' | 'map'>('grid');

  constructor() {}

  // Méthode pour changer d'onglet
  setActiveTab(tab: string) {
    this.activeTab.set(tab);

    // Si on clique sur 'maps', on bascule automatiquement la vue
    if (tab === 'maps') {
      this.viewMode.set('map');
    } else if (tab === 'home' || tab === 'search') {
      this.viewMode.set('grid');
    }
  }

  // Méthode pour basculer uniquement la vue (pour le bouton flottant par exemple)
  toggleViewMode() {
    this.viewMode.update((mode) => (mode === 'grid' ? 'map' : 'grid'));
  }
}
