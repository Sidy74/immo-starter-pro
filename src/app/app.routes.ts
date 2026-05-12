import { Routes } from '@angular/router';
import { PropertyList } from './shared/components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-details.component/property-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyList },
  { path: 'property/:id', component: PropertyDetailsComponent },
];
