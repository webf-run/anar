export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type FlexStrategy =
  | 'equal' // flex: 1 1 0       → Equal space for all
  | 'fixed'; // flex: 0 0 auto    → Fixed size (no grow/shrink)

export type PlaceContent =
  | `${AlignContent}`
  | `${AlignContent} ${JustifyContent}`;

export type JustifyContent =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right';

export type AlignItems =
  | 'stretch'
  | 'center'
  | 'baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';

export type AlignContent =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'start'
  | 'end'
  | 'baseline';

export type AlignSelf =
  | 'auto'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';
