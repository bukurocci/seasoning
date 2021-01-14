import { effect } from './effect';

export function computed(computeFunction) {
  let value;

  effect(() => {
    value = computeFunction();
  });

  return {
    unwrap() {
      return value;
    }
  }
}
