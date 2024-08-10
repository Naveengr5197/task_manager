import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  signupForm: FormGroup;
  hasSubmitted: boolean;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      email : ['',[Validators.required, Validators.pattern("")]],
      password : ['',[Validators.required, Validators.minLength(1)]]
    });
   }


  ngOnInit() {
  }


  onSignupButtonClicked(value) {
    this.authService.signup(value.email, value.password).subscribe((res: HttpResponse<any>) => {
      this.router.navigate(['/lists']);
    })
  }

}
