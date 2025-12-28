//#region imports
import * as os from 'os'; // @backend

import { AsyncPipe, CommonModule, JsonPipe, NgFor } from '@angular/common'; // @browser
import {
  NgModule,
  inject,
  Injectable,
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  mergeApplicationConfig,
} from '@angular/core'; // @browser
import { Component, OnInit } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { RenderMode, ServerRoute } from '@angular/ssr';
import Aura from '@primeng/themes/aura'; // @browser
import { MaterialCssVarsModule } from 'angular-material-css-vars'; // @browser
// import { providePrimeNG } from 'primeng/config'; // @browser
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import {
  Taon,
  TaonBaseContext,
  TAON_CONTEXT,
  EndpointContext,
  TaonBaseAngularService,
  TaonEntity,
  StringColumn,
  TaonBaseAbstractEntity,
  TaonBaseCrudController,
  TaonController,
  GET,
  TaonMigration,
  TaonBaseMigration,
} from 'taon/src';
import { Utils, UtilsOs } from 'tnp-core/src';

import { HomeComponent } from './app/home/home.component'; // @browser
import { JigglerContext } from './app/jiggler';
import { HOST_CONFIG } from './app.hosts';

//#endregion

console.log('hello world');
console.log('Your backend host ' + HOST_CONFIG['MainContext'].host);
console.log('Your frontend host ' + HOST_CONFIG['MainContext'].frontendHost);

//#region mouse-electron-jiggler component

//#region @browser
@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    AsyncPipe,
    NgFor,
    JsonPipe,
    HomeComponent,
    // MaterialCssVarsModule.forRoot({
    //   // inited angular material - remove if not needed
    //   primary: '#4758b8',
    //   accent: '#fedfdd',
    // }),
  ],
  template: `<app-home />`,
  styles: [
    `
      body {
        margin: 0px !important;
      }

      app-root-jiggler {
        display: block;
      }
    `,
  ],
})
export class MouseElectronJigglerApp {
  angularVersion =
    VERSION.full +
    ` mode: ${UtilsOs.isRunningInWebSQL() ? ' (websql)' : '(normal)'}`;

  userApiService = inject(UserApiService);
}
//#endregion

//#endregion

//#region  mouse-electron-jiggler api service

//#region @browser
@Injectable({
  providedIn: 'root',
})
export class UserApiService extends TaonBaseAngularService {
  userController = this.injectController(UserController);

  getAll(): Observable<User[]> {
    return this.userController
      .getAll()
      .request()
      .observable.pipe(map(r => r.body.json));
  }
}
//#endregion

//#endregion

//#region  mouse-electron-jiggler routes

//#region @browser
export const MouseElectronJigglerServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
export const MouseElectronJigglerClientRoutes: Routes = [];
//#endregion

//#endregion

//#region  mouse-electron-jiggler app configs

//#region @browser
export const MouseElectronJigglerAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: TAON_CONTEXT,
      useFactory: () => MainContext,
    },
    // providePrimeNG({
    //   // inited ng prime - remove if not needed
    //   theme: {
    //     preset: Aura,
    //   },
    // }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => MouseElectronJigglerStartFunction,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(MouseElectronJigglerClientRoutes),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

export const MouseElectronJigglerServerConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(MouseElectronJigglerServerRoutes)),
  ],
};

export const MouseElectronJigglerConfig = mergeApplicationConfig(
  MouseElectronJigglerAppConfig,
  MouseElectronJigglerServerConfig,
);
//#endregion

//#endregion

//#region  mouse-electron-jiggler entity
@TaonEntity({ className: 'User' })
class User extends TaonBaseAbstractEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  name?: string;

  getHello(): string {
    return `hello ${this.name}`;
  }
}
//#endregion

//#region  mouse-electron-jiggler controller
@TaonController({ className: 'UserController' })
class UserController extends TaonBaseCrudController<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  entityClassResolveFn = () => User;

  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world';
    //#endregion
  }

  @GET()
  getOsPlatform(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      //#region @backend
      return os.platform(); // for normal nodejs backend return real value
      //#endregion

      return 'no-platform-inside-browser-and-websql-mode';
    };
    //#endregion
  }
}
//#endregion

//#region  mouse-electron-jiggler migration

//#region @websql
@TaonMigration({
  className: 'UserMigration',
})
class UserMigration extends TaonBaseMigration {
  userController = this.injectRepo(User);

  async up(): Promise<any> {
    const superAdmin = new User();
    superAdmin.name = 'super-admin';
    await this.userController.save(superAdmin);
  }
}
//#endregion

//#endregion

//#region  mouse-electron-jiggler context
var MainContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MainContext'],
  contexts: { TaonBaseContext, JigglerContext },

  migrations: {},

  controllers: {},
  entities: {},
  useIpcWhenElectron: true,
  database: true,
  disabledRealtime: true,
}));
//#endregion

//#region  mouse-electron-jiggler start function
const MouseElectronJigglerStartFunction = async (
  startParams?: Taon.StartParams,
): Promise<void> => {
  await MainContext.initialize();

  //#region @backend
  if (
    startParams?.onlyMigrationRun ||
    startParams?.onlyMigrationRevertToTimestamp
  ) {
    process.exit(0);
  }
  //#endregion

  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion

  if (UtilsOs.isBrowser) {
    // let users = (
    //   await MainContext.getClassInstance(UserController).getAll().request()
    // ).body?.json;
    // if (UtilsOs.isElectron) {
    //   // TODO QUICK_FIX (ng2-rest refactor for ipc needed)
    //   users = users.map(u => new User().clone(u));
    // }
    // for (const user of users || []) {
    //   console.log(`user: ${user.name} - ${user.getHello()}`);
    // }
  }
};
//#endregion

export default MouseElectronJigglerStartFunction;
