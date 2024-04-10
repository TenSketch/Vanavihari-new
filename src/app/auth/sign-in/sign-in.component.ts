import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  showAlert: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      email_address: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['message']) {
        const message = params['message'];
        this.showSnackBarAlert(message);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true; // Display loader

      setTimeout(() => {
        const checkUserExist = localStorage.getItem('user');
        const modifiedInValidForm = JSON.parse(checkUserExist || '[]');
        const ValidUser = modifiedInValidForm.find(
          (v: any) =>
            v.email_id === this.form.value.email_address &&
            v.password === this.form.value.password
        );
        if (ValidUser) {
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(ValidUser));
          this.showSuccessAlert();
          this.router.navigate(['/homepage']);
        } else {
          this.showSnackBarAlert(
            'Invalid credentials. Please check your email and password.'
          );
        }

        this.isLoading = false; // Hide loader after operations
      }, 1000); // Wait for 1 second
    }
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToSignup() {
    this.router.navigate(['/sign-up']);
  }

  showSuccessAlert() {
    this.snackBar
      .open('Sign in successfully!', 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe(() =>
        this.router.navigate(['/homepage'], {
          queryParams: { id: this.form.value.email_id },
        })
      );

    this.showAlert = false;
  }

  showSnackBarAlert(msg = '', redirect = true) {
    var snackBar = this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
    });
    if (redirect) {
      snackBar.afterDismissed().subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
    }
  }
}
