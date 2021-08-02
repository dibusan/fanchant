import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit, OnDestroy {
  event: ChantEvent | undefined;
  eventSubscription: Subscription;
  constructor(private chantService: ChantService) {
    this.eventSubscription =
      this.chantService.getEventSubscription().subscribe((ev) => {
        this.event = ev;
        console.log('Received event update');
      });
  }

  ngOnInit(): void {
    this.chantService.getEvent().subscribe(ev => this.event = ev);
  }

  chantLines(): string[] {
    if (!this.event?.chant?.content) {
      return [];
    }
    return this.event.chant.content.split('\n');
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.eventSubscription.unsubscribe();
  }
}
