class State {
  static isState(value) {
    return Object.prototype.hasOwnProperty.call(value, 'isState') && value.__isState;
  }

  get __isState() {
    return true;
  }

  constructor(value) {
    this._value = value;
  }

  unwrap() {
    return this._value;
  }

  update(value) {
    this._value = value;
  }
}

export function createState(value) {
  if (State.isState(value)) {
    return value;
  }

  return new State(value);
}
