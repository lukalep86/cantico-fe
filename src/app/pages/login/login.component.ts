import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  credentialsForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.credentialsForm = this.fb.group({
      email: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.router.navigate([''], {
      state: { email: this.credentialsForm.getRawValue() },
    });
  }
}
