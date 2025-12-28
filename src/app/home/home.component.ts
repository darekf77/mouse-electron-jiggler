//#region imports
import { sign } from 'crypto';

import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsOs } from 'tnp-core/src';

import { JigglerApiService } from '../jiggler';

import { ElectronService } from './electron.service';
//#endregion

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [JigglerApiService],
})
export class HomeComponent {
  private destroyRef = inject(DestroyRef);

  jigglerApiService = inject(JigglerApiService);

  height = window.innerHeight;

  width = window.innerWidth;

  jigglerEnabled = signal<boolean>(false);

  private processing = false;

  toogleEnable(): void {
    if (this.processing) {
      return;
    }
    this.processing = true;
    this.jigglerApiService
      .enableToggle()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(enabled => {
        this.jigglerEnabled.set(enabled);
        this.processing = false;
      });
  }
}
