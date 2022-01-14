import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Character } from "@app/shared/interface/character.interface";

@Component({
    selector:'app-character',
    template:`
    <div class="card">
    <div class="image">
        <a [routerLink]="['/character-details', character.id]">
            <img [src]="character.image" 
            [alt]="character.name"
            class="card-img-top">
        </a>
    </div>
    <div class="card-inner">
        <div class="header">
            <a [routerLink]="['/character-details', character.id]">
                <h2>{{character.name}}</h2>
            </a>
        </div>
    </div>
</div>`,
changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input() character:Character
}