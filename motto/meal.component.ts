
<!-- meals.component.html -->
<div class="meals">
  <div class="meals__title">
    <h1><img src="/img/food.svg">Your meals
    </h1>
    <a class="button__add"
       [routerLink]="['../meals/new']">
     <img src="/img/add-white.svg">
     New meal  
    </a>
  </div>
  <div *ngIf="meals$ | async as meals; else loading;">
    <div class="message" *ngIf="!meals.length">
      <img src="/img/face.svg">
      No meals, add a new one
    </div>
    <!-- meals ngFor -->
    <list-item *ngFor="let meal of meals"
               [item]="meal"
      >
    </list-item>
  </div>
  <ng-template #loading>
    <div class="message">
     <img src="/img/loading.svg">
      Fetching meals...</div>
  </ng-template>
</div>

<!-- meal.component.html -->
<div class="meal">
  <div class="meal__title">
    <h1><img src="/img/food.svg">
    <span>Create meal</span>
    </h1>
  </div>

  <div>
    <meal-form (create)="addMeal()">
    </meal-form>
  </div>

</div>

<!-- meal-form.component.html -->
<div class="meal-form">

 <form [formGroup]="mealForm">
   <div class="meal-form__name">
     <label>
       <h3>Meal name</h3>
       <input type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name">
       <div class="error" *ngIf="required">
         Workout name is required
       </div>
     </label>
   </div>

   <div class="meal-form__food">
     <div class="meal-form__subtitle">
      <h3>Food</h3>
      <button type="button"
              class="meal-form__add"
               (click)="addIngred()">
        <img src="/img/add-white.svg">
        Add food
              </button>
     </div>
     <div formArrayName="ingreds">
       <label *ngFor="let item of ingreds.controls; let index as i;">
        <input [formControlName]="i"
               placeholder="e.g. Eggs">
        <span class="meal-form__remove"
               (click)="removeIngred(i)"></span>
       </label>
     </div>
   </div>

   <div class="meal-form__submit">
     <div>
       <button type="button"
               class="button"
                (click)="createMeal()">Create meal
       </button>
       <a class="button button--cancel"
          [routerLink]="[../]">Cancel</a>
     </div>
   </div>

 </form>

</div>

<!-- list-item.component.html -->
<div >
</div>

// meals.component.scss /////////////////////////////////////////////
:host {
  display: block;
  margin: 50px 0;
}
.meals {
  position: relative;
  background: #fff;
  box-shadow: 0 3px 4px rgba(0,0,0,.1);
  border: 1px solid #c1cedb;
  border-radius: 3px;
  overflow: hidden;
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    img {
      margin: 0 10px 0 0;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    padding: 30px;
    background: #f6fafd;
    border-bottom: 1px solid #c1cedb;
  }
}
.btn__add {
  display: flex;
  align-items: center;
  color: #fff;
  background: #97c747;
  border-radius: 50px;
  padding: 6px 20px 6px 15px;
  text-transform: uppercase;
  font: {
    weight: 600;
    size: 13px;
  }
  img {
    width: 20px;
    margin: 0 6px 0 0;
  }
}
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  font-size: 22px;
  font-weight: 500;
  img {
    margin: 0 10px 0 0;
  }
}

// meal.component.scss ///////////////////////////////////////////
:host {
  display: block;
  margin: 50px 0;
}
.meal {
  position: relative;
  background: #fff;
  box-shadow: 0 3px 4px rgba(0,0,0,.1);
  border: 1px solid #c1cedb;
  border-radius: 3px;
  overflow: hidden;
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    img {
      margin: 0 10px 0 0;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    padding: 30px;
    background: #f6fafd;
    border-bottom: 1px solid #c1cedb;
  }
}
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  font-size: 22px;
  font-weight: 500;
  img {
    margin: 0 10px 0 0;
  }
    
