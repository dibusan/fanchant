import { Component, OnInit } from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable, of} from "rxjs";
import {formatDate, Time} from "@angular/common";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {
  chants$: Observable<Chant[]>;
  chantEvents$: Observable<ChantEvent[]>;
  defaultChant: Chant = { id: 0, title: '', content: '' };
  selected: Chant = { id: 0, title: '', content: '' };
  scheduleDate: Date;
  scheduleTime: string;
  countdown = 5;
  savedChants: Chant[] = [];
  chantEvents: ChantEvent[] = [];

  constructor(private chantService: ChantService) {
    // Now + 5 minutes
    this.scheduleDate = new Date(new Date().getTime() + (5*60000));
    this.scheduleTime = formatDate(this.scheduleDate, 'hh:mm:ss', 'en-US');

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

  findChantContent(chant: Chant) {

  }

  changeChantSelection($event: MatSelectChange) {
    this.selected = $event.value;
  }

  scheduleChant(): void {
    this.chantEvents$ = this.chantService.createEvent({
      scheduled_for: this.scheduleDate.toISOString(),
      chantId: this.selected.id || 0,
    })
  }
}
