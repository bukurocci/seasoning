import { createState } from '../src';
import { isState } from '../src/state';

test('set the value on initialize', () => {
  const state = createState(0);

  expect(state.unwrap()).toBe(0);
});

test('update the value', () => {
  const state = createState(0);

  state.update(1);

  expect(state.unwrap()).toBe(1);
});

test('determines whether value is State instance', () => {
  const state = createState(0);
  const notState = {};

  expect(isState(notState)).toBe(false);
  expect(isState(state)).toBe(true);
});
