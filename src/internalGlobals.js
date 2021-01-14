let _activeComponent = null;

export const activeComponent = {
  set component(component) {
    _activeComponent = component;
  },
  get component() {
    return _activeComponent;
  }
};

export const lifeCycleHandlerOwnerMap = new Map();
