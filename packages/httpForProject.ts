
{"rules": {
   ".read": "true",
   ".write": "true"
 }
}

// app.module.ts ///////
imports: [
  HttpModule
],
providers: [
  DataStorageService
]

//  shared/data-storage.service.ts //////
import { Injectable } from '@angular/core';
import { Http } from '';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}
  
  storeRecipes() {
    
    return this.httpClient.put('https://firebase.com/recipes.json',
      this.recipeService.getRecipes());
  }
  
  getRecipes() {
    
    this.httpClient.get('https://firebase.com/recipes.json')
       .subscribe(
         (response: Response) => {
           const recipes: Recipe[] = response.json();
           
           this.recipeService.setRecipes(recipes);
       });
  }
   
}

// header.component.html //////////////////////
<li (click)="onSaveData()"
>Save Data</li>
<li (click)="onFetchData()"
>Fetch Data</li>


// header.component.ts /////////////////////
import { Response } from '@angular/common/http';

import { DataStorageService } from '../shared/data-storage.service';

export class HeaderComponent {
 
 constructor(private dataStoreService: DataStorageService) {}

  onSaveData() {
    
    this.dataStoreService.storeRecipes()
      .subscribe(
        (response: Response) => {
         log(response);
      });
    }
    
   onFetchData() {
     this.dataStoreService.getRecipes();
   }
   
}

// recipe.service.ts /////////////

setRecipes(recipes: Recipe[]) {
  
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice());
}








