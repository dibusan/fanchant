import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, timer} from "rxjs";
import {finalize, map, share, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChantService {
  // Old Deprecating Version
  private chants_DEPRECATED$: Observable<Chant_DEPRECATED_DO_NOT_USE[]> | undefined;
  private chants_DEPRECATED: Chant_DEPRECATED_DO_NOT_USE[] | undefined;

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

  getChants_DEPRECATED(): Observable<Chant_DEPRECATED_DO_NOT_USE[]> {
    let observable: Observable<any>;
    if (this.chants_DEPRECATED) {
      observable = of(this.chants_DEPRECATED);
    }  else if (this.chants_DEPRECATED$) {
      observable = this.chants_DEPRECATED$;
    } else {
      this.chants_DEPRECATED$ = this.http.get<Chant_DEPRECATED_DO_NOT_USE[]>(`/chants2`)
        .pipe(
          tap((res: Chant_DEPRECATED_DO_NOT_USE[]) => this.chants_DEPRECATED = res),
          share(),
          finalize(() => this.chants_DEPRECATED$ = undefined)
        );
      observable = this.chants_DEPRECATED$;
    }
    return observable;
  }

  getEvent(): Observable<ChantEvent> {
    if(this.event$) {
      return this.event$;
    }
    this.event$ = timer(1, 3000).pipe(
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
  static processNewEvent(ev: ChantEvent): ChantEvent | undefined {
    if (!ev) {
      return undefined;
    }
    ev.chant.parsed_content = ChantService.stringToChantLines(ev.chant.content);
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
    const matchLineTime = rawLine.match(/\[([\d+|:|.]+)]/);
    let time = '';
    if (!matchLineTime) {
      console.error("No time at begining of line: " + rawLine);
    } else {
      time = matchLineTime[1];
    }

    return {
      time: time,
      words: this.buildChantWords(time, rawLine),
    };
  }

  private static buildChantWords(firstWordTime: string, rawLine: string): ChantWord[] {
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
