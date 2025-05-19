import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges {

  @Input({ required: true }) bannerTitle = '';
  @Input({ required: true }) bannerDescription = '';
  @Input({ required: true }) key = '';
  private sanitizer = inject(DomSanitizer);
  vedioUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=1`);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {

    }
  }
}
