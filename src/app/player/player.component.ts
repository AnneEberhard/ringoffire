import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

@Input() name;
@Input() index;
@Input() playerActive: boolean = false;
@Input() profilePic;
}
