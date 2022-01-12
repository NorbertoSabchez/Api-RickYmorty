import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Character } from '@shared/interface/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor( private http: HttpClient ) { }
  
  searchCharacter( query = '', page = 1){
    const filter = `${environment.baseUrlAPI}/?name=${query}&${page}`;
    return this.http.get<Character[]>(filter);
  }
  getDetails(id:number){
    return this.http.get<Character[]>(`$${environment.baseUrlAPI}/${id}`);
  }
}
