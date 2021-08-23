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

  topChantLineWords(): ChantWord[] | undefined {
    if (!this.event) {
      return [];
    }
    let top = -1;
    if (this.event.center_line) {
      top = this.event.center_line - 1;
    }
    if (top < 0) {
      return;
    }

    return this.event.chant.parsed_content[top].words;
  }

  centerChantLineWords(): ChantWord[] {
    if (!this.event) {
      return [];
    }
    let center = 0;
    if (this.event.center_line) {
      center = this.event.center_line;
    }
    return this.event.chant.parsed_content[center].words;
    // return this.event?.chant.parsed_content[this.event?.next_line].words;
  }

  bottomChantLineWords(): ChantWord[] | undefined {
    if (!this.event) {
      return [];
    }
    let bottom = 1;
    if (this.event.center_line) {
      bottom = this.event.center_line + 1;
    }

    if (bottom > this.event.chant.parsed_content.length-1) {
      return;
    }

    return this.event.chant.parsed_content[bottom].words;
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
