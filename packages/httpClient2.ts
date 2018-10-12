
BrieBug

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

getRecipes() {

 const token = this.authService.getToken();
 
 this.httpClient.get<Recipe[]>('https://ng-recipe-book', {
     headers: new HttpHeaders().set('Authorization', 'Bearer assdgdg')
     observe: 'response',
     responseType: 'json' | 'arraybuffer' | 'blob' | 'text'
     params: new HttpParams().set('auth', token)
 })

}


storeRecipes() {
  const token = this.authService.getToken();
  
  const headers = new HttpHeaders().set('Authorization', 'Bearer gfgd');
  
  return this.httpClient.put('http://ng-recipe-book',
      this.recipeService.getRecipes(), {
       body:
       observe: 'events' | 'body'
       params: new HttpParams().set('auth', token)
      });
}

// header.component.ts ///////////
import { HttpEvent, HttpEventType } from '@angular/common/http';

 onSaveData() {
 
   this.dataStorageService.storeRecipes()
     .subscribe(
       (response: HttpEvent<Object>) => {
         
         console.log(response.type === HttpEventType.Sent);
       });
 }
 
 storeRecipes() {
  
  const token = this.authService.getToken();
  
  const req = new HttpRequest('PUT', url, this.recipeService.getRecipes(), {
    reportProgress: true,
    params: new HttpParams().set('auth', token)
  })
  
   return this.httpClient.request(req);
  }
 
 storeRecipes() {
 
   const req = new HttpRequest('PUT', url,
     this.recipeService.getRecipes(), {
       reportProgress: true,
       params: new HttpParams().set('auth', token)
     })
     
    this.httpClient.request(req);
 }
 
 // INTERCEPTORS ////////////////////////////////////////////////////////
 
   storeRecipes() {
   
   
   }
   
   // shared/auth.interceptor.ts /////////////////////////
   import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
   import { Observable } from 'rxjs';
   
   export class AuthInterceptor implements HttpInterceptor {
     
     intercept(req: HttpRequest<any>, next: HttpHandler):
       Observable<HttpEvent<any>> {
      
      console.log('Intercepted!', req);
      
      return next.handle(req);
     }
   }
 
 
 // core.module.ts //////////////
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 
 providers: [
 
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
     multi: true}
 ]
 
 // myinterceptor.service.ts /////////////
 import { Injectable } from '@angular/core';
 import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/core';
 
 
 @Injectable()
 export class Myinterceptor implements HttpInterceptor {
   
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
     const request = req.clone({ params: req.params.set('x', '5') });
     
     return next.handle(request).catch(error => {
       return Observable.throw(error);
     });
     
   };
 }
 
 /////////////////////////////////////////////////////////////////////////
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 
 imports: [
 
 ],
 providers: [{
    provide; HTTP_INTERCEPTORS,
    useClass: Myinterceptor,
    multi: true
 }]
 
 ////////////////////////////////////////////////////////////////////////
 import { HttpClient } 
 
 export class AppComponent {
   
   constructor(_http: HttpClient) {
   
     _http.get('http:com.json')
       .subscribe(results => {
         console.log(results);
       });
    
    
   }
 }
 
 storeRecipes() {
 
  const req = new HttpRequest('PUT', url, this.recipeService.getRecipes(), {
     reportProgress: true,
     params: new HttpParams().set('auth', token)
  })
  
  this.httpClient.request(req);
 }
 
 // auth.interceptor.ts /////////////////////
 import { Injectable } from '../auth/auth.service';
 
 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {
 
 constructor(private authService: AuthService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
     
     const copiedReq = req.clone({header: req.headers.append('', '')});
     
  const copiedReq = req.clone({params: req.params.set('auth',
     this.authService.getToken())});
     
     return next.handle(copiedReq);
    }
 }
 
 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {
 
 constructor(private authService: AuthService) {}
   
   intercept(req: HttpRequest<any>, next: HttpHandler):
     Observable<HttpEvent<any>> {
     
    const copiedReq = req.clone({params: req.params.set('auth', token)});
     
    return next.handle(copiedReq);
     }
 }
 
 
 // logging.interceptor.ts ////////////////////////////
 import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
 import { tap } from 'rxjs/operators';
 
 export class LoggingInterceptor implements HttpInterceptor {
   
   intercept(req: HttpRequest<any>, next: HttpHandler):
     Observable<HttpEvent<any>> {}
     
     return next.handle(req).pipe(tap(
       event => {
         log('Logging interceptor', event); 
       }
     ));
 }
 
 
 // core.module.ts ///////////
 providers: [
   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
   {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
 ]
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
