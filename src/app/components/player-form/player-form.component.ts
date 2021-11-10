import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Player } from 'src/app/models/models';
import { PlayerService } from 'src/app/services/player.service';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
  id: string = '';

  player: Player = {
    id: '',
    firstname: '',
    lastname: '',
    country: '',
    age: 0,
  };
  constructor(
    private _playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashmessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id)
      this._playerService
        .getPlayer(this.id)
        .subscribe((p) => (this.player = p));
  }

  save(playerForm: NgForm) {
    if (playerForm.valid) {
      if (this.id) {
        this._playerService.updatePlayer(playerForm.value, this.id);
        this._flashmessage.show('Player Updated', {
          cssClass: 'alert alert-primary',
          setTimeout: 4000,
        });
      } else {
        this._playerService.addPlayers(playerForm.value);
        this._flashmessage.show('A new player has been added', {
          cssClass: 'alert alert-success',
          setTimeout: 4000,
        });
      }

      this.router.navigate(['/']);
    } else {
      this._flashmessage.show('There are some errors with the form !', {
        cssClass: 'alert alert-danger',
        setTimeout: 4000,
      });
    }
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this._playerService.deletePlayer(this.id);
      this._flashmessage.show('Player deleted', {
        cssClass: 'alert alert-danger',
        setTimeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
}
