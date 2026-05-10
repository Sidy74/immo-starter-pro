import { Component, signal } from '@angular/core';
import { LucideMoon, LucideSun, provideLucideIcons, LucideComponent } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [LucideSun, LucideMoon],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [

  ]

})
export class App {
  protected readonly title = signal('immo-starter-pro');

  sun = LucideSun;

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
