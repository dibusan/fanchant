import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable, of} from "rxjs";


@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit, OnDestroy {
  chants$: Observable<Chant[]> = of([]);
  chants: Chant[] = [];

  selectedChant: Chant | undefined;

  event: ChantEvent | undefined;

  chantLines: string[] = [];
  newChant: boolean = false;
  constructor(private chantService: ChantService) {
  }

  ngOnInit(): void {
    // this.chants$ = this.chantService.getChants_DEPRECATED();
    this.chants$ = this.chantService.getChants();
    this.chants$.subscribe((chs) => this.chants = chs);
    this.chantService.getEvent().subscribe(ev => {
      this.event = ChantService.processNewEvent(ev);
      if (this.event) {
        this.chantLines = ChantService.getLinesFromChant(this.event?.chant);
      }
    });
  }

  ngOnDestroy(): void {
  }

  secondsLeft(event: ChantEvent | undefined): number {
    return ChantService.secondsLeftToStart(event);
  }

  hasStarted(event: ChantEvent | undefined): boolean {
    return ChantService.eventHasStarted(event);
  }

  inProgress(chantId: number | undefined): boolean {
    return chantId !== undefined && this.event?.chant.id === chantId;
  }

  isSelected(id: number | undefined) {
    return id !== undefined && this.selectedChant?.id === id;
  }

  selectChant(chant: Chant) {
    this.selectedChant = chant;
  }

  stopChant() {
    this.chantService.stopChant().subscribe((r) => {
      this.event = r;
      this.chantService.clearEvent();
    });
  }

  startChant() {
    this.chantService.startChant(this.selectedChant)?.subscribe((e: ChantEvent) => {
      this.event = e;
      this.chantService.updateEvent(e);
    });
  }

  selectedChantLines(): string[] {
    if (!this.selectedChant) {
      return [];
    }
    return ChantService.getLinesFromChant(this.selectedChant);
  }

  nextLine() {
    if (!this.event) {
      return;
    }
    this.chantService.nextLine(this.event).subscribe(
      (ev) => this.event = ev
    );
  }
}
