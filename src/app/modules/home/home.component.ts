import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //user
  currentUser: string;
  // Define an array to hold the image filenames
  imageFilenames: string[] = [];
  imageFilenames1: string[] = [];
  currentImage: string | null = null;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.currentImage = this.imageFilenames[0];
    // Generate image filenames from vanavihari-home-gallery-2.jpg to vanavihari-home-gallery-16.jpg
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
    // console.log(this.imageFilenames);
    // console.log(this.imageFilenames1)
    // Retrieve the logged-in user's data using the UserService
    const user = this.userService.getFullUser();
    this.currentUser = user ? user : '';
    console.log(this.currentUser);
    //alert('Registration successful!');
  }
  settings = {
    counter: false,
    plugins: [lgZoom], // Include the lgZoom plugin
  };
  onBeforeSlide(detail: BeforeSlideDetail): void {
    const { index, prevIndex } = detail;
    // console.log(`Slide changed from ${prevIndex} to ${index}`);
  }
  goToVanavihari() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
  goToJungleStar() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
}
