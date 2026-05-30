//#region imports
import {
  mouse,
  // singleWord,
  // sleep,
  // useConsoleLogger,
  // ConsoleLogLevel,
  // straightTo,
  // centerOf,
  // Button,
  // getActiveWindow,
  Point,
} from '@nut-tree-fork/nut-js'; // @backend
import { app, BrowserWindow, ipcMain, screen } from 'electron'; // @backend
import { Taon, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _, Utils } from 'tnp-core/src';
//#endregion

@TaonProvider({
  className: 'JigglerProvier',
})
export class JigglerProvier extends TaonBaseProvider {
  private jigger = false;

  public toogle(): boolean {
    this.jigger = !this.jigger;
    return this.jigger;
  }

  async _(): Promise<void> {
    //#region @backendFunc
    this.jiggerStartFn();
    //#endregion
  }

  async jiggerStartFn(): Promise<void> {
    //#region @backendFunc
    console.log('Jiggle started in background');

    while (true) {
      const display = screen.getPrimaryDisplay();
      const { width, height } = display.size; // do NOT multiply by scaleFactor

      const centerY = Math.floor(height / 2);
      const amplitude = Math.floor(height / 2) - 20;
      const twoPI = Math.PI * 2;

      for (let x = 0; x < width; x++) {
        if (!this.jigger) {
          await Utils.waitMilliseconds(1000);
          break;
        }

        const y = centerY + amplitude * Math.sin((twoPI * x) / width);

        await mouse.move([new Point(Math.round(x), Math.round(y))]);
        await Utils.waitMilliseconds(4);
      }
    }
    //#endregion
  }
}
