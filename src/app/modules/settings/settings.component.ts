import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  form: FormGroup;
  editingField: string | null = null;
  storedUser: any;
  isLoading: boolean = false;
  countries: string[] = [
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas (the)',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory (the)',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands (the)',
    'Central African Republic (the)',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands (the)',
    'Colombia',
    'Comoros (the)',
    'Congo (the Democratic Republic of the)',
    'Congo (the)',
    'Cook Islands (the)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    "Côte d'Ivoire",
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic (the)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands (the) [Malvinas]',
    'Faroe Islands (the)',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories (the)',
    'Gabon',
    'Gambia (the)',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (the)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea (the Democratic People's Republic of)",
    'Korea (the Republic of)',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic (the)",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands (the)',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Moldova (the Republic of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands (the)',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger (the)',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands (the)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine, State of',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines (the)',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of North Macedonia',
    'Romania',
    'Russian Federation (the)',
    'Rwanda',
    'Réunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan (the)',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan (Province of China)',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands (the)',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates (the)',
    'United Kingdom of Great Britain and Northern Ireland (the)',
    'United States Minor Outlying Islands (the)',
    'United States of America (the)',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      full_name: ['Venkat'],
      mobile_number: ['8056562076'],
      email: ['venkat408prabhu@gmail.com', Validators.email],
      dob: ['', Validators.required],
      nationality: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      pincode: [''],
      country: [''],
    });
  }

  ngOnInit(): void {
    // this.openModal();
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      console.log('this.user=', user);
      this.form = this.formBuilder.group({
        full_name: user.full_name,
        mobile_number: user.mobile_number,
        email: user.email_id,
        dob: user.dob,
        nationality: user.nationality,
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        country: user.country,
      });
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
    //       if (response.code == 3000 && response.result.status == 'success') {
    //         this.form = this.formBuilder.group({
    //           full_name: [response.result.name],
    //           mobile_number: [response.result.phone],
    //           email: [response.result.email, Validators.email],
    //           dob: [response.result.dob, Validators.required],
    //           nationality: [response.result.nationality],
    //           address1: [response.result.address1],
    //           address2: [response.result.address2],
    //           city: [response.result.city],
    //           state: [response.result.state],
    //           pincode: [response.result.pincode],
    //           country: [response.result.country],
    //         });
    //       } else if (response.code == 3000) {
    //         this.userService.clearUser();
    //         alert('Login Error!');
    //         this.router.navigate(['/home']);
    //       } else {
    //         this.userService.clearUser();
    //         alert('Login Error!');
    //         this.router.navigate(['/home']);
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error:', err);
    //     },
    //   });
  }
  formatDateToDDMMMYYYY(date: Date): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;
    return formattedDate;
  }
  onSubmit() {
    this.isLoading = true;
    alert('Profile Update Successfully!');
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1000);

    // if (this.form.valid) {
    //   let params = new HttpParams()
    //     .set('login_email', this.userService.getUser())
    //     .set('token', this.userService.getUserToken());

    //   let data = this.form.value;
    //   Object.keys(data).forEach((key) => {
    //     if (data[key] !== null && data[key] !== undefined) {
    //       if (key == 'dob')
    //         params = params.set(key, this.formatDateToDDMMMYYYY(data[key]));
    //       else params = params.set(key, data[key].toString());
    //     }
    //   });
    //   this.http
    //     .get<any>(
    //       'https://vanavihari-ng.netlify.app/zoho-connect?api_type=edit_profile_details',
    //       { params }
    //     )
    //     .subscribe({
    //       next: (response) => {
    //         if (response.code == 3000 && response.result.status == 'success') {
    //           // this.router.navigate(['/home']);
    //           console.log(response.result);
    //           alert('Profile Update Successfully!');
    //         } else if (response.code == 3000) {
    //           console.log('error', response.result.msg);
    //         } else {
    //           console.log('error', 'Please Check this Credential!');
    //         }
    //       },
    //       error: (err) => {
    //         console.error('Error:', err);
    //       },
    //     });

    //   // if (this.userService.getUser() && this.userService.getUser() === this.form.value.email) {
    //   //   // this.router.navigate(['/home']);
    //   //   alert('Login successful! Welcome ' + storedUser.full_name);
    //   // } else {
    //   //   alert('Invalid email or password');
    //   // }
    // }
  }
  editField(field: string) {
    this.editingField = field;
  }
  cancelEditing(field: string) {
    this.form.patchValue(this.storedUser);
    this.editingField = null;
  }

  saveChanges(field: string) {
    this.storedUser = { ...this.storedUser, ...this.form.value };
    this.userService.setUser(this.storedUser);
    this.editingField = null;
    alert('Changes saved successfully!');
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToSignup() {
    this.router.navigate(['/sign-up']);
  }
}
