import { update } from './update';

export function computed(computeFunction) {
  let value;

  update(() => {
    value = computeFunction();
  });

  return {
    unwrap() {
      return value;
    }
  };
}
