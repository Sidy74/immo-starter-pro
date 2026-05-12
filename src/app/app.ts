import { Component, signal } from '@angular/core';
import { NavigationComponent } from './components/navigation.component/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('immo-starter-pro');
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
