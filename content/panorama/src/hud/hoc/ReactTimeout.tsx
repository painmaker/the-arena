import React from "react";
import ReactTimeout, { Id, Timer } from "react-timeout";

export interface ReactTimeoutProps {
  setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => Timer;
  clearTimeout: (timer: Timer) => void;
  setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => Id;
  clearInterval: (id: Id) => void;
  setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => Id;
  clearImmediate: (id: Id) => void;
  requestAnimationFrame: (callback: (...args: any[]) => void) => Id;
  cancelAnimationFrame: (id: Id) => void;
}

export default function withReactTimeout<T extends ReactTimeoutProps = ReactTimeoutProps>(WrappedComponent: React.ComponentType<T>) {
  const ReactTimeoutComponent = ReactTimeout(WrappedComponent);
  const ComponentWithExtendedProps = (props: Omit<T, keyof ReactTimeoutProps>) => {
    return <ReactTimeoutComponent {...(props as T)} />;
  };
  return ComponentWithExtendedProps;
} 
