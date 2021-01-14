import { activeComponent } from './internalGlobals';
import { mapStateToContext } from './mapStateToContext';

export function createConnecter() {
  const targetComponent = activeComponent.component;

  if (!targetComponent) {
    throw new Error('invalid calls. createConnecter must be called in top level of functional component');
  }

  const connect = (name, elements, factory, props) => {
    if (!factory.name) {
      factory.name = name;
    }

    const componentStates = elements.map((element) => {
      return factory(element, props);
    });

    const prevComponent = activeComponent.component;
    activeComponent.component = targetComponent;
    mapStateToContext(name, componentStates);

    activeComponent.component = prevComponent;
  };

  const disconnect = (name) => {
    const prevComponent = activeComponent.component;
    activeComponent.component = targetComponent;
    mapStateToContext(name, undefined);
    activeComponent.component = prevComponent;
  };

  return {
    connect,
    disconnect
  };
}
