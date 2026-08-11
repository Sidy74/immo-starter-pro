import { Component, signal, HostListener, inject } from '@angular/core';
import {
  LucideHome,
  LucideSearch,
  LucideHeart,
  LucideUser,
  LucideMoon,
  LucideMap,
  LucideSun,
  LucideBell,
} from '@lucide/angular';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    LucideHome,
    LucideSun,
    LucideSearch,
    LucideHeart,
    LucideBell,
    LucideUser,
    LucideMap,
    LucideMoon,
  ],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  activeTab = signal('home');
  isDark = signal(false);
  public navService: NavigationService = inject(NavigationService);

  toggleDarkMode() {
    this.isDark.update((v) => !v);
    document.documentElement.classList.toggle('dark');
  }
}
