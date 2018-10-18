https://scotch.io/tutorials/rxjs-operators-for-dummies-forkjoin-zip-combinelatest-withlatestfrom

@Effect({dispatch: false})
recipeStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .pipe(
    withLatestFrom(this.store.select('recipes'))
    switchMap(([action, state]) => {
    
      const req = new HttpRequest('PUT', 'https://fdsfsf',
        state.recipes, {reportProgress: true});
        
       return this.httpClient.request(req);
    })
  );
  
  // header.component.ts ///////////////////////
  
  onSaveData() {
    
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  
  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://',
          state.recipes, { reportProgress: true });
          
          return this.httpClient.request(req);
      });
    );
    
    export class DropdownDirective {
      @HostBinding('class.open') isOpen = false;
      
      @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
      }
    }
    

    
    
    
    
    
    
    
