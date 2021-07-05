import {Directive, ElementRef, Input} from '@angular/core';
import {Chunk} from "../components/karaoke/lyric-engine/chunk/chunk";
import {animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style} from "@angular/animations";

@Directive({
  selector: '[appKaraokeChunk]'
})
export class KaraokeChunkDirective {
  player: AnimationPlayer | undefined;

  @Input() chunk: Chunk = {content: "", frame_length: 0, time_marker: 0};
  @Input()
  set highlight(highlight: boolean) {
    if (this.player) {
      this.player.destroy();
    }

    const metadata = highlight ? this.fadeIn() : this.fadeOut();
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);

    player.play();
  }

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  private fadeIn(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate(
        `${this.chunk.time_marker}ms 0ms`,
        style({ opacity: 1 })
      ),
    ];
  }

  private fadeOut(): AnimationMetadata[] {
    return [
      style({ opacity: '*' }),
      animate('400ms ease-in', style({ opacity: 0 })),
    ];
  }

}
