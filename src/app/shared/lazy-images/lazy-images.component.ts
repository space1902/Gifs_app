import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-images',
  templateUrl: './lazy-images.component.html'
})
export class LazyImagesComponent implements OnInit {

  @Input()
  url!: string;

  @Input()
  alt!: string;

  ngOnInit(): void {
    if(!this.url)
    throw new Error('Method not implemented.');
  }

  public hasLoadeed: boolean = false;

  onLoad() {
    this.hasLoadeed = true;
  }


}
