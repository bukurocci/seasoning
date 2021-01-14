import { createState } from './createState';

export function createContext(stateMap) {
  const context = {};

  Object.defineProperty(context, 'isContext', {});

  Object.keys(stateMap).reduce((context, key) => {
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
  }, context);

  return context;
}
