import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(private gifservice: GifsService) { }

  get gifs(): Gif []   {
    return this.gifservice.gifList;
  }
}
