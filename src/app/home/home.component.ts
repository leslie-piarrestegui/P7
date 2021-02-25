import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private cardsService : CardsService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onSubmitCArd(form: NgForm) {
    const text = form.value['text'];
    //this.cardsService.addCard(text);
    this.cardsService.saveCardsToServer();
    this.cardsService.getCardsFromServer();
    this.router.navigate(['/home']);
  }

}
