// stock-inventory.component.ts ///////////////////////////
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import { StockInventoryService } from '../../services/stock-inventory.service';

export class StockInventoryComponent implements OnInit {
    
 products: Product[];
 total: number;
    
 productMap: Map<number, Product>; // { 1:Product }

constructor(private fb: FormBuilder,
            private stockService: StockInventoryService) {}
    
 ngOnInit() {
   const cart$ = this.stockService.getCartItems();
     
   const products$ = this.stockService.getProducts();
     
   finalizedResponses = forkJoin(cart$, products$)
     .subscribe(([cart, products]: [Item[], Product[]]) =>{
       
      const myMap = products
         .map<[number, Product]>(product => [product.id, product]);
       
      this.productMap = new Map<number, Product>(myMap);
      
      this.products = products;
       
      cart.forEach(item => this.addStock(item));
       
      this.calculateTotal(this.myForm.get('stock').value);
      this.myForm.get('stock').valueChanges
        .subscribe(value => this.calculateTotal(value));
   });
     
 }

myForm = this.fb.group({
    store: this.fb.group({
       branch: '',
       code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
})

createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
}

addStock(stock) {
    const control = this.myForm.get('stock') as FormArray;
    control.push(this.createStock(stock));
}

removeStock({ group, index }: { group: FormGroup, index: number }) {
    
    const control = this.myForm.get('stock') as FormArray;
    control.removeAt(index);
}
    
calculateTotal(value: Item[]) {
   
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);
    this.total = total;
}

}

// db.json //////////////////////////////////////
{
  "cart": [
      { "product_id": 1, "quantity": 10 },
      { "product_id": 3, "quantity": 50 }
  ],
  "products": [
      { "id": 1, "price": 2800, "name": "MacBook" },
      { "id": 2, "price": 60, "name": "USB Adaptor" },
      { "id": 3, "price": 400, "name": "iPod" },
      { "id": 4, "price": 900, "name": "iPhone" },
      { "id": 5, "price": 580, "name": "Apple Watch" },
  ]
}

/*  this.createStock({ product_id: 1, quantity: 10 }),
        this.createStock({ product_id: 3, quantity: 50 })  */

// stock-inventory/services/ stock-inventory.service.ts /////////////
import { throwError, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Product, Item } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
  
  constructor(private http: Http) {}  
  
  getCartItems(): Observable<Item[]> {
    return this.http.get('/api/cart').pipe(
      map((response: Response) => response.json()),
      catchError((error: any) => of(`I caught: ${error}`))
    );
  }
    
  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').pipe(
      map((response: Response) => response.json()),
      catchError((error: any) => of(`I caught: ${error}`))
    );
  }
    
}


// stock-inventory.module.ts /////////////////////////
import { HttpModule } from '@angular/http';
import {  

import { StockInventoryService } from './services/stock-inventory.service';

imports: [
    HttpModule
],
providers: [
    StockInventoryService
]

// models/product.interface.ts //////////////////////
export interface Product {
    id: number,
    price: number,
    name: string
}

export interface Item {
    product_id: number,
    quantity: number
}

// stock-products.component.ts ///////////////////
import { Product } from '../../models/product.interface';

export class StockProductsComponent {
    
  @Input() map: Map<number, Product>;
    
  getProduct(id) {
    return this.map.get(id);
  }
}

// stock-selector.component.ts ///////////////////////
export class StockSelectorComponent {
    
   @Input() parent: FormGroup;
   @Input() products: Product[];
   @Output() added = new EventEmitter<any>();
    
   onAdd() {
     this.added.emit(this.parent.get('selector').value);
       
     this.parent.get('selector').reset setValue patchValue
         product_id: ''
     });
   }
}
// quantity: 10

// reset, patchValue, setValue //////////////////////////////
onAdd() {
    this.added.emit(this.parent.get('selector').value);
    this.parent.get('selector').reset({ /*patchValue(), setValue() */
        product_id: '',
        quantity: 10
    });
}

// components/stock-counter/ stock-counter.component.ts //////////////




// components/stock-counter/ stock-counter.component.scss ///////////


<!-- stock-inventory.component.ts -->
<stock-selector [parent]="form"
                [products]="products"
							  (added)="addStock($event)"></stock-selector>

<stock-products [parent]="form"
                [map]="productMap"
							  (removed)="removeStock($event)"></stock-products>

 <div class="stock-inventory__price"
   >Total: {{ total | currency:'USD':true }}</div>

<div class="stock-inventory__buttons">
	<button type="submit"
	        [disabled]="form.invalid">Order stock</button>
</div>
						
<!-- stock-products.component.ts -->
<div class="stock-product__name">
	{{ getProduct(item.value.product_id).name  }}
</div>

<div class="stock-product__price">
	{{ getProduct(item.value.product_id).price | currency:'USD':true }}
</div>
