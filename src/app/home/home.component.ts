import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsOs } from 'tnp-core/src';

import { ElectronService } from './electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  height = window.innerHeight;
  width = window.innerWidth;
  get ipcRenderer() {
    if (UtilsOs.isElectron) {
      return this.electronService.ipcRenderer;
    }
  }
  jigglerEnable = false;

  constructor(
    private router: Router,
    private electronService: ElectronService,
  ) {}

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    if (UtilsOs.isElectron) {
      this.electronService.ipcRenderer.on('loggg', (event, data) => {
        console.log('hello');
      });
    }
  }

  toogleEnable() {
    console.log('TOOGLE');
    this.jigglerEnable = !this.jigglerEnable;
    if (UtilsOs.isElectron) {
      this.ipcRenderer.send('set-title', 'hello');
    }
  }
}
