import { EventEmitter } from '@angular/core';

export class ShoppingListService {

ingredsChanged = new EventEmitter<Ingredient[]>();
  
  private ingreds: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  
  getIngreds() {
    return this.ingreds.slice();
  }
  
  addIngred(ingred: Ingredient) {
    this.ingreds.push(ingred);
    this.ingredsChanged.emit(this.ingreds.slice());
  }
  
  addManyIngreds(ingreds: Ingredient[]) {
    this.ingreds.push(...ingreds);
    this.ingredsChanged.emit(this.ingreds.slice());
  }
}
 /*  for(let ingred of ingreds) {
      this.addIngred(ingred);
    } */

// shopping-list.component.ts //////////////////////////////////
export class ShoppingListComponent implements OnInit {
 
 ingredients: Ingredient[];
 
 constructor(private slService: ShoppingListService) {
 }
 
  ngOnInit() {
    this.ingredients = this.slService.getIngreds();
    this.slService.ingredsChanged
         .subscribe(
           (ingreds: Ingredient[]) => {
              this.ingredients = ingreds;
              });
  }

}

// shopping-edit.component.ts ////////////////////////////////
export class ShoppingEditComponent implements OnInit {
  
  constructor(private slService: ShoppingListService) {}
  
  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngred = new Ingredient(ingName, ingAmount);
    
    this.slService.addIngred(newIngred);
  }
}


// recipe.model.ts ////////////////////////////////////////////////
import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  
  constructor(name: string, desc: string, imagePath: string, ingreds: Ingredient[]) {
     this.name = name;
     this.description = desc;
     this.imagePath = imagePath;
     this.ingredients = ingreds;
  }
}

// recipe.service.ts //////////////////////
@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
    [new Ingredient('Tomato', 5),
     new Ingredient('Cheese', 4),
     new Ingredient('Olives', 12)]
    ]),
    new Recipe(
    [new Ingredient('Meat', 2),
     new Ingredient('Onion', 5),
     new Ingredient('Potatoes', 6)]
    ]),
    new Recipe(
    [new Ingredient('Beans', 15),
     new Ingredient('Chicken', 1),
     new Ingredient('Carrot', 3)]
    ]),
    new Recipe(
    [new Ingredient('Buns', 1),
     new Ingredient('Meat', 2),
     new Ingredient('Cheese', 2),
     new Ingredient('Salad', 2)]
    ]),
  ];
  
  constructor(private slService: ShoppingListService) {}
  
  addIngredsToShopList(ingreds: Ingredient[]) {
     this.slService.addManyIngreds(ingreds);
  }
  
  
}

/// recipe-detail.component.html /////////////////////////
    <div class="dropdown-menu">
      <button (click)="onAddToShopList()"></button>
      <button></button>
      <button></button>
    </div>
    
 <div class="col-xs-12">
    <ul>
      <li *ngFor="let ingred of recipe.ingredients"
    >{{ ingred.name }} - {{ ingred.amount }}</li>
    </ul>
 </div>
    
    
 // recipe.detail.ts /////////////////////////////////////////
    export class RecipeDetailComponent implements OnInit {
    
    constructor(private recipeService: RecipeService) {}
    
    onAddToShopList() {
     
      this.recipeService.addIngredsToShopList(this.recipe.ingredients);
    }
    
    
    }
    

////////////     ROUTING  ////////////////

// app.comnponent.html  ///////////
<div></div>

<app-home></app-home>
<app-users></app-users>
<app-servers></app-servers>

//   app.module.ts /////////////
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'servers', component: ServersComponent }
];


@NgModule({
   imports: [
     RouterModule.forRoot()
   ]
})








    
    
    
    
    
    



