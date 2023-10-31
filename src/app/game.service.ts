import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  firestore: Firestore = inject(Firestore); //aus Kevins video


}
