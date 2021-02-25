import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable() 
export class CardsService {
    cardSubject = new Subject<any[]>();
    private cards =[
        {
            id:"",
            text:""
        }
    ];

    constructor(private httpClient: HttpClient) {}

    emitCardSubject() {
        this.cardSubject.next(this.cards);
    }

    // getCardById(id: number) {
    //     const card = this.cards.find(
    //         (cardObject) => {
    //             return cardObject.id === id;
    //         }
    //     );
    //     return card;
    // }

    // addCard(text:string) {
    //     const cardObject = {
    //         id: 0,
    //         text: ""
    //     };
    //     cardObject.text = text;
    //     cardObject.id = this.cards[(this.cards.length -1)].id + 1;
        
    //     this.cards.push(cardObject);
    //     this.emitCardSubject();
    // }

    saveCardsToServer() {
        this.httpClient
            .put('https://openclassroom-48d21-default-rtdb.firebaseio.com/cards.json', this.cards)
            .subscribe(
                () => {
                    console.log("enregistrement terminé!");
                },
                (error) => {
                    console.log("erreur de sauvegarde" + error);
                }
            );
    }

    getCardsFromServer() {
        this.httpClient
            .get<any[]>("https://http-client-demo-9e30e-default-rtdb.firebaseio.com/cards.json")
            .subscribe(
                (response) => {
                    console.log("charger")
                    this.cards = response;
                    this.emitCardSubject();
                },
                (error) => {
                    console.log("erreur de chargement" + error);
                }
            );
    }
}
