import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogueAddPlayerComponent } from '../dialogue-add-player/dialogue-add-player.component';
import { Firestore, collection, doc, onSnapshot, query, limit, addDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  gameOver: boolean = false;

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
      this.game.playerImages = doc.data()['playerImages'];
      this.game.stack = doc.data()['stack'];
      this.game.playedCard = doc.data()['playedCard'];
      this.game.currentPlayer = doc.data()['currentPlayer'];
      this.game.pickCardAnimation = doc.data()['pickCardAnimation'];
      this.game.currentCard = doc.data()['currentCard'];
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
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) { //wird nur durchgeführt, wenn animation false ist
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => { //setzt nach timeout die Animation-Variable auf false
        this.game.playedCard.push(this.game.currentCard); //pusht nach Animation neue Karte in den playedCard stack zum Anzeigen
        this.game.pickCardAnimation = false;
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
        this.game.playerImages.push('player0.png');
        this.saveGame();
      }
    });
  }

  async saveGame() {
    let docRef = this.getSingleDocRef('games', this.gameId);
    await updateDoc(docRef, this.game.toJSON()).catch(
      (err) => { console.error(err); } //um Fehler abzufangen
    );
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.playerImages.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.playerImages[playerId] = change;
        }
      }
    });
    this.saveGame();
  }

  restart() {
    let docRef = this.getSingleDocRef('games', this.gameId);
   onSnapshot(docRef, (doc) => {
      this.game.stack = doc.data()['playedCard'];
      this.game.playedCard = doc.data()['stack'];
      this.game.currentCard = doc.data()['currentCard'];
    });
    this. gameOver = false;
    this.saveGame();
    this.getGame(this.gameId);
    console.log(this.game)
  }
}


