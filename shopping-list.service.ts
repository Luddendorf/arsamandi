import { EventEmitter } from '@angular/core';

export class ShoppingService {

ingredsChanged = new EventEmitter<Ingredient[]>();
  
  private ingreds: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  
  getIngreds() {
    return this.ingreds.slice();
  }
  
  addIngred(ingred: Ingredient) {
    this.ingreds.push(ingred);
    this.ingredsChanged.emit(this.ingreds.slice());
  }
}

// shopping-list.component.ts //////////////////////////////////
export class ShoppingListComponent implements OnInit {
 
 ingredients: Ingredient[];
 
 constructor(private slService: ShoppingListService) {
 }
 
  ngOnInit() {
    this.ingredients = this.slService.getIngreds();
    this.slService.ingredsChanged
         .subscribe(
           (ingreds: Ingredient[]) => {
              this.ingredients = ingreds;
              });
  }

}

// shopping-edit.component.ts ////////////////////////////////
export class ShoppingEditComponent implements OnInit {
  
  constructor(private slService: ShoppingListService) {}
  
  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngred = new Ingredient(ingName, ingAmount);
    
    this.slService.addIngred(newIngred);
  }
}


// recipe.model.ts ////////////////////////////////////////////////
import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
}







