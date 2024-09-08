import {
  Label,
  ProgressBar as AriaProgressBar,
  ProgressBarProps as AriaProgressBarProps,
} from 'react-aria-components';

import './ProgressBar.css';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar {...props} isIndeterminate>
      {({ percentage, valueText }) => (
        <>
          <Label>{label}</Label>
          <span className='value'>{valueText}</span>
          <div className='bar'>
            <div className='fill' style={{ width: percentage + '%' }} />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
