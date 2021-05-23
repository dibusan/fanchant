import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  chantSubject: Subject<Chant[]>;

  constructor(private http: HttpClient) {
    this.chantSubject = new Subject<Chant[]>();
  }

  chantSubjectListener(): Observable<Chant[]> {
    return this.chantSubject.asObservable();
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
