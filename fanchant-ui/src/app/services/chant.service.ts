import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, timer} from "rxjs";
import {finalize, share, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChantService implements OnDestroy, OnInit {
  private chants$: Observable<Chant[]> | undefined;
  private chants: Chant[] | undefined;

  private event$: Observable<ChantEvent> | undefined;
  private eventSubject: Subject<ChantEvent> = new Subject<ChantEvent>();

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
    this.event$ = timer(1, 1000).pipe(
      switchMap(() => this.http.get<ChantEvent>('/events/next')),
      share(),
    );
    return this.event$;
  }

  clearEvent(): void {
    console.log('Clear event');
    this.eventSubject.next();
  }

  updateEvent(event: ChantEvent): void {
    this.eventSubject.next(event);
    console.log('Update event');
  }

  getEventSubscription(): Observable<ChantEvent> {
    console.log('Subscribe to event');
    return this.eventSubject.asObservable();
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
