

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
