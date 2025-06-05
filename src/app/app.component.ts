import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsOs } from 'tnp-core/src';

@Component({
  selector: 'app-root-jiggler',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    // console.log('APP_CONFIG', APP_CONFIG);

    if (UtilsOs.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
    } else {
      console.log('Run in browser');
    }
  }
}
