import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor() { }

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

}
