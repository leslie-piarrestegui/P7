import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';


import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CardsService } from './services/cards.service'




const appRoutes:  Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  { path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: '**', redirectTo: 'home'}
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    ProfilComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [
    AuthService,
    AuthGuardService,
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
