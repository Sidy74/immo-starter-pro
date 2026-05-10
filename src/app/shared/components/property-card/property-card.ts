import { DecimalPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import {
  LucideMapPin,
  LucideHeart,
  LucideBath,
  LucideMaximize,
  LucideBedDouble,
} from '@lucide/angular';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-card',
  imports: [LucideMapPin, LucideHeart, LucideBath, DecimalPipe, LucideBedDouble, LucideMaximize],
  templateUrl: './property-card.html',
  styles: ``,
})
export class PropertyCard {
  property = input.required<Property>();
  isFavorite = signal(false);
  toggleFavorite = output<Property>();
  onHeartClick(event: Event) {
    event.stopPropagation();
    this.isFavorite.update(value => !value);
    this.toggleFavorite.emit(this.property());
  }
}
