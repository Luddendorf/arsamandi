npm install --save-dev @angular/platform-server
http://stepansuvorov.com/blog/2017/03/server-side-rendering-angular4/

https://itnext.io/server-side-rendering-ssr-in-angular-5-the-simplest-and-quickest-ssr-approach-34cf53224f32
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

import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('high', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => high', animate(300)),
      transition('high => normal', animate(800))
    ])
  ]
})

export class AppComponent {

  state = 'high';

  list = ['a', 'b', 'c'];
  
  onAnimate() {
    this.state == 'normal' ? this.state = 'high' : this.state = 'normal';
  }
  
  onAdd(item) {
    this.list.push(item);
  }
  
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}
animations: [
  trigger('mySuperTrigger', [
    state('firstState', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('secondState', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    }))
  ])
]

animations: [
   trigger('myTrigOne', [
     state('normal', style({
       'background-color': 'red'
     })),
     state('high', style({
       'background-color': 'blue'
     })),
     transition('normal <=> high', animate(800))
   ])
]
trigger('wildTrigger', [
  state('begin', style({
    transform: 'translateX(0) scale(1)'
  })),
  state('middle', style({
    transform: 'translateX(100px) scale(1)'
  })),
  state('end', style({
    transform: 'translateX(0) scale(0.5)'
  }))
  transition('begin => middle', animate(300)),
  transition('middle => begin', animate(800)),
  transition('end <=> *', [
    style({
       'background-color': 'orange'
    }),
    animate(1000, style({
       borderRadius: '50px'
    })),
    animate(500)
  ])
])

onAnimate() {
  
  this.wildState == 'begin' ? this.wildState = 'middle' : this.wildState = 'begin';
  
  this.wildState == 'begin' ? this.wildState = 'middle' : this.wildState = 'begin';
  
}

onShrink() {

  this.wildState = 'end';
}

@Component({
  animations: [
    trigger('photoState', [
      state('move', style({
        transform: 'translateX(-100%) translateY(50px)',
      })),
      state('enlarge', style({
        transform: 'scale(1.5)',
      })),
      state('spin', style({
        transform: 'rotateY(180deg) rotateZ(90deg)'
      })),
      transition('spin => move', animate('2000ms ease-out')),
      transition('* => move', animate('500ms', keyframes([
   style({transform: 'translateX(0) rotateY(0),
  
      ])
    ])
  ]
})












