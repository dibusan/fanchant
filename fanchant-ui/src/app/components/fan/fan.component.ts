import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  event: ChantEvent | undefined;
  chantLines: string[] = [];
  centerLineIndex: number = 0;

  constructor(private chantService: ChantService) {
  }

  ngOnInit(): void {
    this.chantService.getEvent().subscribe(ev => this.processNewEvent(ev));
  }

  private processNewEvent(ev: ChantEvent): void {
    this.event = ev;
    this.chantLines = this.event?.chant?.content.split('\n');
  }
  private hasLines(): boolean {
    return this.chantLines && this.chantLines.length > 0;
  }

  topLine(): string {
    if (
      !this.hasLines() ||
      this.centerLineIndex === 0
    ) {
      return '';
    }
    return this.chantLines[this.centerLineIndex - 1];
  }

  centerLine(): string {
    if (!this.hasLines()) {
      return '';
    }
    return this.chantLines[this.centerLineIndex];
  }

  bottomLine(): string {
    if (
      !this.hasLines() ||
      this.centerLineIndex + 1 >= this.chantLines.length
    ) {
      return '';
    }
    return this.chantLines[this.centerLineIndex + 1];
  }

  nextLine() {
    this.centerLineIndex += 1;
  }
}
