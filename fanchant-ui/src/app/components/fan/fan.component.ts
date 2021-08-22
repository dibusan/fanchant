import {Component, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  event: ChantEvent | undefined;
  chantLines: string[] = [];

  constructor(private chantService: ChantService) {
  }

  ngOnInit(): void {
    this.chantService.getEvent().subscribe(ev => {
      this.event = ChantService.processNewEvent(ev);
      if (this.event) {
        this.chantLines = ChantService.getLinesFromChant(this.event?.chant);
      }
    });
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
}
