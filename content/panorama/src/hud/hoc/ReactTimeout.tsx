import React from "react";
import ReactTimeout from "react-timeout";

export interface ReactTimeoutProps {
  setTimeout: Function;
  clearTimeout: Function;
  setInterval: Function;
  clearInterval: Function;
  setImmediate: Function;
  clearImmediate: Function;
  requestAnimationFrame: Function;
  cancelAnimationFrame: Function;
}

export default function withReactTimeout<T extends ReactTimeoutProps = ReactTimeoutProps>(WrappedComponent: React.ComponentType<T>) {
  const ReactTimeoutComponent = ReactTimeout(WrappedComponent);
  const ComponentWithExtendedProps = (props: Omit<T, keyof ReactTimeoutProps>) => {
    return <ReactTimeoutComponent {...(props as T)} />;
  };
  return ComponentWithExtendedProps;
} 
