import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import {GamesService} from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game | any = {
    id: 0,
    title: '',
    description: '',
    image: '',
    create_at: new Date()
  };

  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.gamesService.getGame(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }


  saveNewgame() {
    delete this.game.create_at;
    delete this.game.id;

    this.gamesService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    )

  }

  updateGame(){
    delete this.game.create_at;

    this.gamesService.updateGame(this.game.id, this.game)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.log(err)
    )

  }

}
