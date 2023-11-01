import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  allProfilePictures = ['player0.png', 'player1.png', 'player2.png', 'player3.png', 'player4.png', 'player5.png']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
