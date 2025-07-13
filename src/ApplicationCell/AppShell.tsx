import clsx from 'clsx';
import { ReactNode } from 'react';

type AppShellProps = {
  header?: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
};

export function AppShell(props: AppShellProps) {
  const { header, navbar, footer, children, padding = 'md', className } = props;

  return (
    <div className={clsx('AnarAppShell', className)}>
      {header && <header className='AnarAppShellHeader'>{header}</header>}

      <div className='AnarAppShellBody'>
        {navbar && <aside className='AnarAppShellNavbar'>{navbar}</aside>}
        <main className={clsx('AnarAppShellMain', `padding-${padding}`)}>
          {children}
        </main>
      </div>

      {footer && <footer className='AnarAppShellFooter'>{footer}</footer>}
    </div>
  );
}
