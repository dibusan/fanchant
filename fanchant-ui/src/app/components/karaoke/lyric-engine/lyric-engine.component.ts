import {Component, Directive, Inject, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {IS_ASSETS_TOKEN} from "../../../interceptors/chant-api.interceptor";
import {Observable, of} from "rxjs";
import {Chunk} from "./chunk/chunk";
import {map} from "rxjs/operators";
import {
  animate,
  animation,
  AnimationBuilder,
  AnimationFactory,
  state,
  style,
  trigger,
  useAnimation
} from "@angular/animations";
import {DOCUMENT} from "@angular/common";

export const myAnimation = animation([
  style({
    color: 'blue',
    opacity: 1
  }),
  animate(
    "{{ timings }}",
    style({
      color: 'red',
      opacity: 0.5
    }),
  ),
]);

@Directive({selector: 'chunk'})
export class ChunkDirective {
  @Input() id!: string;
}

@Component({
  selector: 'app-lyric-engine',
  templateUrl: './lyric-engine.component.html',
  styleUrls: ['./lyric-engine.component.scss'],
  animations: [
    // trigger('textHighlight', [
    //   state('highlight', style({
    //     opacity: 1,
    //     color: 'yellow'
    //   })),
    //   state('plain', style({
    //     opacity: 0.2,
    //     color: 'white'
    //   }))
    // ])
  ]
})
export class LyricEngineComponent implements OnInit {

  @Input() audio_filepath: string;
  @Input() lyric_filepath: string;

  @ViewChildren(ChunkDirective) viewChildren!: QueryList<ChunkDirective>;

  shouldHighlight: boolean = true;

  startTime: number = 0;
  millisCounter: number = 0;

  lyrics: Observable<Chunk[][] | null>;
  lyricAnimations: Map<string, AnimationFactory>;

  i: number = 0;
  j: number = 0;
  x = 5000;
  y = 5000;

  constructor(
    private http: HttpClient,
    private animationBuilder: AnimationBuilder,

  ) {
    this.audio_filepath = '';
    this.lyric_filepath = '';
    this.lyrics = of([]);
    this.lyricAnimations = new Map();
  }

  toggleHighlight(): void {
    this.shouldHighlight = !this.shouldHighlight;
    // this.viewChildren.forEach((x: ChunkDirective) => {
    //   const animation = this.lyricAnimations.get(x.id);
    //   const player = animation?.create(x.nativeElement);
    //   if (player) {
    //     debugger;
    //     player?.play();
    //   }
    // });
  }

  ngOnInit(): void {
    this.lyrics = this.loadLyrics(this.audio_filepath);
    this.startTime = new Date().getTime();
  }

  loadLyrics(lrc_filepath: string): Observable<Chunk[][]> {
    lrc_filepath = 'assets/inter-we-are-here.lrc';
    return this.http.get(lrc_filepath, {
      context: new HttpContext().set(IS_ASSETS_TOKEN, true),
      responseType: 'text',
    }).pipe(
      map((text) => {
        const lyrics: Chunk[][] = [];
        const lines = text.split('\n');

        lines.forEach((l: string) => {
          const chunks_meta: { time_marker: number; content: string }[] = [];
          const pairs = l.split(/[\[<]/);
          pairs.forEach((time_word) => {
            let pair = time_word.trim().split(/>\s|]\s/);
            if(pair.length <= 1) {
              console.warn(`Found an invalid pair when parsing .lrc file: [${pair}]`);
              return; // skip current iter in foreach
            }
            chunks_meta.push({
              time_marker: this.parseToMilliseconds(pair[0]),
              content: pair[1],
            });
          });

          if (pairs.length <= 1) {
            return; // exists current forEach iteration not the function
          }

          const chunks: Chunk[] = [];
          for (let i = 0; i < chunks_meta.length - 1; i++){
            chunks.push({
              time_marker: chunks_meta[i].time_marker,
              frame_length: (chunks_meta[i+1].time_marker - chunks_meta[i].time_marker),
              content: chunks_meta[i].content
            });
          }
          // Need to push the last word
          const marker = chunks_meta[chunks_meta.length-1].time_marker;
          const frame_length = 0;
          chunks.push({
            time_marker: marker,
            frame_length: 0,
            content: chunks_meta[chunks_meta.length-1].content,
          })
          lyrics.push(chunks);
          this.lyricAnimations.set(`chunk-${marker}`, this.animationBuilder.build([
            useAnimation(myAnimation, {
              params: {
                timings: `${marker}ms ${frame_length}ms`
              }
            })
          ]))
        });
        return lyrics;
      }),
    );
  }

  parseToMilliseconds(time: string): number {
    if(!time || time === '') {
      console.warn(`Tried to parse invalid time string to milliseconds: ${time}`);
      return 0;
    }

    // Example time: '01:53.241' = 1 minutes 53 seconds 241 millis
    const trio = time.split(/[.:]/);
    if(trio.length <= 2) {
      console.warn(`Tried to parse invalid time format: ${trio}`);
      return 0;
    }

    return parseInt(trio[0]) * 60000 + parseInt(trio[1]) * 1000 + parseInt(trio[2]);
  }

  onAnimationDone($event: AnimationEvent | any) {
    // console.log($event)
  }

  // onAnimationEvent(event: AnimationEvent) {
  //   console.log(event.elapsedTime)
  // }
  get textHighlightDef(): any {
    const obj = {
      value: this.shouldHighlight ? 'highlight' : 'plain',
      // params: {
      //   delay: this.x, animationLength: this.y, color: 'blue'
      // }
    };
    // console.log(obj);
    return obj;
  }
}