// health/meals/components/meal-form/ meal-form.component.scss ////
%button {
  outline: 0;
  cursor: pointer;
  border: 0;
  background: transparent;
}
.confirm,
.cancel {
  @extend %button;
  padding: 5px 10px;
  margin: 0 0 0 5px;
  font-size: 14px;
}
.error {
  color: #a94442;
  background: #f2dede;
  border: 1px solid #e4b3b3;
  border-radius: 2px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  margin: 10px 0 0;
}
.confirm {
  color: #fff;
  background: #d73a49;
  border-radius: 3px;
  transition: all .2s ease-in-out;
  &:hover {
    background: darken(#d73a49, 3%);
  }
}

.meal-form {
  &__name {
    padding: 30px;
    flex-direction: column;
    border-bottom: 1px solid #d1deeb;
  }
  &__food {
    padding: 30px;
    border-bottom: 1px solid #d1deeb;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    h3 {
      margin: 20px 0;
      flex-grow: 1;
    }
  }
  &__delete {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      p {
        margin: 0;
      }
    }
    .cancel {
      margin: 0 20px 0 0;
    }
  }
  &__add {
    display: flex;
    align-items: center;
    color: #fff;
    border: 0;
    outline: 0;
    cursor: pointer;
    background: #97c747;
    border-radius: 50px;
    padding: 6px 20px 6px 15px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 13px;
    img {
      width: 20px;
      margin: 0 6px 0 0;
    }
  }
  &__remove {
    cursor: pointer;
    background-image: url(/img/cross.svg);
    background-size: 15px 15px;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #eff4f9;
    width: 35px;
    height: 38px;
    display: block;
    position: absolute;
    top: 1px;
    right: 1px;
    border-left: 1px solid #d1deeb;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: darken(#eff4f9, 5%);
    }
  }
  &__submit {
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    img {
      margin: 0 10px 0 0;
    }
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  label {
    position: relative;
    display: block;
    margin: 0 0 10px;
  }
  input {
    outline: 0;
    font-size: 16px;
    padding: 10px 40px 10px 15px;
    margin: 0;
    width: 100%;
    background: #fff;
    color: #545e6f;
    flex-grow: 1;
    border: 1px solid #d1deeb;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
    &:focus {
      border-color: #a5b9ce;
    }
    &::-webkit-input-placeholder {
      color: #aaa;
    }
  }
  .button {
    cursor: pointer;
    outline: 0;
    border: 0;
    border-radius: 2px;
    background: #39a1e7;
    color: #fff;
    padding: 10px 18px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    &:hover {
      background: darken(#39a1e7, 5%);
    }
    &:disabled {
      opacity: .4;
      cursor: not-allowed;
    }
    &--cancel {
      background: #fff;
      color: #545e6f;
      &:hover {
        background: #fff;
      }
    }
    &--delete {
      background: #d73a49;
      align-self: flex-start;
      &:hover {
        background: darken(#d73a49, 5%);
      }
    }
  }
}
    
// list-item.component.scss /////////////////////////////////////
.list-item {
  display: flex;
  border-bottom: 1px solid #c1cedb;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: #f9f9f9;
  }
  p {
    margin: 0;
  }
  &__name {
    flex-grow: 1;
  }
  &__ingredients {
    font-size: 12px;
    color: #8ea6bd;
    font-style: italic;
  }
  &__delete {
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
    p {
      margin: 0 10px 0 0;
      font-size: 14px;
    }
  }
  a {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    padding: 12px 20px;
    font-weight: 400;
    color: #545e6f;
    font-size: 16px;
  }
}
%button {
  outline: 0;
  cursor: pointer;
  border: 0;
}
.confirm,
.cancel {
  @extend %button;
  padding: 5px 10px;
  margin: 0 0 0 5px;
  font-size: 14px;
}
.confirm {
  color: #fff;
  background: #d73a49;
  border-radius: 3px;
  transition: all .2s ease-in-out;
  &:hover {
    background: darken(#d73a49, 3%);
  }
}
.cancel {
  background: transparent;
}
.trash {
  @extend %button;
  border-left: 1px solid #c1cedb;
  padding: 10px 15px;
  background: #f6fafd;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: darken(#f6fafd, 2%);
  }
}

// meals.module.ts /////////////////////////////
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MealComponent } from './containers/meal/meal.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent }
];
    
@NgModule({
    imports: [],
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ]
})

// health/meals/containers/meal/ meal.component.ts //////////////////////
import { Component } from '@angular/core';
import { Router } from '@angular/router';
    
import { MealsService, Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['./meal.component.scss'],
    templateUrl: './meal.component.html'
})
export class MealComponent {
   constructor(private mealsService: MealsService,
               private router: Router) {}
    
  async addMeal(event: Meal) {
    
    await this.mealsService.addMeal(event);
    
    this.backToMeals();
  }
    
  backToMeals() {
    this.router.navigate(['meals']);
  }
}

// health/meals/components/meal-form/ meal-form.component.ts /////////////
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormСontrol,
       Validators } from '@angular/forms';
    
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    styleUrls: ['./meal-form.component.scss'],
    templateUrl: './meal-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent {
    
  @Output() create = new EventEmitter<Meal>();
    
  mealForm = this.fb.group({
     name: ['', Validators.required],
     ingreds: this.fb.array([''])
  });
    
  constructor(private fb: FormBuilder) {}
    
  // getter for "ingreds" in the template:
  get ingreds() {
      return this.mealForm.get('ingreds') as FormArray;
  }
  // getter for error div:
  get required() {
    return (this.mealForm.get('name').hasError('required') &&
            this.mealForm.get('name').touched);
  } 
   
  // CRUD:
  addIngred() {
    this.ingreds.push(new FormControl(''));
  }
    
  removeIngred(index: number) {
    this.ingreds.removeAt(index);
  }
    
  createMeal() {
    if(this.mealForm.valid) {
      this.create.emit(this.mealForm.value);
    }
  }
    
  
}
    
// meals.service.ts ////////////////////////////////////////
export class MealsService {
    
 meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`).pipe(
   tap(next => this.store.set('meals', next));
 );
    
addMeal(meal: Meal) {
   return this.db.list(`meals/${this.uid}`).push(meal);
}
}
    
// shared.module.ts /////////////////////
 import { AngularFireDatabaseModule } from 'angularfire2/database';
 import { ListItemComponent } from './components/list-item/list-item.component';
  
@NgModule({
    declarations: [
        ListItemComponent
    ],
    exports: [ListItemComponent]
})
    
// health/shared/components/list-item/ list-item.component.ts /////////////
importt { Component } from '@angular/core';
    
 @Component({
     selector: 'list-item',
     styleUrls: ['./list-item.component.scss'],
     templateUrl: './list-item.component.html'
 })
 export class ListItemComponent {
     constructor() {}
 }



