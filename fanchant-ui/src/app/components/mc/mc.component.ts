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
  defaultChant: Chant = { id: 0, title: '', content: '' };
  selected: Chant = { id: 0, title: '', content: '' };
  scheduleDate: Date;
  scheduleTime: string;
  countdown = 5;

  constructor(private chantService: ChantService) {
    // Now + 5 minutes
    this.scheduleDate = new Date(new Date().getTime() + (5*60000));
    this.scheduleTime = formatDate(this.scheduleDate, 'hh:mm:ss', 'en-US');

    this.chants$ = this.chantService.loadChants();
    // this.chants$.subscribe((chants: Chant[]) => {
    //   if (chants.length > 0) {
    //     this.selected = chants[0];
    //   }
    // })
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
}
