import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dialogue-add-player',
  templateUrl: './dialogue-add-player.component.html',
  styleUrls: ['./dialogue-add-player.component.scss']
})
export class DialogueAddPlayerComponent {
  name:string ='';
  onNoClick(): void {
  
  }
}
