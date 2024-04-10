import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

interface ReservationDetails {
  guestName: string;
  resortName: string;
  resortLocation: string;
  bookingId: string;
  checkInDate: string;
  checkOutDate: string;
  amount: string;
  upiId: string;
  qrCodeUrl: string;
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  guestEmail: string;
}

@Component({
  selector: 'app-booking-successfull',
  templateUrl: './booking-successfull.component.html',
  styleUrls: ['./booking-successfull.component.scss'],
})
export class BookingSuccessfullComponent {
  reservationDetails: ReservationDetails = {} as ReservationDetails;
  bookingTypeResort: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bookingTypeResort = params['bookingTypeResort'];
    });
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      console.log('this.user=', user);
      this.reservationDetails = {
        guestName: user.full_name,
        resortName: this.bookingTypeResort,
        resortLocation: 'Jungle Star, Valamuru',
        bookingId: 'BJ2404971',
        checkInDate: this.authService.getSearchData('checkin'),
        checkOutDate: this.authService.getSearchData('checkout'),
        amount: 'INR 11000',
        upiId: 'QR917382151617-5587@unionbankofindia',
        qrCodeUrl: '1711639164121_qr2.pdf',
        contactPerson: 'Mr. Veerababu',
        contactNumber: user.mobile_number,
        contactEmail: 'info@vanavihari.com',
        guestEmail: user.email_id,
      };
    }
    // const params = new HttpParams()
    //   .set('email', this.authService.getAccountUsername() ?? '')
    //   .set('token', this.authService.getAccessToken() ?? '');
    // this.http
    //   .get<any>(
    //     'https://vanavihari-ng.netlify.app/zoho-connect?api_type=profile_details',
    //     { params }
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       console.log('response===', response);
    //       const userString = localStorage.getItem('currentUser');
    //       if (userString) {
    //         const user = JSON.parse(userString);
    //         console.log('this.user=', user);

    //         if (response.code == 3000 && response.result.status == 'success') {
    //           this.reservationDetails = {
    //             guestName: user.full_name,
    //             resortName: this.bookingTypeResort,
    //             resortLocation: 'Jungle Star, Valamuru',
    //             bookingId: 'BJ2404971',
    //             checkInDate: this.authService.getSearchData('checkin'),
    //             checkOutDate: this.authService.getSearchData('checkout'),
    //             amount: 'INR 11000',
    //             upiId: 'QR917382151617-5587@unionbankofindia',
    //             qrCodeUrl: '1711639164121_qr2.pdf',
    //             contactPerson: 'Mr. Veerababu',
    //             contactNumber: user.mobile_number,
    //             contactEmail: 'info@vanavihari.com',
    //             guestEmail: user.email_id,
    //           };
    //         } else if (response.code == 3000) {
    //           this.userService.clearUser();
    //           alert('Login Error!');
    //           // this.router.navigate(['/home']);
    //         } else {
    //           this.userService.clearUser();
    //           alert('Login Error!');
    //           // this.router.navigate(['/home']);
    //         }
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error:', err);
    //     },
    //   });
  }
}
