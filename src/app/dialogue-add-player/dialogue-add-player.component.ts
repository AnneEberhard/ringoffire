import { Component, Inject } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-add-player',
  templateUrl: './dialogue-add-player.component.html',
  styleUrls: ['./dialogue-add-player.component.scss']
})
export class DialogueAddPlayerComponent {
  name:string ='';

  constructor(public dialogRef: MatDialogRef<DialogueAddPlayerComponent>) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
