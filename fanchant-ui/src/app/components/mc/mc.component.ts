import {Component, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable} from "rxjs";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {
  chants$: Observable<Chant[]>;
  chantEvents$: Observable<ChantEvent[]>;
  selected: Chant = { id: 0, title: '', content: '', timelapse: 0 };
  countdown = 0.1;
  savedChants: Chant[] = [];
  chantEvents: ChantEvent[] = [];

  constructor(private chantService: ChantService) {
    this.chants$ = this.chantService.loadChants();
    this.chants$.subscribe((chants: Chant[]) => {
      this.savedChants = chants;
      if (chants.length > 0) {
        this.selected = chants[0];
      }
    });

    this.chantEvents$ = this.chantService.loadEvents();
    this.chantEvents$.subscribe((events: ChantEvent[]) => this.chantEvents = events);
  }

  ngOnInit(): void {
  }

  pluralizeMinutes(n: number): string {
    if (n === 1) {
      return '1 minute';
    }
    return n + ' minutes';
  }

  scheduleDate(countdown: number): string {
    return new Date(new Date().getTime() + (countdown * 60000)).toISOString();
  }

  changeChantSelection($event: MatSelectChange) {
    this.selected = $event.value;
  }

  scheduleChant(): void {
    this.chantEvents$ = this.chantService.createEvent({
      scheduled_for: this.scheduleDate(this.countdown),
      chantId: this.selected.id || 0,
    });
  }

  deleteEvent(chantEvent: ChantEvent): void {
    this.chantEvents$ = this.chantService.deleteEvent(chantEvent);
  }
}
