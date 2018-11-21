https://dev.to/chiangs/
// stock-inventory.component.ts /////////////////////////////////////
import { Product } from '../../models/product.interface';

export class StockInventoryComponent {
    
  products: Product[] = [
      { "id": 1, "price": 2800, name: "MacBook Pro" },
      { "id": 2, "price": 7600, name: "USB Adaptor" },
      { "id": 3, "price": 6700, name: "iPod" },
      { "id": 4, "price": 4500, name: "iPhone" },
      { "id": 5, "price": 1800, name: "Apple Watch" }
  ];

  myForm = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('B182'),
      code: new FormControl('1234')
    }),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([])
  })

  onSubmit() {
    console.log('Submit', this.myForm.value);
  }
}


// stock-inventory/components/stock-branch/stock-branch.component.ts////
import { Component, Input } from '@angular/core';
import { formGroup } from '@angular/forms';

@Component({
   selector: 'stock-branch',
   styleUrls: ['stock-branch.component.scss'],
   template: ` <div>
               </div>
 `
})
export class StockBranchComponent {
   
   @Input() parent: FormGroup;
}
// stock-inventory/components/stock-branch/stock-branch.component.scss//
:host {  // host node
    border-bottom: 1px solid #ccc;
    margin: 0 0 20px;
    padding: 0 0 20px;
    display: block;
}
.error {
    background: #B52D30;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 0 0 3px 3px;
    line-height: 1;
    padding: 6px 10px;
    margin-top: -1px;
}

// stock-inventory/components/stock-selector/stock-selector.component.ts//
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
    selector: 'stock-selector',
    styleUrls: ['stock-selector.component.scss'],
    template: ` <div>
                </div>
`
})
export class StockSelectorComponent {
  
  @Input parent: FormGroup;
  
  @Input products: Product[];
}
// stock-inventory/components/stock-selector/stock-selector.component.scss
.stock-selector {
    padding: 0 0 20px;
    margin: 0 0 20px;
    border: 1px solid #ccc;
    position: relative;
    
    &__error {
      position: absolute;
      background: #B52D30;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      text-transform: uppercase;
      border-radius: 3px;
      left: 0;
      bottom: -10px;
      line-height: 1;
      padding: 6px 10px;
    }
    
    &:before {
       content: ' ';
       width: 0;
       height: 0;
       border-style: solid;
       border-width: 0 5px 5px 5px;
       border-color: transparent transparent #B52D30 transparent;
       display: block;
       position: absolute;
       top: -5px;
       left: 10px;
    }
}

& > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    select {
      flex: 1 0;
    }
    
    button {
      flex: 0 0 100px;
    }
    
    stock-counter {
      flex: 0 0 50px;
      margin-left: 30px;
    }
}

  &__name {
      flex: 1 0;
  }
// stock-inventory/components/stock-products/stock-products.component.ts//
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-products',
    styleUrls: ['stock-products.component.scss'],
    template: ` <div>
                </div>
`
})
export class StockProductsComponent {
   
   @Input() parent: FormGroup;
}
// stock-inventory/components/stock-products/stock-products.component.scss

// stock-inventory.module.ts ////////////////////////////////
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';

@NgModule({
    declarations: [
       StockInventoryComponent,
       StockBranchComponent,
       StockProductsComponent,
       StockSelectorComponent
    ]
})

// models/product.interface.ts ///////////////////////////////////////
export interface Product {
  id: number,
  price: number,
  name: string
}


<!-- stock-selector.component.html -->
<div class="stock-selector"
     [formGroup]="parent">
  <div formGroupName="selector">
		<select formControlName="product_id">
			<option value="">Select stock</option>
			<option *ngFor="let product of products"
			        [value]="product.id">
			{{ product.name }}
			</option>
		</select>

    <input formControlName="quantity"
		      type="number"
					step="10" min="10" max="1000">
    
    <button type="button">Add stock</button>

  </div>
</div>

<!-- stock-inventory.component.html -->
<div class="stock-inventory">
	
<form [formGroup]="myForm"
      (ngSubmit)="onSubmit()">

 <stock-branch [parent]="myForm"></stock-branch>

 <stock-selector [parent]="myForm"
                 [products]="products"></stock-selector>

 <stock-products [parent]="myForm"></stock-products>

 <div class="stock-inventory__buttons">
	 <button type="submit"
	         [disabled]="myForm.invalid">Order stock</button>
 </div>

</form>
</div>



