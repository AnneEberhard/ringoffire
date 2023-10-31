import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogueAddPlayerComponent } from '../dialogue-add-player/dialogue-add-player.component';
import { Firestore, collection, doc, onSnapshot, query, limit, addDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  gameId: string;

  unsubGame; //subscription für onSnapshot

  firestore: Firestore = inject(Firestore); //aus Kevins video
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((gameId) => { //id kommt aus der url, um immer auf dasselbe Game zuzugreifen
      if (gameId) {
        this.unsubGame = this.getGame((gameId['id'])); //wichtig hier auf die id des Objectes zuzugreifen
        this.gameId = gameId['id'];
      }
    });
  }

  ngonDestroy() {
    this.unsubGame;
  }

  getGame(gameID) {
    //console.log('getGame GamesID:', gameID);
    let docRef = this.getSingleDocRef('games', gameID);
    return onSnapshot(docRef, (doc) => {
      //console.log("Current data: ", doc.data());
      this.game.players = doc.data()['players'];
      this.game.stack = doc.data()['stack'];
      this.game.playedCard = doc.data()['playedCard'];
      this.game.currentPlayer = doc.data()['currentPlayer'];
    });
  }

  getCollectionRef(collectionID: string) {
    return collection(this.firestore, collectionID);
  }

  getSingleDocRef(collectionID: string, documentID: string) {
    return doc(collection(this.firestore, collectionID), documentID)
  }


  newGame() {
    this.game = new Game();
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
        this.saveGame();
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
    this.saveGame();
  }

  async saveGame() {
    let docRef = this.getSingleDocRef('games', this.gameId);
    await updateDoc(docRef, this.game.toJSON()).catch(
      (err) => { console.error(err); } //um Fehler abzufangen
    );
    console.log(this.game);
  }



}


