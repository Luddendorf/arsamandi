
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

myForm = this.fb.group({
    store: this.fb.group({
       branch: ['', Validators.required],
       code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
})

  constructor(
     private fb: FormBuilder,
     private stockService: StockInventoryService
  ) {}

// stock-branch.component.ts //////////////////////////
export class StockBranchComponent {
    
   @Input() parent: FormGroup;
    
    // custom check for ngIf:
   required(name: string) {
     return (
      this.parent.get(`store.${name}`).hasError('required') &&
      this.parent.get(`store.${name}`).touched
     );  
   }
}

import { StockValidators } from './stock-inventory.validators';

myForm = this.fb.group({
    store: this.fb.group({
       branch: ['', [Validators.required, StockValidators.checkBranch]],
       code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
})




export class StockBranchComponent {
    
  @Input() parent: FormGroup;
    
  required(name: string) {
    return (
      this.parent.get(`store.${name}`).hasError('required') &&
      this.parent.get(`store.${name}`).touched
    );
  }
}

// stock-inventory/ stock-inventory.validators.ts ///////////////////
import { AbstractControl } from '@angular/forms';

export class StockValidators {
   
  static checkBranch(control: AbstractControl) {
    
    const regexp = /^[a-z]\d{3}$/i // A123
    
    const valid = regexp.test(control.value);
    
    return valid ? null : { inlvalidBranch: true };
  }
}

// stock-branch.component.ts /////////////////////////
export class StockBranchComponent {
    
  @Input() parent: FormGroup;
    
  get invalid() {
      return(
       this.parent.get('store.branch').hasError('invalidBranch') &&
       this.parent.get('store.branch').dirty &&
       !this.required('branch');
      );
  }
}
// repeat
myForm = this.fb.group({
    branch: ['', [Validators.required, StockValidators.checkBranch]]
})

export class StockBranchComponent {
  
  @Input() parent: FormGroup;
    
  get invalid() {
    return (
     this.parent.get('store.branch').hasError('invalidBranch') &&
     this.parent.get('store.branch').dirty &&
     !this.required('branch')
    );
  }
}


import { AbstractControl } from '@angular/forms';

export class StockValidators {
  
  static checkBranch(control: AbstractControl) {
    
     const regexp = /^[a-z]\d{3}$/i;
      
    const valid = regexp.test(control.value);
      
    return valid ? null : { invalidBranch: true };
  }
    
  static checkStockExists(control: AbstractControl) {
    
     const stockItem = control.get('stock');
     
     const selector = control.get('selector');
      
   if(!(stockItem && selector)) return null;
      
    const exists = stockItem.value.some((stock) => {
        
      return stock.product_id === parseInt(selector.value.product_id, 10);
        
   return exists ? { stockExists: true } : null;
    });
  }
}
// stock-inventory.component.ts //////////////////

// stock-selector.component.ts //////////////////
<button type="button"
        [disabled]="stockExists || notSelected"
        (click)="onAdd()">
    AddStock
</button>

get notSelected() {
    return (
      !this.parent.get('selector.product_id').value
    );
}

get stockExists() {
    return (
     this.parent.hasError('stockExists') &&
     this.parent.get('selector.product_id').dirty
    );
}

<div class="stock-selector__error"
           *ngIf="stockExists">
  Item already exists in the stock
</div>

// stock-inventory.component.ts //////////////////////////

myForm = this.fb.group({
    store: this.fb.group({
      branch: ['', [Validators.required, StockValidators.checkBranch]],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
}, { validator: StockValidators.checkStockExists });

// stock-inventory.validators.ts //////////////////////////////////
import { AbstractControl } from '@angular/forms';

export class StockValidators {
  
  static checkBranch(control: AbstractControl) {
    const regexp = /^[a-z]\d{3}/i;  
    const valid = regexp.test(control.value);
    return valid ? null : { invalidBranch: true };
  }
    
  static checkStockExists(control: AbstractControl) {
    
    const stockItem = control.get('stock');  
    const selector = control.get('selector');
      
    if(!(stockItem && selector)) return null;
      
    const exists = stockItem.value.some((stock) => {
      return stock.product_id === parseInt(selector.value.product_id, 10);
    });
      
    return exists ? { stockExists: true } : null;
  }
}

// stock-selector.component.ts //////////
<button type="button"
        [disabled]="stockExists || notSelected"
        (click)="onAdd()"
>Add stock</button>
<div *ngIf="stockExists">
  Item is already in the stock
</div>

get notSelected() {
   return (
     !this.parent.get('selector.product_id').value;
   );
}

get stockExists() {
  return (
    this.parent.hasError('stockExists') &&
    this.parent.get('selector.product_id').dirty
  );
}


<!-- stock.branch.component.ts -->
<div *ngIf="parent.get('store.branch').hasError('required')
       && parent.get('store.branch').touched"
     class="error"
		 *ngIf="required('branch')">
	Branch ID is required
</div>

<input type="text"
       placeholder="Manager Code"
			 formControlName="code">

<div *ngIf="parent.get('store.code').hasError('required')
       && parent.get('store.code').touched"
     class="error"
     *ngIf="required('code')">
	Manager ID is required
</div>

<div *ngIf="parent.get('store.branch').hasError('required') &&
     parent.get('store.branch').touched">
  Branch ID is required
</div>

<div *ngIf="parent.get('store.code').hasError('required') &&
  parent.get('store.code').touched">
	Manager ID is required
</div>

<!-- stock-branch.component.html -->
<div class="error"
     *ngIf="parent.get('store.branch').hasError('invalidBranch')">
  Invalid branch code: 1 letter, 3 numbers
</div>

<div *ngIf="parent.get('store.branch').hasError('invalidBranch')">
	Invalid branch, you need 1 letter and 3 numbers
</div>

<div>
</div>
