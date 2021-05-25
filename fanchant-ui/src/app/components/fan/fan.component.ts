import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ChantService} from "../../services/chant.service";
import {CountdownEvent} from "ngx-countdown";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  nextChantEvent$: Observable<ChantEvent> | undefined;
  chantEvent: ChantEvent | undefined;
  timeLeft: number = 0;
  timeRunning: number = 0;
  shouldRunChant: boolean;

  constructor(private chantService: ChantService) {
    this.shouldRunChant = false;
    this.nextChantEvent$ = this.chantService.loadNextChantEvent();
    this.nextChantEvent$.subscribe((e: ChantEvent | null) => {
      if (e === null) {
        this.chantEvent = undefined;
        return;
      }
      this.chantEvent = e;
      this.timeLeft = (new Date(e.scheduled_for).getTime() - new Date().getTime())/1000;
      if (this.timeLeft <= 0) {
        this.timeRunning = e.chant.timelapse - (new Date().getTime() - new Date(e.scheduled_for).getTime())/1000;
      }
    });
  }

  ngOnInit(): void {
  }

  onCountdownDone($event: CountdownEvent): void {
    if($event.action !== 'done') {
      return;
    }
    this.shouldRunChant = true;
  }
}
