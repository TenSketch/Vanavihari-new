import { Component, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  private lightGallery!: LightGallery;
  imageFilenames: string[] = [];
  imageFilenames1: string[] = [];
  currentImage: string | null = null;
  showSlideshow: boolean = false; // Flag to show slideshow
  slideshowInterval: any; // Interval for slideshow
  @Input() id: any;
  @Input() selectedRoom: any;
  constructor() {
    for (let i = 2; i <= 16; i++) {
      this.imageFilenames.push(
        `assets/img/home-gallery/vanavihari-home-gallery-${i}.jpg`
      );
      this.imageFilenames1.push(
        `assets/img/home-gallery-junglestar/junglestar-home-gallery-${i}.jpg`
      );
    }
  }

  ngOnInit(): void {
    console.log('ifffffffff', this.id);
  }

  settings = {
    counter: false,
    plugins: [lgZoom], // Include the lgZoom plugin
  };

  onBeforeSlide(detail: BeforeSlideDetail): void {
    const { index, prevIndex } = detail;
    // console.log(`Slide changed from ${prevIndex} to ${index}`);
  }

  ngOnDestroy(): void {
    clearInterval(this.slideshowInterval);
  }
}
