import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { Jiggler } from './jiggler';
import { JigglerController } from './jiggler.controller';

@Injectable()
export class JigglerApiService extends TaonBaseAngularService {
  protected jigglerController = this.injectController(JigglerController);

  enableToggle(): Observable<boolean> {
    return this.jigglerController.enableToggle().request!().observable.pipe(
      map(r => r.body.booleanValue),
    );
  }
}
