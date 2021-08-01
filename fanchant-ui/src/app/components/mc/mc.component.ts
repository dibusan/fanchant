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

  constructor(private chantService: ChantService) {
  }

  ngOnInit(): void {
    this.chants$ = this.chantService.getChants();
    this.chants$.subscribe(chs => this.chants = chs);
    this.chantService.getEvent().subscribe(ev => this.event = ev);
  }

  ngOnDestroy(): void {
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
    this.chantService.stopChant().subscribe((r) => this.event = r);
  }

  startChant() {
    this.chantService.startChant(this.selectedChant)?.subscribe((r) => this.event = r);
  }
}
