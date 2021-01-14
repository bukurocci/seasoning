import { createState } from './state';

export function isContext(value) {
  return Object.prototype.hasOwnProperty.call(value, 'isState') && value.__isContext;
}

export function createContext(stateMap) {
  const context = {};

  Object.defineProperty(context, '__isContext', {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false
  });

  return Object.keys(stateMap).reduce((context, key) => {
    const state = createState(stateMap[key]);

    Object.defineProperties(context, {
      ['__' + key]: {
        value: state,
        configurable: false,
        enumerable: false,
        writable: false
      },
      [key]: {
        get() {
          return this['__' + key].unwrap();
        },
        set(value) {
          this['__' + key].update(value);
        },
        configurable: false,
        enumerable: true
      }
    });

    return context;
  }, context);
}
