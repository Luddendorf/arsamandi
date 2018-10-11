
// core/core.module.ts ///////////////////////////////////////////////////////
// home and header - move to core ////
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
// import { AuthGuard } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService, RecipeService, DataStorageService,
    AuthService
  ]
})
export class CoreModule {}


// app.module.ts ///////////////////////////////////////////////////////

declarations: [
    AppComponent,
  ],
imports: [
   BrowserModule,
   HttpModule,
   AppRoutingModule,
   SharedModule,
   ShoppingListModule,
   AuthModule,
   CoreModule
],

// recipes-routing.module.ts ///////////////////////

 providers: [
   AuthGuard
 ]
 
 NB
 ng build --aot or ng build --prod
 
 ng serve --aot

















