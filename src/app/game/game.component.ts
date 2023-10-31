import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogueAddPlayerComponent } from '../dialogue-add-player/dialogue-add-player.component';
import { Firestore, collection, doc,  onSnapshot, query, limit, addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  unsubGame;
  firebaseGame: {} = {};
  firestore: Firestore = inject(Firestore); //aus Kevins video
  constructor(public dialog: MatDialog) { } 

  ngOnInit(): void {
    this.newGame();
    this.unsubGame = this.getGame();
  }

  ngonDestroy() {
    this.unsubGame;
  }

getGame() {
  //const q = query(this.getCollectionRef('games/ENtm9u85RfSzMupHwyV0/games'));
  const q = query(this.getCollectionRef('games'));
  return onSnapshot(q, (list) => {
    list.forEach(element => {
      //console.log('element.id:', element.id);
      //this.firebaseGame = element.data();
      //console.log('element: ', this.firebaseGame);
    }
      )
  })
}
  
  getCollectionRef(collectionID: string) {
    return collection(this.firestore, collectionID);
  }

  getSingleDocRef(collectionID: string, documentID: string) {
    return doc(collection(this.firestore, collectionID), documentID)
  }


  newGame() {
    this.game = new Game();
    this.addGame(this.game.toJSON(), 'games');
  }

  async addGame(item: {}, collectionID: string) {
    await addDoc(this.getCollectionRef(collectionID), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
      }
    )
  }



  pickCard() {
    if (!this.pickCardAnimation) { //wird nur durchgeführt, wenn animation false ist
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => { //setzt nach timeout die Animation-Variable auf false
        this.game.playedCard.push(this.currentCard); //pusht nach Animation neue Karte in den playedCard stack zum Anzeigen
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


}
