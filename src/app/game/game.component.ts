import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogueAddPlayerComponent } from '../dialogue-add-player/dialogue-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();  
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation) { //wird nur durchgeführt, wenn animation false ist
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
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
      if (name !== undefined && name.trim() !== '') {
        this.game.players.push(name);
      }
    });
    console.log(this.game.currentPlayer);
    console.log(this.game.players);
  }
  

}
