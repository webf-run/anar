export interface AnarStyleProps {
  margin?: string;
  marginStart?: string;
  marginEnd?: string;
  marginTop?: string;
  marginBottom?: string;
  marginX?: string;
  marginY?: string;

  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;

  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: number;
  top?: string;
  bottom?: string;
  start?: string;
  end?: string;
  left?: string;
  right?: string;
}

export function toStyle() {}
