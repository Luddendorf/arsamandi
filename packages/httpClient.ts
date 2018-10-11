
// app.module.ts ///////////////
import { HttpClientModule } from '@angular/common/http';

imports: [
  HttpClientModule
]

// data-storage.service.ts /////////////////////////////////
import { HttpClient } from '@angular/common/http';

constructor(private httpClient: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService) {}


storeRecipes() {
  const token = this.authService.getToken();
  
  return this.httpClient.put('http://.com/rec.json?auth=' + token,
     this.recipeService.getRecipes());
  }
  
  getRecipes() {
    const token = this.authService.getToken();
    
    this.httpClient.get('http/rec.json?auth=' + token)
      .map(
        (recipes: Recipe[]) => {
          for(let recipe of recipes) {
            if(!recipe['ingredients']) {
              recipe['ingredients'] = [];
             }
           }
           return recipes;
         }
      )
  }
  
  
}
