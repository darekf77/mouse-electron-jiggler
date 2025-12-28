//#region imports
import {
  DateTimeColumn,
  StringColumn,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { JigglerDefaultsValues } from './jiggler.defaults-values';
//#endregion

@TaonEntity({
  className: 'Jiggler',
  createTable: true,
})
export class Jiggler extends TaonBaseAbstractEntity<Jiggler> {
  //#region @websql
  @StringColumn(JigglerDefaultsValues.description)
  //#endregion
  description?: string;

  //#region @websql
  @DateTimeColumn()
  //#endregion
  modificationDate?: string;
}
