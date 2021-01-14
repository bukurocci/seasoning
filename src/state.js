import { currentEffect } from './internals/currentEffect';

const effectDependenciesMap = new Map();

class State {
  constructor(value) {
    this._value = value;
  }

  unwrap() {
    const effect = currentEffect.effect;

    if(!effect) {
      return this._value;
    }

    let effectDeps = effectDependenciesMap.get(this);

    if(!effectDeps) {
      effectDeps = new Set();
      effectDependenciesMap.set(this, effectDeps);
    }

    effectDeps.add(effect);

    return this._value;
  }

  update(value) {
    const effect = currentEffect.effect;

    if(effect) {
      throw new Error('Do not update the state in effect/computed function.');
    }

    this._value = value;

    const effectDeps = effectDependenciesMap.get(this);

    if(!effectDeps) {
      return;
    }

    effectDeps.forEach((effect) => {
      effect();
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
