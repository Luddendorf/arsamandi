npm install --save @ngrx/router-store

npm install --save @ngrx/store-devtools

// app.module.ts //////////////////////////////////////////////
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

imports: [
  StoreRouterConnectingModule,
  !environment.production ? StoreDetoolsModule.instrument() : []
]

// environments/environment.ts ///////////////////////////////////
 
 export const environment = {
   production: false
 };


// app-routing.module.ts /////////////////////////////////////////////////
const appRoutes: Routes = [
  { }
];
