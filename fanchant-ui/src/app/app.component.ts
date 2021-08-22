import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fanchant-ui';
  text = '';
  constructor() {
  }

  fullScreenCheck() {
    if (document.fullscreenElement) return;
    return document.documentElement.requestFullscreen();
  }

  async rotate() {
    try {
      await this.fullScreenCheck();
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {

  }
}
