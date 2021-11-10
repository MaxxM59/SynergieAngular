import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Player } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private afs: AngularFirestore) {}

  getPlayers(): Observable<Player[]> {
    // RECUPERE LES PLAYERS
    // return this.afs.collection<Player>('players').valueChanges();

    //POUR A VOIR L'ID
    return this.afs
      .collection<Player>('players')
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }
  getPlayer(id: string): Observable<Player> {
    // 2E Methode return this.afs.doc<Player>('players/${id}')

    return this.afs
      .collection<Player>('players')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Player;
          } else {
            const data = action.payload.data() as Player;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }

  addPlayers(player: Player): void {
    this.afs.collection<Player>('players').add(player);
  }
  updatePlayer(player: Player, playerId: string): void {
    this.afs.collection<Player>('players').doc(playerId).update(player);
  }
  deletePlayer(playerId: string): void {
    //this.afs.doc<Player>('player/$(playerId)').delete();
    this.afs.collection<Player>('players').doc(playerId).delete();
  }
}
