import { Component, signal } from '@angular/core';
import { LucideMoon, LucideSun } from '@lucide/angular';
import { PropertyList } from './shared/components/property-list/property-list.component';

@Component({
  selector: 'app-root',
  imports: [LucideSun, LucideMoon, PropertyList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('immo-starter-pro');
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
