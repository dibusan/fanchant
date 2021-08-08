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
  constructor(private chantService: ChantService) {
  }
  private hasLines(): boolean {
    return this.chantLines && this.chantLines.length > 0;
  }

  topLine(): string {
    if (
      !this.event ||
      !this.hasLines() ||
      this.event.next_line === 0
    ) {
      return '';
    }
    return this.chantLines[this.event.next_line - 1];
  }

  centerLine(): string {
    if (!this.event || !this.hasLines()) {
      return '';
    }
    return this.chantLines[this.event.next_line];
  }

  bottomLine(): string {
    if (
      !this.event ||
      !this.hasLines() ||
      this.event.next_line + 1 >= this.chantLines.length
    ) {
      return '';
    }
    return this.chantLines[this.event.next_line + 1];
  }

  ngOnInit(): void {
    this.chants$ = this.chantService.getChants();
    this.chants$.subscribe(chs => this.chants = chs);
    this.chantService.getEvent().subscribe(ev => this.processNewEvent(ev));
  }

  ngOnDestroy(): void {
  }

  private processNewEvent(ev: ChantEvent): void {
    this.event = ev;
    this.chantLines = this.event?.chant?.content.split('\n');
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
    return this.selectedChant.content.split('\n');
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
