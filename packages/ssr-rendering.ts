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

ng build --prod --app 1

  // package.json //////////////////////////////////////////////////////////////////
  "build": "ng build",
  "build:ssr": "ng build --prod && ng build --prod --app 1 --output-hashing=none"
}

npm install --save express

npm install --save @nguniversal/express-engine

npm install --save @nguniversal/module-map-ngfactory-loader

// server.js ////////////////////////////////////////////////////////////////////////
'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');

const ngUniversal = require('@nguniversal/express-engine');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP }
   = require('./dist-server/main.bundlle');

function angularRouter(req, res) {
  res.render('index', {req, res}); 
}

const app = exress();

app.engine('html', ngUniversal.ngExpressEngine({
    bootstrap: AppServerModuleFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');

app.set('views', 'dist');

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

app.get('*', angularRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// node server.js

deploy : dist, dist-server, package.json, server.js 










