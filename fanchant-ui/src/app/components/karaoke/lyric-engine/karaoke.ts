import {
  trigger,
  transition,
  animate,
  style,
  state,
  AnimationTriggerMetadata,
  query,
  animation
} from '@angular/animations'


export const fillAnimation = animation([
  style({
    opacity: 1,
    color: '{{color}}',
  }),
  animate('{{ timings }}')
]);



export const KaraokeAnimation: {
  readonly karaoke: AnimationTriggerMetadata,
} = {
  karaoke: trigger('textHighlight', [
    state('highlight', style({
      opacity: 1,
      color: '{{color}}',
    }), {
      params: {
        color: 'red'
      }
    }),
    transition('* => highlight',
      animate('3000ms')
    //   [
    //   query(".karatest",[
    //     style({opacity: 0}),
    //     animate(
    //       "{{animationLength}}ms {{delay}}ms",
    //       style({color: 'yellow', opacity: 1}),
    //     )
    //   ], {
    //     optional: true,
    //     params: {
    //       delay: 0,
    //       animationLength: 0,
    //     }
    //   }),
    // ]
    ),
    transition('* => visible', animate('300ms ease-in')),
    transition('visible => *', animate('300ms ease-in'))
  ])
};
