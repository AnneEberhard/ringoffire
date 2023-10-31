import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  constructor(private route: Router) { }

  gameInfoID: string = '';

  ngOnInit(): void { };

  async newGame() {
    let game = new Game; //erstellt neues Game
    await this.addGame(game.toJSON(), 'games'); // fügt neues Game dem firestore hinzu
    console.log('aus der newGame', this.gameInfoID) // beachte await vorher
    this.route.navigateByUrl('/game/'+ this.gameInfoID); //beachte die Syntax
  }

  async addGame(item: {}, collectionID: string) {
    let collRef = this.getCollectionRef(collectionID);
    await addDoc(collRef, item).catch(
      (err) => { console.error(err) }
    ).then(
      (gameInfo) => {
        console.log('gameInfo: ', gameInfo);
        console.log('gameInfo- ID: ', gameInfo['id']); //das ist meine id die ich brauche!
        this.gameInfoID = gameInfo['id']
      }
    )
  }

  getCollectionRef(collectionID: string) {
    return collection(this.firestore, collectionID);
  }
}
