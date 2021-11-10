import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './components/players/players.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
const routes: Routes = [
  { path: '', component: PlayersComponent },
  { path: 'player/new', component: PlayerFormComponent },
  { path: 'player/:id', component: PlayerFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
