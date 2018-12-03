// food.service.ts ///////////
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_TOKEN } from './token';

@Injectable()
export class FoodService {
    
 // api = '/api/pizzas';
    
  constructor(private httpClient: HttpClient,
              @Inject(API_TOKEN) private api: string) {}
  
  getFood(): Observable<any[]> {
    return this.httpClient.get(this.api).pipe(
      map(response => response.json());
    );
  }
}

// app.module.ts ///////////////
import { API_TOKEN } from './token';

@NgModule({
   providers: [
       { provide: API_TOKEN, useValue: '/api/pizzas' },
       { provide: API_TOKEN2, useValue: '/api/pizzas' }
   ] 
})
export class AppModule {}

// token.ts ///////////////////////////
import { InjectionToken } from '@angular/core';

export const API_TOKEN = new InjectionToken<string>('api');

export const API_TOKEN2 = new InjectionToken<string>('api');

import { InjectionToken } from '@angular/core';

export const API_TOKEN = new InjectionToken<string>('api');
