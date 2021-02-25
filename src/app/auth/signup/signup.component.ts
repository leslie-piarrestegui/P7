import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

isAuth = false;
isAuthSubscription: Subscription;

  ngOnInit(): void {
    this.initForm();
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(IsAuthAJour => {
      this.isAuth = IsAuthAJour;
      console.log(`la valeur a changé (isAuth = ${IsAuthAJour})`);

      if (IsAuthAJour === true) {
        console.log('bonjour');
        // ....
      } else {
        console.log('bye bye');
        // ....
      }
    });
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  
  onSignUp() {
    const formValue = this.signUpForm.value;
    const newUser = new User(
      formValue["firstName"],
      formValue["lastName"],
      formValue["email"]
    );
    this.authService.signIn().then(
      () => {
        this.authService.addUser(newUser);
        console.log(newUser);
        this.router.navigate(['home']);
      }
    );
  }

  }


  // onSignUp() {
  //   this.authService.signIn().then(
  //     () => {
  //       this.router.navigate(['home']);
  //     }
  //   );
  // }