// stock-inventory.component.ts /////////////////////////////////////
import { Product } from '../../models/product.interface';

export class StockInventoryComponent {
    
  products: Product[] = [
      { "id": 1, "price": 2800, name: "MacBook Pro" },
      { "id": 2, "price": 7600, name: "USB Adaptor" },
      { "id": 3, "price": 6700, name: "iPod" },
      { "id": 4, "price": 4500, name: "iPhone" },
      { "id": 5, "price": 1800, name: "Apple Watch" }
  ];

  myForm = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('B182'),
      code: new FormControl('1234')
    }),
    selector: this.createStock({}),
    stock: new FormArray([
      this.createStock({ product_id: 1, quantity: 10 }),
      this.createStock({ product_id: 3, quantity: 50 })
    ])
  })
    
   createStock(stock) {
       return new FormGroup({
         product_id: new FormControl(stock.product_id || ''),
         quantity: new FormControl(stock.quantity || 10)
       });
   }

  onSubmit() {
    console.log('Submit', this.myForm.value);
  }
}


// stock-inventory/components/stock-branch/stock-branch.component.ts////
import { Component, Input } from '@angular/core';
import { formGroup } from '@angular/forms';

@Component({
   selector: 'stock-branch',
   styleUrls: ['stock-branch.component.scss'],
   template: ` <div>
               </div>
 `
})
export class StockBranchComponent {
   
   @Input() parent: FormGroup;
}
// stock-inventory/components/stock-branch/stock-branch.component.scss//
:host {  // host node
    border-bottom: 1px solid #ccc;
    margin: 0 0 20px;
    padding: 0 0 20px;
    display: block;
}
.error {
    background: #B52D30;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 0 0 3px 3px;
    line-height: 1;
    padding: 6px 10px;
    margin-top: -1px;
}

// stock-inventory/components/stock-selector/stock-selector.component.ts//
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
    selector: 'stock-selector',
    styleUrls: ['stock-selector.component.scss'],
    template: ` <div>
                </div>
`
})
export class StockSelectorComponent {
  
  @Input parent: FormGroup;
  
  @Input products: Product[];
}
// stock-inventory/components/stock-selector/stock-selector.component.scss
.stock-selector {
    padding: 0 0 20px;
    margin: 0 0 20px;
    border: 1px solid #ccc;
    position: relative;
    
    &__error {
      position: absolute;
      background: #B52D30;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      text-transform: uppercase;
      border-radius: 3px;
      left: 0;
      bottom: -10px;
      line-height: 1;
      padding: 6px 10px;
    }
    
    &:before {
       content: ' ';
       width: 0;
       height: 0;
       border-style: solid;
       border-width: 0 5px 5px 5px;
       border-color: transparent transparent #B52D30 transparent;
       display: block;
       position: absolute;
       top: -5px;
       left: 10px;
    }
}

& > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    select {
      flex: 1 0;
    }
    
    button {
      flex: 0 0 100px;
    }
    
    stock-counter {
      flex: 0 0 50px;
      margin-left: 30px;
    }
}

  &__name {
      flex: 1 0;
  }
// stock-inventory/components/stock-products/stock-products.component.ts//
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-products',
    styleUrls: ['stock-products.component.scss'],
    template: ` <div>
                </div>
`
})
export class StockProductsComponent {
   
   @Input() parent: FormGroup;
}
// stock-inventory/components/stock-products/stock-products.component.scss

// stock-inventory.module.ts ////////////////////////////////
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';

@NgModule({
    declarations: [
       StockInventoryComponent,
       StockBranchComponent,
       StockProductsComponent,
       StockSelectorComponent
    ]
})

// models/product.interface.ts ///////////////////////////////////////
export interface Product {
  id: number,
  price: number,
  name: string
}

/*    new FormGroup({
            product_id: new FormControl(3),
            quantity: new FormControl(50)
        }) 
  new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    })      
        
        */



<!-- stock-products.component.ts -->
<div class="stock-product"
     [formGroup]="parent">

	<div formArrayName="stock">
		<div *ngFor="let item of stocks; let i = index;">

     <div [formGroupName]="i"
		     class="stock-product__content">
			<div class="stock-product__name">
        {{ item.value.product_id }}
			</div>

      <input formControlName="qunatity"
			      type="number" step="10"
						min="10" max="1000"/>
     
		 <button type="button">Remove</button>

     </div>

		</div>
	</div>	 
</div>



