import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, timer} from "rxjs";
import {distinctUntilChanged, finalize, retryWhen, share, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChantService implements OnDestroy, OnInit {
  private chants$: Observable<Chant[]> | undefined;
  private chants: Chant[] | undefined;

  private event$: Observable<ChantEvent> | undefined;

  ngOnInit(): void {
    this.getChants();

  }
  ngOnDestroy(): void {
  }

  constructor(private http: HttpClient) {
  }

  getChants(): Observable<Chant[]> {
    let observable: Observable<any>;
    if (this.chants) {
      observable = of(this.chants);
    }  else if (this.chants$) {
      observable = this.chants$;
    } else {
      this.chants$ = this.http.get<Chant[]>(`/chants`)
        .pipe(
          tap((res: Chant[]) => this.chants = res),
          share(),
          finalize(() => this.chants$ = undefined)
        );
      observable = this.chants$;
    }
    return observable;
  }

  getEvent(): Observable<ChantEvent> {
    if(this.event$) {
      return this.event$;
    }
    this.event$ = timer(1, 10000).pipe(
      switchMap(() => this.http.get<ChantEvent>('/events/next')),
      share(),
    );
    return this.event$;
  }


  stopChant(): Observable<ChantEvent> {
    return this.http.get<ChantEvent>('/events/stop');
  }

  startChant(selectedChant: Chant | undefined): Observable<ChantEvent> | undefined {
    if (selectedChant && selectedChant.id) {
      return this.http.post<ChantEvent>('/events', {chantId: selectedChant.id})
    }
    return undefined;
  }
}
