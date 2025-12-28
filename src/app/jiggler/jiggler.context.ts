//#region imports
import { Taon, TaonBaseContext } from 'taon/src';

import { Jiggler } from './jiggler';
import { JigglerController } from './jiggler.controller';
import { JigglerProvier } from './jiggler.provider';
//#endregion

export const JigglerContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  // ...HOST_CONFIG['JigglerContext'],
  contextName: 'JigglerContext', // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: true,
  /**
   * database:true - if this context is going to use database
   */
  database: false,
  // if you need a migration to work - uncomment
  // migrations: {
  //   ...MIGRATIONS_CLASSES_FOR_JigglerContext,
  // },
  contexts: { TaonBaseContext },
  entities: { Jiggler },
  providers: { JigglerProvier },
  controllers: { JigglerController },
}));
