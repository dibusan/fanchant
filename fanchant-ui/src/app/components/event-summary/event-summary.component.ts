import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {
  @Input() chantEvent: ChantEvent | undefined;
  leftTime: number = 0;
  @Output() onDeleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.chantEvent) {
      // const scheduled_datetime = new Date(this.chantEvent.scheduled_for);
      //
      // // Difference in seconds
      // this.leftTime = (scheduled_datetime.getTime() - new Date().getTime())/1000;
    }

  }

  chantTitle(): string {
    return this.chantEvent?.chant.title || "";
  }

  chantSchedule(): string {
    return this.chantEvent?.scheduled_for || "";
  }

  deleteEvent(): void {
    // Notify with empty emit
    // No need to emit the value since its already available upstream
    this.onDeleteEvent.emit();
  }
}
