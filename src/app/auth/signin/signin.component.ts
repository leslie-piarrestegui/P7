import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private formbuilder: FormBuilder) { }

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
  this.signInForm = this.formbuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  });
}

onSignIn() {
  this.authService.signIn().then(
    () => {
      this.authService.emitUsers();
      this.router.navigate(['home']);
    }
  );
}

}

