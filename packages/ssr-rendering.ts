npm install --save-dev @angular/platform-server

// app.module.ts /////////////////////////////////////////////////

imports: [
  BrowserModule.withServerTransition({appId: 'my-uni-app'})
]

// app.server.module.ts ////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent]
})

export class AppServerModule {]

// main.server.ts ////////////////////////////////////////////////////////////////
import { enableProdMode } from '@angular/core';
export { AppServerModule } from './app/app.server.module';

enableProdMode();

// tsconfig.json ////////////////////////////////////////////////////////////////
{
 "compileOnSave": false,
 "compilerOptions": {
   "declaration": false,
   "emitDecoratorMetadata":true,
   "experimentalDecorators": true,
   "lib": [
      "es2017",
      "dom"
   ],
  "moduleResolution": "node",
  "outDir": "../dist/out-tsc",
  "target": "es5",
  "typeRoots": [
     "../node_modules/@types"
   ]
 }
 
 
 // tsconfig.app.json /////////////////////////////////////////////////////////////
 {
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": []
   },
   "exclude": [
     "test.ts",
     "**/*.spec.ts"
   ]
 }
 
 // tsconfig.server.json ///////////////////////////////////////////////////////
 {
  "extends": "../tsconfig.json",
  "compilerOptions": {
     "outDir": "../out-tsc/app",
     "baseUrl": "./",
     "module": "commonjs",
     "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ],
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
 }

// .angular-cli.json //////////////////////////////////////////////////
{
 "tsconfig": "tsconfig.app.json"
},
{
  "name": "universal",
  "platform": "server",
  "root": "src",
  "outDir": "dist-server",
  "assets": [
     "assets",
     "favicon.ico"
  ],
  "index": "index.html",
  "main": "main.server.ts",
  "tsconfig": "tsconfig.server.json",
  "prefix": "app",
  "styles": "styles.css",
  "scripts": []
}









}
