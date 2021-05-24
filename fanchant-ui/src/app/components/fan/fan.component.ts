import { Component, OnInit } from '@angular/core';
import {interval, Observable, timer} from "rxjs";
import {ChantService} from "../../services/chant.service";
import {retry, share, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  nextChantEvent$: Observable<ChantEvent> | undefined;

  constructor(private chantService: ChantService) {
    this.nextChantEvent$ = this.chantService.loadNextChantEvent();
  }

  ngOnInit(): void {
  }
}
