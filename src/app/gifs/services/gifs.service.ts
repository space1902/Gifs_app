import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerachResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor( private http: HttpClient) {
    this.readLocalStorage();
   }

  public gifList:Gif[] = [];

  private _tagsHistori: string[] = [];
  private apiKey:       string =  '9hDqxplbJeTowsDUMlqGJyUkni45GlTt';
  private url:          string = 'https://api.giphy.com/v1/gifs';

  get tagsHistori(): string[] {
    return [...this._tagsHistori];
  }

  private organizeTagsHistori(tag: string): void {
    tag = tag.toLowerCase();
    if(this._tagsHistori.includes(tag)){
      this._tagsHistori = this._tagsHistori.filter(item => item !== tag);
    }

    this._tagsHistori.unshift(tag);
    this._tagsHistori = this._tagsHistori.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('tagsHistori', JSON.stringify(this._tagsHistori));
  }

  private readLocalStorage(): void{
    if(!localStorage.getItem('tagsHistori')) return;
    this._tagsHistori = JSON.parse(localStorage.getItem('tagsHistori')!);

    if(this._tagsHistori.length >0) {
      this.searchTag(this._tagsHistori[0]);
    }
  }

  searchTag(tag: string): void{
    if(tag.length === 0)return;
    this.organizeTagsHistori(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SerachResponse>(`${this.url}/search`, {params})
      .subscribe((resp ) => {
        this.gifList = resp.data;
        localStorage.setItem('tagsHistori', JSON.stringify(this._tagsHistori));
      });
  }
  /* otra manera */
  /* async searchTag(tag: string): Promise<void> {
    if(tag.length === 0)return;
    this.organizeTagsHistori(tag);

    fetch('https://api.giphy.com/v1/gifs/search?api_key=9hDqxplbJeTowsDUMlqGJyUkni45GlTt&q=valorand&limit=10')
    .then(resp => resp.json())
    .then(({data}) => {
      console.log(data);
    });
  } */
}
