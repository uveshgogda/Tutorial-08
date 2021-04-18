import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MustMatch } from '../models/MustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  constructor(private _authService: AuthService, private _router: Router, private formBuilder: FormBuilder) {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    if (this._authService.isLoggedIn() === true) {
      this._router.navigate(['/video']);
    }
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this._authService.register(this.registerForm.value).subscribe(res => {
        this.registerForm.reset();
        this._router.navigate(['/login']);
      });
    }
  }
}
