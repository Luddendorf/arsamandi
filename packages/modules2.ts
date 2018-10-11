//  shared.module.ts //////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports:[
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {}

// app.module.ts and recipes.module.ts --- must import SharedModule ////

// shopping-list.module.ts //////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@NgModule({
   declarations: [
     ShoppingListComponent,
     ShoppingEditComponent
   ],
  imports: [
     CommonModule,
     FormsModule
  ]
})
export class ShoppingModule {}

// auth.module.ts /////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}

// auth-routing.module.ts //////////////////////////////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
   imports: [
     RouterModule.forChild(authRoutes)
   ],
   exports: [
     RouterModule
   ]
})
export class AuthRoutingModule {}

// app.module.ts /////////////////////////////////////////////////////
  declarations: [
    HomeComponent
   ],
   imports: [
     
   ]

// app-routing.module.ts ///////////////////////////////////////////////
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

  const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule' },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ]
})


// recipes-routing.module.ts ////////////////////////////////////////

 const recipesRoutes: Routes = [
   { path: '', component: RecipesComponent, children: [
     
   ] }
 ];


// home.component.html ////////////////////////////////////////////
<h2>Welcome to the recipe book!</h2>


ng build --prod --base-href /my-app/

NB
export.com/my-app

// index.html /////////////////////////////////////////////////////////

<base href="/my-app/">



















