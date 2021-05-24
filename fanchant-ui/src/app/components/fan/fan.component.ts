import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ChantService} from "../../services/chant.service";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  nextChantEvent$: Observable<ChantEvent> | undefined;
  chantEvent: ChantEvent | undefined;
  timeLeft: number = 0;

  constructor(private chantService: ChantService) {
    this.nextChantEvent$ = this.chantService.loadNextChantEvent();
    this.nextChantEvent$.subscribe((e: ChantEvent | null) => {
      if (e === null) {
        this.chantEvent = undefined;
        return;
      }
      this.chantEvent = e;
      this.timeLeft = (new Date(e.scheduled_for).getTime() - new Date().getTime())/1000;
    });
  }

  ngOnInit(): void {
  }
}
