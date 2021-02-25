import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) { }

  isAuth = false;
  isAuthSubscription: Subscription;

  ngOnInit() {
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

  ngOnDestroy() {
    if (this.isAuthSubscription) {
      this.isAuthSubscription.unsubscribe();
    }
  }

  onSignOut() {
    this.authService.singOut();
  }
}
