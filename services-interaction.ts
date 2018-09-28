

// recipe.detail.component.hmtl ///////////////////
<button (click)="onAddToShopList()" >To Shopping List</button>


// recipe.detail.component.ts //////////////////////
export class RecipeDetailComponent implements OnInit {
  
  constructor(private recipeService: RecipeService) {}
  
  onAddToShopList() {
    this.recipeService.addIngredsToShopList(this.recipe.ingreds);
  }
}


// recipe.service.ts /////////////////////////////
@Injectable()
export class RecipeService {

 constructor(private slService: ShoppingListService) {}
 
 addIngredsToShopList(ingreds: Ingredient[]) {
   this.slService.addManyIngreds(ingreds);
 }
 
}

// shopping-list.service.ts ///////////////////////
export class ShoppingListService {

  addIngred(ingred: Ingredient) {
    this.ingreds.push(ingred);
    this.ingredsChanged.emit(this.ingreds.slice());
  }
  
  addManyIngreds(ingreds: Ingredient[]) {
      this.ingreds.push(...ingreds);
  }
}
// app.module.ts ////////////
{ path: 'users', component: UsersComponent, children: [
   { path: ':id/:name', component: UserComponent }
  ] },
{ path: 'servers', component: ServersComponent, children: [
   { path: ':id', component: ServerComponent },
   { path: ':id/edit', component: EditServerComponent },
] },




<a [routerLink]="['/users', 10, 'Anna']"
>Load Anna (10)</a>

// users.component.html ///////
<div>
  <router-outlet></router-outlet>
</div>

// user.component.ts /////////////
export class UserComponent implements OnInit, OnDestroy {
  
  paramsSubscription: Subscription;
  
 ngOnInit() {
   this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']};
   
   this.paramsSubscription = this.route.params
         .subscribe(
          (params: Params) => {
            this.user.id = params['id'];
            this.user.name = params['name']
          });
 }
  
  ngOnDestroy() {
    
    this.paramsSubscription.unsubscribe();
  }
}

// servers.component.html //////////////
<a [routerLink]="['/servers', server.id]"
   [queryParams]="{allowEdit: '1'}"
   [fragment]="loading"
></a>

<a [routerLink]="['/users', user.id, user.name]"
></a>

<div>
  <router-outlet></router-outlet>  
</div>

// server.component.html //////////
<button>Edittton>



// home.component.ts ///////////////
export class HomeComponent implements OnInit {
 
  onLoadServer(id: number) {
    
    this.router.navigate(['/servers', id, 'edit'],
          {queryParams: {allowEdit: '1'},
           fragment: 'loading'});
  }
  
  goToUser(userId) {
    
    this.router.navigate(['users', userId], {skipLocationChange: true,
                                             relativeTo: this.route });
    this.router.navigateByUrl('users/', userId,
            { skipLocationChange: true });
  }
}

// edit.server.component.ts //////////
export class EditServerComponent implements OnInit {
  
  constructor(private servService: ServersService,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    
     log(this.route.snapshot.queryParams);
     log(this.route.snapshot.fragment);
  }
 
  onUpdateServer() {
    
    this.servService.updateServer(this.updateServer, {name: this.serverName,
                                                         status: this.serverStatus});
  }
}

// server.component.ts /////
export class ServerComponent implements OnInit {
 
  server: {id: number, name: string, status: string};
  
  constructor(private servService: ServersService,
              private actRoute: ActivatedRoute) {}
  
  ngOnInit() {
    
    const id = +this.route.snapshot.params['id'];
    
    this.server = this.servService.getServer(id);
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.servService.getServer(+params['id']);
        });
  }
}
                                              












