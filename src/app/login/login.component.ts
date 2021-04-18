import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private _authService: AuthService, private _router: Router, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')]],
    });
    if (this._authService.isLoggedIn() === true) {
      this._router.navigate(['/videos']);
    }
  }
  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this._authService.login(this.loginForm.value);
    }
  }

}
