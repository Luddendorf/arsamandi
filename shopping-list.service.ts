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
<li><a routerLink="/">Home</a></li>
<li><a routerLink="/servers">Servers</a></li>
<li><a [routerLink]="'/users'">Users</a></li>

<div>
  <router-outlet></router-outlet>
 </div>

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

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'item/:id', component: ItemCompnent },
  { path: '**', component: NotFoundComponent }
  ];

 
imports: [
  RouterModule.forRoot(appRoutes)
  ]

////  app.component.html //////
<a routerLink="">Main page</a>
<a routerLink="/about"
   [routerLinkActiveOptions]="{exact: true}">About the site</a>
<a [routerLink]="['item', '5']" routerLinkActive="active">Item 5</a>
<a [routerLink]="['item', '8']" routerLinkActive="active">Item 8</a>

<li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
><a routerLink="">Main</a></li>


export class ItemComponent {
 
   private id: number;
   private subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute) {
      
      this.subscription = activateRoute.params
        .subscribe(params => this.id = params['id']);
    }
}

// servers.component.html ////////

<a routerLink="/servers">Reload Page</a>

<a routerLink="servers"></a>

<a routerLinkActive="active"
   [routerLinkActiveOptions]="{exact: true}"
   routerLink="/">Main</a>
<a routerLinkActive="active"
   routerLink="/recipes">Recipes</a>
<a routerLinkActive="active"
   routerLink="/ingreds">Ingreds</a>


// home.component.html //////////////

<button (click)="onLoadServers()"
>Load Servers</button>

<button (click)="onReload()"
>Reload Page</button>

// home.component.ts //////////////
import { Router } from '@angular/router';

export class HomeComponent implements OnInit {

constructor(private router: Router) {}
  
onLoadServers() {
  
  this.router.navigate(['/servers']);
}

 onReload() {
   
   this.router.navigate(['servers'], {relativeTo: this.route});
 }
}
    

// app.module.ts //////////////
import { NgModule } from '@angular/core';

 const myRoutes = [
   { path: '', component: HomeComponent },
   { path: 'users',
     data: { title: 'Users',
             anotherParam: 'something else' },
     component: UsersComponent },
   { path: 'users/:id', component: UserComponent }
   ];

@NgModule({
  imports: [
   RouterModule.forRoot(myRoutes. {useHash: true})
   ]
})

// app.component.ts   ////////////////
 export class AppComponent {
  userId = 15; 
 }
    

// app.component.html ////////////////

<a routerLink="" routerLinkActive="active"
   [routerLinkActiveOptions]="{exact: true}">Home</a>


<a routerLink="users"
   [queryParams]="{q: 1111}"
routerLinkActive="active">Users</a>

<a [routerLink]="['users', uderId]" routerLinkActive="active">User {{ userId }}</a>

<div>
  <router-outlet></router-outlet>
</div>


// users.component.ts /////////
export class UsersComponent implements OnInit {
 
  constructor(private actRoute: ActivatedRoute) {
    
    this.route.queryParamMap.subscribe(params => console.log(params));
    this.route.data.subscribe(data => console.log(data));
  }
}


   
// user.component.ts /////////
export class UserComponent implements OnInit {
  
 constructor(private actRoute: ActivatedRoute) {
   
   this.route.paramMap.subscribe(
      params => console.log(params)
   );
 } 
}

<button (click)="goToUser(17)"
>Go!</button>

// home.component.ts //////////////
export class HomeComponent implements OnInit {
  
  constructor(private _router: Router,
              private _actRoute: ActivatedRoute) {}
  
  goToUser(userId) {
    
    this._router.navigate(['users', userId], { skipLocationChange: true, relativeTo: this._actRoute})
      .then(() => {
       
    });
    this._router.navigateByUrl('users/' + userId, { skipLocationChange: true });
  }
}

<button (click)="onReload()"
>Reload Page</button>

constructor(private router: Router,
            private actRoute: ActivatedRoute) {}

onReload() {
  
  this.router.navigate(['servers'], {relativeTo: this.actRoute});
}


// app.module.ts //////

const appRoutes: Routes = {
  { path: 'users/:id', component: UsersComponent }
} 


// users.component.ts ///////
export class UsersComponent {
  
  
}










    



