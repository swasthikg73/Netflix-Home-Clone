import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse By Language"];
  @Input() imageUrl: string = '';
}
