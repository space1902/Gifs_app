import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit {
  ngOnInit(): void {
    if (!this.gif)
    throw new Error('Gif no encontrado');
  }

  @Input()
  public gif!:Gif ;
}
