import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {
  @Input() chantEvent: ChantEvent | undefined;
  timeLeft: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.chantEvent) {
      const scheduled_datetime = new Date(this.chantEvent.scheduled_for);

      // Difference in seconds
      this.timeLeft = (scheduled_datetime.getTime() - new Date().getTime())/1000;
    }

  }

  chantTitle(): string {
    return this.chantEvent?.chant.title || "";
  }

  chantSchedule(): string {
    return this.chantEvent?.scheduled_for || "";
  }
}
