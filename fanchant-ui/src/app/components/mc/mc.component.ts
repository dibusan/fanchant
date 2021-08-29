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
  centerLine: number = 4;

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

  selectedChantLinesAsString(): string[] {
    if (!this.selectedChant) {
      return [];
    }
    let currentLine = 0;
    this.selectedChant.parsed_content.find((chl, index) => {
      let w = chl.words.find((w) => !w.active)
      if (!!w) {
        currentLine = index;
        return true;
      }
      return false;
    })

    let n = this.selectedChant.parsed_content.length;
    if (currentLine+8 >= n) {
      currentLine = n - 8;
    }

    return ChantService.getXLinesFromChantAsString(this.selectedChant, currentLine, 8);
  }

  runningChantLines(): ChantLine[] {

    if (!this.event?.chant) {
      return [];
    }
    let currentLine = 0;

    this.event?.chant.parsed_content?.find((chl, index) => {
      let w = chl.words.find((w) => !w.active)
      if (!!w) {
        currentLine = index;
        return true;
      }
      return false;
    });


    let n = this.event?.chant.parsed_content?.length;
    if (currentLine <= 4) {
      this.centerLine = currentLine;
      currentLine = 0;
    } else {
      currentLine -= 4;
      this.centerLine = 4;
    }

    if(currentLine+8 >= n) {
      this.centerLine = (n - currentLine)+4;
      currentLine = n - 8;
    }


    return ChantService.getXLinesFromChant(this.event?.chant, currentLine, 8);
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
