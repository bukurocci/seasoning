import { currentEffect } from './internals/currentEffect';

export function effect(effectFunction) {
  currentEffect.effect = effectFunction;
  effectFunction();
  currentEffect.effect = null;
}
