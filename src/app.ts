//#region imports
import { CommonModule } from '@angular/common'; // @browser
import { NgModule, inject, Injectable } from '@angular/core'; // @browser
import { Component, OnInit } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import Aura from '@primeng/themes/aura'; // @browser
import { MaterialCssVarsModule } from 'angular-material-css-vars'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { Observable, map } from 'rxjs';
import { Taon, BaseContext, TAON_CONTEXT } from 'taon/src';
import { Helpers, UtilsOs } from 'tnp-core/src';

import { AppModule } from './app/app.module'; // @browser
import {
  HOST_BACKEND_PORT,
  CLIENT_DEV_WEBSQL_APP_PORT,
  CLIENT_DEV_NORMAL_APP_PORT,
} from './app.hosts';
//#endregion

console.log('hello world');
console.log('Your server will start on port ' + HOST_BACKEND_PORT);
const host = 'http://localhost:' + HOST_BACKEND_PORT;
const frontendHost =
  'http://localhost:' +
  (Helpers.isWebSQL ? CLIENT_DEV_WEBSQL_APP_PORT : CLIENT_DEV_NORMAL_APP_PORT);

//#region mouse-electron-jiggler component
//#region @browser
@Component({
  selector: 'app-mouse-electron-jiggler',
  standalone: false,
  template: `<app-root-jiggler/>`,
  styles: [
    `
      body, html {
        margin: 0px !important;
      }
      app-root-jiggler {
        display: block;
      }
    `,
  ],
})
export class MouseElectronJigglerComponent {
  angularVersion =
    VERSION.full +
    ` mode: ${UtilsOs.isRunningInWebSQL() ? ' (websql)' : '(normal)'}`;
}
//#endregion
//#endregion

//#region  mouse-electron-jiggler module
//#region @browser
@NgModule({
  providers: [
    providePrimeNG({
      // inited ng prime - remove if not needed
      theme: {
        preset: Aura,
      },
    }),
  ],
  exports: [MouseElectronJigglerComponent],
  imports: [
    AppModule,
    CommonModule,
    MaterialCssVarsModule.forRoot({
      // inited angular material - remove if not needed
      primary: '#4758b8',
      accent: '#fedfdd',
    }),
  ],
  declarations: [MouseElectronJigglerComponent],
})
export class MouseElectronJigglerModule {}
//#endregion
//#endregion

async function start() {}

export default start;
