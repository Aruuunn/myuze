import React, { ReactElement } from 'react';

import AppProvider from '../AppProvider';

export function TestComponent<Props>(
  Component: (props: Props) => ReactElement, props: Props,
): ReactElement {
  return (
    <AppProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </AppProvider>
  );
}
