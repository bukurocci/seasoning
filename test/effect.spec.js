import { effect, createState } from '../src/';

test('runs effect function when state is updated', () => {
  const a = createState(5);
  const b = createState(4);
  let result = 0;

  effect(() => {
    result = a.unwrap() + b.unwrap();
  });

  expect(result).toBe(9);

  b.update(10);

  expect(result).toBe(15);
});

test('do not update the state in effect function', () => {
  const a = createState(5);
  const b = createState(4);
  const c = createState(0);

  expect(() => {
    effect(() => {
      c.update(a.unwrap() + b.unwrap());
    });
  }).toThrowError('Do not update the state in effect/computed function.');
});
