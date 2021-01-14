import {computed, createState} from '../src/';

test('update the computed value when state is updated', () => {
  const a = createState(1);
  const doubled = computed(() => {
    return a.unwrap() * 2;
  });

  expect(doubled.unwrap()).toBe(2);

  a.update(10);

  expect(doubled.unwrap()).toBe(20);
});

test('raise error when the state is updated in computed function', () => {
  const a = createState(1);

  expect(() => {
    computed(() => {
      a.update(10)
      return a.unwrap() * 2;
    })
  }).toThrowError('Do not update the state in effect/computed function.')
});
