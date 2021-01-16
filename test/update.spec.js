import { update, createState } from '../src/';

test('runs update function when state is updated', () => {
  const a = createState(5);
  const b = createState(4);
  let result = 0;

  update(() => {
    result = a.unwrap() + b.unwrap();
  });

  expect(result).toBe(9);

  b.update(10);

  expect(result).toBe(15);
});

test('do not update the state in update function', () => {
  const a = createState(5);
  const b = createState(4);
  const c = createState(0);

  expect(() => {
    update(() => {
      c.update(a.unwrap() + b.unwrap());
    });
  }).toThrowError('Do not update the state in update/computed function.');
});
