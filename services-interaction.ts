

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
{ path: 'not-found', component: PageNotFoundComponent },
{ path: '**', redirectTo: '/not-found' }




<a [routerLink]="['/users', 10, 'Anna']"
>Load Anna (10)</a>

// users.component.html ///////
<div>
  <router-outlet></router-outlet>
</div>

// user.component.ts /////////////
export class UserComponent implements OnInit, OnDestroy {
  
  
  Subscription: Subscription;
  
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
   [queryParams]="{allowEdit: server.id === 3 ? '1' : '0' }"
   [fragment]="loading"
></a>

<a [routerLink]="['/users', user.id, user.name]"
></a>

<div>
  <router-outlet></router-outlet>  
</div>

// server.component.html //////////
<button (click)="onEdit()"
>Edit Server</button>



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

// edit.server.component.html //////////////
<h4 *ngIf="!allowEdit"
>Your are not allowed to edit!</h4>
<div *ngIf="allowEdit">Some info</div>

// edit.server.component.ts //////////
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  
  allowEdit = false;
  
  changesSaved = false;
  
  constructor(private servService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {}
  
  ngOnInit() {
    
    this.route.queryParams.subscribe(
       (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
       });
    this.route.fragment.subscribe();
    
     log(this.route.snapshot.queryParams);
     log(this.route.snapshot.fragment);
  }
 
  onUpdateServer() {
    
    this.servService.updateServer(this.updateServer, {name: this.serverName,
                                                         status: this.serverStatus});
    
    this.changesSaveds = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    if(!this.allowEdit){
      return true;
    }
    
if(this.serverName !== this.server.name || this.serverStatus !== this.server.status) {
      
    }
  }
}

// can-deactivate-guard.service.ts //////////////////////////////////////
export interface CanComponentDeactivate {
   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState; RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
     
    return component.canDeactivate();
  }
}

// server.component.ts /////
export class ServerComponent implements OnInit {
 
  server: {id: number, name: string, status: string};
  
  constructor(private servService: ServersService,
              private actRoute: ActivatedRoute,
              private router: Router) {}
  
  ngOnInit() {
    
    const id = +this.route.snapshot.params['id'];
    
    this.server = this.servService.getServer(id);
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.servService.getServer(+params['id']);
        });
  }
  
  onEdit() {
    
    this.router.navigate(['edit'], { relativeTo: this.route,
      queryParamsHandling: 'preserve' });
  }
  
}
   ng g c page-not-found

// app-routing.module.ts /////////////////
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', canActivate: [AuthGuardService],
                   canActivateChild: [AuthGuard],
                   canDeactivate: [CanDeactivateGuard]
                   component: UsersComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ],
    providers: [AuthService, AuthGuard, CanDeactivateGuard],
 })

export class AppRoutingModule {
 
}

// app.module.ts ///
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [AppRoutingModule],
  providers: [ServersService, AuthService, AuthGuard]
})

// auth-guard.service.ts ////////
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
  
   return this.authService.isAuthenticated()
       .then((authenticated: boolean) => {
          if(authenticated) {
            return true; 
          } else {
   this.router.navigate(['/']);
          }
    });
  }
  
  
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot):
   Observable<boolean> | Promise<boolean> | boolean {
    
     return this.canActivate(route, state);
  }
  
}

// auth.service.ts /////////////
export class AuthService {
 
   loggedIn = false;
  
  isAuthenticated() {
    
    const promise = new Promise(
      (resolve, reject) => {
          setTimeout(() => {
            resolve(this.loggedIn)
          }, 800);
      });
    return promise;
  }
  
  login() {
    this.loggedIn = true;
  }
  
  logout() {
    this.loggedIn = false;
  }
}

// home.component.html //////////
<button (click)="onLogin()"
>Login</button>
<button (click)="onLogout()"
>Logout</button>

// home.component.ts ////////////
export class HomeComponent implements OnInit {
  
 constructor(private router: Router,
             private authService: AuthService) {}
   
 onLogin() {
   this.authService.login();
 }
  
 onLogout() {
   this.authService.logout(); 
 }
}






















