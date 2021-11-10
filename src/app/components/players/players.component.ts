import { NgModuleResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/models';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  constructor(private _playersService: PlayerService) {}

  ngOnInit(): void {
    this._playersService.getPlayers().subscribe((p: Player[]) => {
      this.players = p;
    });
  }
}
