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
    let size: Electron.Size = undefined as any;

    let twoPI: number = undefined as any;
    let height: number = undefined as any;
    let width: number = undefined as any;

    const calculate = () => {
      size = screen.getPrimaryDisplay().size;
      const scale = screen.getPrimaryDisplay().scaleFactor;
      twoPI = Math.PI * 2.0;
      height = Math.floor(size.height * scale) / 2 - 10;
      width = Math.floor(size.width * scale);
    };
    while (true) {
      calculate();
      for (var x = 0; x < width; x++) {
        const y = height * Math.sin((twoPI * x) / width) + height;
        // robot.moveMouse(x, y);
        // robot.moveMouse(x, y);
        if (this.jigger) {
          mouse.move([new Point(x, y)]);
          await Utils.waitMilliseconds(4);
        } else {
          await Utils.waitMilliseconds(1000);
          calculate();
        }
      }
    }
    //#endregion
  }
}
