import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

import {take, filter} from "rxjs/operators"
type RequestInfo = {
  next: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
 characters: Character[] = [];
  info: RequestInfo={
    next: null,
  };
 private pageNum = 1;
 private query: string;
 private scrollHideHeight=200;
 private scrollShowHeight=500;


  constructor(
    private characterSvc: CharacterService, 
    private route: ActivatedRoute, 
    private router: Router) { 

    this.onUrlChange();
  }

  ngOnInit(): void {
    this.getCharacterByQuery();
  }



  private onUrlChange():void{
    this.router.events.pipe(
      filter((envent)=> envent instanceof NavigationEnd)).subscribe(()=>{
        this.characters=[];
        this.pageNum=1;
        this.getCharacterByQuery();
      })
  }
  private getCharacterByQuery():void{
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap)=>{
      console.log('parametro',params)
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService():void{
    this.characterSvc.searchCharacter(this.query, this.pageNum)
    .pipe(
      take(1)
      ).subscribe((res : any) =>{

        if(res?.results?.length){
          const {info, results} = res;
          this.characters = [...this.characters, ...results ];
          this.info = info;
        } else {
          this.characters = [];
        }
      });
  }
}
