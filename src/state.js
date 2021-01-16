import { currentUpdate } from './internals/currentUpdate';

const updateDependenciesMap = new Map();

class State {
  constructor(value) {
    this._value = value;
  }

  unwrap() {
    const handler = currentUpdate.handler;

    if (!handler) {
      return this._value;
    }

    let updateDeps = updateDependenciesMap.get(this);

    if (!updateDeps) {
      updateDeps = new Set();
      updateDependenciesMap.set(this, updateDeps);
    }

    updateDeps.add(handler);

    return this._value;
  }

  update(value) {
    const handler = currentUpdate.handler;

    if (handler) {
      throw new Error('Do not update the state in update/computed function.');
    }

    this._value = value;

    const updateDeps = updateDependenciesMap.get(this);

    if (!updateDeps) {
      return;
    }

    updateDeps.forEach((handler) => {
      handler();
    });
  }
}

export function isState(value) {
  return value instanceof State;
}

export function createState(value) {
  if (isState(value)) {
    return value;
  }

  return new State(value);
}
