import {AnimationAnimateRefMetadata, AnimationFactory} from "@angular/animations";

export interface Chunk {
  time_marker: number; // millis
  frame_length: number;
  content: string;
  animation?: AnimationFactory;
}
