//gamesID: string[] = [];
//getAllGames() {
//    //const q = query(this.getCollectionRef('games/ENtm9u85RfSzMupHwyV0/games'));
//    const q = query(this.getCollectionRef('games'));
//    return onSnapshot(q, (list) => {
//      list.forEach(element => {
//        console.log('element.id:', element.id);
//        let id:string = element.id;
//        console.log('element: ', element.data());
//        this.gamesID.push(id);
//      }
//        )
//        console.log(this.gamesID);
//    })
//}

//changeToJSON(loadedgame):Game {
//    return {
//      players: loadedgame.players,
//      stack: loadedgame.stack,
//      playedCard: loadedgame.playedCard,
//      currentPlayer: loadedgame.currentPlayer,
//      toJSON(): { players: any; stack: any; playedCard: any; currentPlayer: any; } {
//        return {
//          players: this.players,
//          stack: this.stack,
//          playedCard: this.playedCard,
//          currentPlayer: this.currentPlayer
//        };
//      }
//    }
//  }