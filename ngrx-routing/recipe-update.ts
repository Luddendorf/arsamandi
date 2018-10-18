// recipe-edit.component.ts /////////////////////////////////////
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';

export class RecipeEditComponent implements OnInit {

 constructor(private store: Store<fromRecipe.FeatureState>) {}
  
  onSubmit() {
    if(this.editMode){
     this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id,
       this.recipeForm.value}));
   } else {
     
     this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
   }
  }
  
  private initForm() {
    
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
         conste = recipeState.
       });
  }
}

















