import { Component, signal } from '@angular/core';
import { PropertyList } from './shared/components/property-list/property-list.component';
import { NavigationComponent } from './components/navigation.component/navigation.component';

@Component({
  selector: 'app-root',
  imports: [PropertyList, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('immo-starter-pro');
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
