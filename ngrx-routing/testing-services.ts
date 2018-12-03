import { ComponentFixture, TestBed } from '@angular/core/training';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting }
 from 'platform-browser-dynamic/testing';

import { DebugElement } from '@angular/core';

import { StockCounterComponent } from './stock-counter.component';

import { By } from '@angular/platform-browser';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('StockCounterComponent', () => {
  let component: StockCounterComponent;
  let fixture: ComponentFixture<StockCounterComponent>;
    
  let el: DebugElement;
    
  beforeEach(() => {
     TestBed.configureTestingModule({
         declarations: [StockCounterComponent]
     });
      
  fixture = TestBed.createComponent(StockCounterComponent);
  component = fixture.componentInstance;
      
  el = fixture.debugElement;
      
  component.value = 0;
  });
    
  it('should increment when + button is clicked', () => {
    el.query(By.css('button:first-child')).triggerEventHandler('click', null);
      
    fixture.detectChanges();
    expect(component.value).toBe(1);
      
    expect(el.query(By.css('p')).nativeElement.textContent).toBe('1');
  });
    
 it('should increment when up arrow is pressed', () => {
    const event = new Event('KeyboardEvent') as any;
     
    event.code = 'ArrowUp';
     
    el.query(By.css('.stock-counter > div > div')).triggerEventHandler('keydown'. event);
     
  fixture.detectChanges();
     
  expect(component.value).toBe(1);
 });
  
});

// stock-inventory.component.ts /////////////////////////

constructor(private fb: FormBuilder,
            stockService: StockInventoryService) {}

ngOnInit() {
    
  const cart = this.stockService.getCartItems();
  const products = this.stockService.getProducts();
    
  Observable.pipe(
    forkJoin(cart, products).subscribe(([cart, products]: [Item[], Product[]]) => {
      
     const mapInfo = products.map<[number, Product]>(product => []);
     this.products = products;
     this.productsMap = new Map<number, Product>(mapInfo);
     cart.forEach(item => this.addStock(item));
    });
  );
    
 createStock(stock) {
   return this.fb.group({
     product_id: (parseInt(stock.product_id, 10) || ''),
     quantity: (stock.quantity || 10)
   });
     
  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }
 }
}

// stock-inventory.component.spec.ts ////////////////////
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from 'platform-browser-dynamic/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from '../../';
import { StockBranchComponent } from '../../';
import { StockCounterComponent } from '../../';
import { StockProductsComponent } from '../../';
import { StockSelectorComponent } from '../../';
import { StockInventoryService } from '../..';

import { Observable, of } from 'rxjs';


 TestBed.initTestEnvironment(
   BrowserDynamicTestingModule,
   platformBrowserDynamicTesting()
 );

class MockStockInventoryService {
   
  getProducts() {
     return Observable.of([{ id: 1, price: 10, name: 'Test' },
                           { id: 2, price: 100, name: 'Test2' }]);
  }
  getCartItems() {
    return Observable.of([{ product_id: 1, quantity: 10 },
                          { product_id: 2, quantity: 5 }]);  
  }
}

describe('StockInventoryComponent', () => {
    
  let component: StockInventoryComponent;
  let fixture: ComponentFixture<StockInventoryComponent>;
  let el: DebugElement;
  let service: StockInventoryService;
    
  beforeEach(() => {
     TestBed.configureTestingModule({
       imports: [
         ReactiveFormsModule
       ],
       declarations: [
         StockInventoryComponent,
         StockBranchComponent,
         StockCounterComponent,
         StockProductsComponent,
         StockSelectorComponent
       ],
       providers: [
         {provide: StockInventoryService, useClass: MockStockInventoryService}
       ],
      schemas: [NO_ERRORS_SCHEMA]
     });
      
     fixture = TestBed.createComponent(StockInventoryComponent);
     component = fixture.componentInstance;
     el = fixture.debugElement;
     
     service = el.injector.get(StockInventoryService);
  });
 
  it('should get items and products on init', () => {
    
    spyOn(service, 'getProducts').and.callThrough();
    spyOn(service, 'getCartItems').and.callThrough();
    component.ngOnInit();
    
    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getCartItems).toHaveBeenCalled();
  });
    
  it('should create product map from the service response', () => {
      component.ngOnInit();
      
     expect(component.productsMap.get(1)).toEqual({ id: 1, price: 10, name: 'Test' });
     expect(component.productsMap.get(2)).toEqual({ id: 2, price: 100, name: 'Test2' });
  });
    
it('should store the products response', () => {
  component.ngOnInit();
  expect(component.products).toEqual([{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Test2' }]);
});
    
  it('should create stock item for each cart item', () => {
   
   spyOn(component, 'addStock');
   component.ngOnInit();
   expect(component.addStock).toHaveBeenCalledWith({ product_id: 1, quantity: 10 });
    expect(component.addStock).toHaveBeenCalledWith({ product_id: 2,
quantity: 5 });  
  });
    
  
     
});

