import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, timer} from "rxjs";
import {finalize, map, share, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChantService {
  // New Version
  private chants$: Observable<Chant[]> | undefined;
  private chants: Chant[] | undefined;

  private event$: Observable<ChantEvent> | undefined;
  private eventSubject: Subject<ChantEvent> = new Subject<ChantEvent>();

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
          map((res: Chant[]) => res.map<Chant>((chant: Chant) => {
            chant.parsed_content = ChantService.stringToChantLines(chant.content);
            return chant;
          })),
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

    this.event$ = timer(1, 300).pipe(
      switchMap(() => this.http.get<ChantEvent>('/events/next')),
      share(),
    );
    return this.event$;
  }

  clearEvent(): void {
    this.eventSubject.next();
  }

  updateEvent(event: ChantEvent): void {
    this.eventSubject.next(event);
  }

  getEventSubscription(): Observable<ChantEvent> {
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

  nextLine(ev: ChantEvent): Observable<ChantEvent> {
    return this.http.get<ChantEvent>(`/events/${ev.id}/nextLine`);
  }

  static getLinesFromChant(c: Chant): string[] {
    if(!c) {
      return [];
    }

    return c.parsed_content?.map(
      (line) => line.words.map(
        (w) => w.text
      ).join(' ')
    );
  }

  static getXLinesFromChantAsString(c: Chant, start: number, x: number): string[] {
    if(!c) {
      return [];
    }
    const arr = [];
    for(let i = start; i < start+x; i++) {
      arr.push(c.parsed_content[i].words.map(
        (w) => w.text
      ).join(' '))
    }
    return arr;
  }

  static getXLinesFromChant(c: Chant, start: number, x: number): ChantLine[] {
    if(!c) {
      return [];
    }
    return c.parsed_content?.slice(start, start+x);
  }

  static secondsLeftToStart(event: ChantEvent | undefined): number {
    if (!event) {
      return 0;
    }
    return Math.round((Date.now() - event.scheduled_for)/1000)*-1;
  }

  static eventHasStarted(event: ChantEvent | undefined): boolean {
    if (!event) {
      return false;
    }
    return Date.now() >= event.scheduled_for;
  }

  static processNewEvent(ev: ChantEvent): ChantEvent | undefined {
    if (!ev) {
      return undefined;
    }

    if (!ev.chant.parsed_content) {
      ev.chant.parsed_content = ChantService.stringToChantLines(ev.chant.content);
    }

    ev.chant.parsed_content.map(
      (l, index) => {
        l.words.map(
          (w) => {
            w.active = (Date.now() >= ev.scheduled_for + w.timestamp);
          }
        )
        if(Date.now() >= ev.scheduled_for + l.time) {
          ev.center_line = index;
        }
      }
    )
    return ev;
  }

  static stringToChantLines(content: string | ChantLine[]): ChantLine[] {
    if (typeof content !== "string") {
      return content;
    }

    let rawLines = content.split('\n');
    return rawLines.map((line) => this.buildChantLine(line));
  }

  private static buildChantLine(rawLine: string): ChantLine {
    // Example str: [00:24.498] I <00:24.924> die
    // Matches       00:24.498
    const matchLineTime = rawLine.match(/\[(\d+):(\d+).(\d+)]/);
    let time = 0;
    if (!matchLineTime) {
      console.error("No time at begining of line: " + rawLine);
    } else {
      time += +matchLineTime[1] * 60 * 1000; // minutes
      time += +matchLineTime[2] * 1000; // seconds
      time += +matchLineTime[3]; // milliseconds
    }

    return {
      time: time,
      words: this.buildChantWords(rawLine),
    };
  }

  private static buildChantWords(rawLine: string): ChantWord[] {
    // Words
    // @ts-ignore
    const matchAllWords = rawLine.matchAll(/](.*?)<|>(.*?)<|>(.*?)$/g);
    let words: string[] = []
    for(let s of matchAllWords) {
      let w: string = '';
      if (s[1]) { w = s[1];}
      else if (s[2]) { w = s[2]; }
      else if (s[3]) { w = s[3]; }
      words.push(w.trim());
    }

    // Timestamps
    // @ts-ignore
    const matchAllTimestamps = rawLine.matchAll(/(\d{2}):(\d{2})\.(\d{3})/g);
    let stamps: number[] = [];
    for(let stamp of matchAllTimestamps) {
      let mins = +stamp[1];
      let secs = +stamp[2];
      let millis = +stamp[3];

      millis += mins * 60 * 1000;
      millis += secs * 1000;
      stamps.push(millis);
    }

    // Build the ChantWords
    let chWords: ChantWord[] = [];
    for (let i = 0; i < stamps.length; i++) {
      chWords.push({
        timestamp: stamps[i],
        text: words[i],
      });
    }
    return chWords;
  }
}
