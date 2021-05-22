import { Component, OnInit } from '@angular/core';
import {ChantService} from "../../services/chant.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {
  chants$: Observable<Chant[]>;
  defaultChant: Chant = { id: 0, title: '', content: '' };
  selected: Chant = { id: 0, title: '', content: '' };

  constructor(private chantService: ChantService) {
    this.chants$ = this.chantService.loadChants();
    this.chants$.subscribe((chants: Chant[]) => {
      if (chants.length > 0) {
        this.selected = chants[0];
      }
    })
  }

  ngOnInit(): void {
  }
}
