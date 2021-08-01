import {Component, OnInit} from '@angular/core';
import {ChantService} from "../../services/chant.service";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  event: ChantEvent | undefined;

  constructor(private chantService: ChantService) {
  }

  ngOnInit(): void {
    this.chantService.getEvent().subscribe(ev => this.event = ev);
  }

  chantLines(): string[] {
    if (!this.event?.chant?.content) {
      return [];
    }
    return this.event.chant.content.split('\n');
  }
}
