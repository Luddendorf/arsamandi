
// third-party module ////////////////
export const SOME_CONFIG = new InjectionToken('someConfig');

@Injectable()
class SomeService {
    constructor(@Inject(SOME_CONFIG) someConfig) {}
}

@NgModule({ providers: [SomeService] })
export class SomeModule {}

// user-defined module /////////////
@NgModule({
    imports: [SomeModule],
    providers: [{ provide: SOME_CONFIG, useValue: { foo: 'foo' } }]
})
export class AppModule {}

// app.module.ts ////////////
@NgModule({
    declarastions: [AppComponent],
    imports: [
        CoreModule.forRoot(environment)
    ],
    providers: [...]
})
export class AppModule {}

// index.ts //////////////
@NgModule({
    imports: [CommonModule],
    providers: [FooService]
})
          
export class CoreModule {
  static forRoot(config: Config): ModuleWithProviders {
    console.log(config);
    return { 
     ngModule: CoreModule,
     providers: [
         { provide: LIB_CONFIG, useValue: config }
     ]
    };
}        
}

// config.ts .............
import { InjectionToken } from '@angular/core';

export interface Config {
    key?: string;
}

export const LIB_CONFIG = new InjectionToken<Config>('LIB_CONFIG');

// foo.service.ts /////////////
import { Config, LIB_CONFIG } from './config';

@Injectable()
export class FooService {
    private key: string;
    
  constructor(@Inject(WEB_CONFIG) private config: Config) {
      console.log(config);
      this.key = config.key;
  }
}

let firstObject = { 'Bob' };
let secondObject = { 'Den' };

providers: [{
    provide: 'MyService',
    useFactory: () => {
      if(...) return firstObject
      else return secondObject
    }
}]
    
    
// REPEAT ///////////////
// food-store.module.ts /////////////////////
import { FOOD_STORE_CONFIG, FoodStoreConfig } from './config';
import { FoodStoreService } from './food-store.service';
    
export const FOOD_PROVIDERS: Provider[] = [FoodStoreService];    
    
providers: [
    FOOD_PROVIDERS,
    { provide: FOOD_STORE_CONFIG,
      useValue:  }
    ]
 export class FoodStoreModule {
     static forRoot(config: FoodStoreConfig): ModuleWithProviders {
      return {
        ngModule: FoodStoreModule,
        providers: [FOOD_PROVIDERS, { provide: FOOD_STORE_CONFIG,
                                      useValue: config  || {} }]
    }
    }
    }
    

// config.ts ///////////////////////////////////////////////
export const FOOD_STORE_CONFIG =
       new InjectionToken<FoodStoreConfig>('FOOD_STORE_CONFIG');


// app.module.ts ///////////////////////////////////
@NgModule({
    imports: [
      HttpModule,
      FoodStoreModule.forRoot({ storeId: 10292,
                                storeToken: 'dwf3242323esd2e2' })
    ]
})

// food-store.service.ts /////////////

@Injectable()
export class FoodStoreService {
    constructor(private httpClient: HttpClient,
                @Inject(FOOD_STORE_CONFIG) private config: FoodStoreConfig) {}
}

// NG_ZONE: //////////////////////////
// app.comoponent.ts ///////////////////////////
import { Component, OnInit, DoCheck, NgZone } from '@angular/core';

@Component({
    template: `<div>Counter: {{ counter }}</div>`
})
export class AppComponent implements OnInit, DoCheck {
    
   counter = 0;
  
  constructor(private zone: NgZone) {}
    
  ngOnInit() {
      
   this.zone.runOutsideAngular(() => {
      for(let i = 0; i < 100; i++) {
      
       setTimeout(() => this.counter++);
    }});
       
    this.zone.run(() => {
     
     setTimeout(() => {
       this.counter = this.counter
     }, 1000);
    });
   
      
   
  }
    
  ngDoCheck() {
    console.log('Change detection has been done.');  
  }
}


