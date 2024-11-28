import { Options, render } from '@react-email/components';

export const renderTemplate = (
  component: React.ReactElement,
  options?: Options,
) => {
  return render(component, options);
};
