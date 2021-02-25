import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {


  users : User[];
  userSubscription: Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
