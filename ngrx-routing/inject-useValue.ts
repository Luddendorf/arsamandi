// food.service.ts ///////////
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FoodService {
    
 // api = '/api/pizzas';
    
  constructor(private httpClient: HttpClient,
              @Inject('api') private api: string) {}
  
  getFood(): Observable<any[]> {
    return this.httpClient.get(this.api).pipe(
      map(response => response.json());
    );
  }
}

// app.module.ts ///////////////
@NgModule({
   providers: [
       { provide: 'api', useValue: '/api/pizzas' }
   ] 
})
export class AppModule {}
