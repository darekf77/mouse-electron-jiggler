//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  GET,
  Query,
  POST,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { Jiggler } from './jiggler';
import { JigglerProvier } from './jiggler.provider';
//#endregion

@TaonController({
  className: 'JigglerController',
})
export class JigglerController extends TaonBaseCrudController<Jiggler> {
  entityClassResolveFn: () => typeof Jiggler = () => Jiggler;

  jigglerProvier = this.injectProvider(JigglerProvier);

  //#region methods & getters / hello world
  @POST()
  enableToggle(): Taon.Response<boolean> {
    //#region @websqlFunc
    return async (req, res) => {
      return this.jigglerProvier.toogle();
    };
    //#endregion
  }
  //#endregion
}
