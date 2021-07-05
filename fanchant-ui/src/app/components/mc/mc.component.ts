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
  selectedChantId: number = 0;
  countdown = 0.1;
  savedChants: Chant[] = [];
  chantEvents: ChantEvent[] = [];
  index = 1;
  chants = [
    'Inter, eres mi obsesion',
    'Ahi viene la hinchada',
    'Inter, mi buen amigo',
    'Alentando al rosanegro',
  ];
  isChantPlaying: boolean = false;

  constructor(private chantService: ChantService) {
    this.chants$ = this.chantService.loadChants();
    this.chants$.subscribe((chants: Chant[]) => {
      this.savedChants = chants;
      if (chants.length > 0) {
        this.selectedChantId = chants[0].id || 0;
      }
    });

    this.chantEvents$ = this.chantService.loadEvents();
    this.chantEvents$.subscribe((events: ChantEvent[]) => this.chantEvents = events);
  }

  ngOnInit(): void {
  }

  startPlaying(): void {
    this.isChantPlaying = true;
  }

  stopPlaying(): void {
    this.isChantPlaying = false;
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
    this.selectedChantId = $event.value.id;
  }

  scheduleChant(): void {
    this.chantEvents$ = this.chantService.createEvent({
      scheduled_for: this.scheduleDate(this.countdown),
      chantId: this.selectedChantId || 0,
    });
  }

  deleteEvent(chantEvent: ChantEvent): void {
    this.chantEvents$ = this.chantService.deleteEvent(chantEvent);
  }

  changeSelectedChant(id: number = 0) {
    this.selectedChantId = id;
  }

  findSelectedChant(): Chant | undefined {
    return this.savedChants.find(c => c.id === this.selectedChantId);
  }
}
