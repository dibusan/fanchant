# FanchantUi

`ng build --prod`
`gcloud app deploy --project=fanchant`

[App full screen](https://stackoverflow.com/questions/58491050/how-can-i-make-my-angular-web-app-open-in-fullscreen-in-mobile-chrome)
[App full screen - rotate stackblitz](https://stackblitz.com/edit/ng-lock-orientation?file=src%2Fapp%2Fapp.component.ts)

- !!! [ng-openaudio handles Angular Karaoke](https://www.npmjs.com/package/ng-openaudio)

- [Animations for Karaoke example](https://medium.com/angularwave/rxjs-challenge-09-karaoke-subtitles-39cc5c133746)
- [Demo](https://jamigo.app/custom/LZdhtPriojIoY0X38M3w)

6024064402

[Karaoke Maker - word by word](https://stage.elsdoerfer.com/elrcmaker/#)

[Karaoke Maker - line by line](https://lrc-maker.github.io/#/synchronizer/)


FIVE_SECONDS = 5000;
FIFTY_SECONDS = 50000;

private nextChantEvent$: Observable<ChantEvent> | undefined;
private stopPolling = new Subject();
private availableChants$: Observable<Chant[]>;

chantSubject: Subject<Chant[]>;

constructor(private http: HttpClient) {
this
this.chantSubject = new Subject<Chant[]>();

    // this.nextChantEvent$ = timer(1, this.FIVE_SECONDS).pipe(
    //   switchMap(() => this.http.get<ChantEvent>('/events/next')),
    //   // switchMap(() => this.http.get<ChantEvent>('/events/next_dummy')),
    //   retryWhen(errors => errors.pipe(delay(1000))),
    //   share(),
    //   takeUntil(this.stopPolling)
    // );
    // this.nextChantEvent$ = this.http.get<ChantEvent>('/events/next');
}

ngOnDestroy() {
this.stopPolling.next();
}

poll(): Observable<ChantEvent> {
console.log("POLL-2")
return this.http.get<ChantEvent>('/events/next');
}

loadChants(): Observable<Chant[]> {
return this.http.get<Chant[]>('/chants');
}

loadEvents(): Observable<ChantEvent[]> {
return this.http.get<ChantEvent[]>('/events', {
params: { future: true }
});
}

loadCurrentEvent(): Observable<ChantEvent> {
return this.http.get<ChantEvent>('/events');
}

startEvent(chantId: number): Observable<ChantEvent> {
return this.http.post<ChantEvent>(`/events`, {chantId: chantId});
}

stopEvent(): Observable<ChantEvent> {
return this.http.get<ChantEvent>(`/events/stop`);
}

createEvent(scheduleInfo: { scheduled_for: string; chantId: number; }): Observable<ChantEvent[]> {
return this.http.post<ChantEvent[]>('/events', scheduleInfo);
}

deleteEvent(chantEvent: ChantEvent) {
return this.http.delete<ChantEvent[]>(`/events/${chantEvent.id}`);
}
