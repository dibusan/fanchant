import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, timer} from "rxjs";
import {retry, share, switchMap, takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChantService implements OnDestroy {
  FIVE_SECONDS = 5000;

  private nextChantEvent$: Observable<ChantEvent>;
  private stopPolling = new Subject();

  chantSubject: Subject<Chant[]>;

  constructor(private http: HttpClient) {
    this.chantSubject = new Subject<Chant[]>();

    this.nextChantEvent$ = timer(1, this.FIVE_SECONDS).pipe(
      switchMap(() => this.http.get<ChantEvent>('/events/next')),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

  loadNextChantEvent(): Observable<ChantEvent> {
    return this.nextChantEvent$;
  }

  loadChants(): Observable<Chant[]> {
    return this.http.get<Chant[]>('/chants');
  }

  loadEvents(): Observable<ChantEvent[]> {
    return this.http.get<ChantEvent[]>('/events', {
      params: { future: true }
    });
  }

  createEvent(scheduleInfo: { scheduled_for: string; chantId: number; }): Observable<ChantEvent[]> {
    return this.http.post<ChantEvent[]>('/events', scheduleInfo);
  }

  deleteEvent(chantEvent: ChantEvent) {
    return this.http.delete<ChantEvent[]>(`/events/${chantEvent.id}`);
  }

}
