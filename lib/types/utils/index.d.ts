declare function getTemplate(): Record<string, any>;
declare function throttle<C, T extends unknown[]>(fn: (this: C, ...args: T) => void, delay?: number, immediate?: boolean): (this: C, ...args: T) => void;
export { getTemplate, throttle };
