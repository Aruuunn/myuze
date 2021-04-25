import React, { ReactElement } from 'react';

export function templateFactory<Props>(
  Component: (props: Props) => ReactElement,
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (props: Props): ReactElement => <Component {...props} />;
}

export function storyFactory<Props>(
  Component: (props: Props) => ReactElement,
  props: Props,
): (props: Props) => ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Template = templateFactory(Component);
  const CloneComponent = Template.bind({});
  (CloneComponent as Function & { args?: Props }).args = props;

  return CloneComponent;
}
