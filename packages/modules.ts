

// app.module.ts //////////////////////////////////////////////////////////
import { RecipesModule } from './recipes/recipes.modules';
import { SharedModule } from './shared/shared.module';

declarations: [
  DropdownDirective
],
imports: [
  BrowserModule,
  RecipesModule,
  SharedModule
]


// recipes.module.ts //////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent }  from './recipes.component';
import { RecipeStartComponent }  from './recipe-start/recipe-start.component';
import { RecipeListComponent }  from './recipe-list/recipe-list.component';
import { RecipeEditComponent }  from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent }  from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent }  from './recipe-list/recipe-item/recipe-item.component';
// import { DropdownDirective } from '../shared/dropdown.directive';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent, 
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})

export class RecipesModule {
}

// recipes-routing.module.ts ////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipesComponent }  from './recipes.component';
import { RecipeStartComponent }  from './recipe-start/recipe-start.component';
import { RecipeEditComponent }  from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent }  from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
  
}

// shared/shared.modules.ts /////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
     DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})

export class SharedModule {
}













