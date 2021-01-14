import { activeComponent, lifeCycleHandlerOwnerMap } from './internalGlobals';

const createLifecycleHooks = () => {
  return {
    onConnect: [],
    onDisconnect: []
  };
};

export const onConnect = (callback) => {
  const ownerComponent = activeComponent.component;

  if (!lifeCycleHandlerOwnerMap.has(ownerComponent)) {
    lifeCycleHandlerOwnerMap.set(ownerComponent, createLifecycleHooks());
  }

  const hooks = lifeCycleHandlerOwnerMap.get(ownerComponent);
  hooks.onConnect.push(callback);
};

export const onDisconnect = (callback) => {
  const ownerComponent = activeComponent.component;

  if (!lifeCycleHandlerOwnerMap.has(ownerComponent)) {
    lifeCycleHandlerOwnerMap.set(ownerComponent, createLifecycleHooks());
  }

  const hooks = lifeCycleHandlerOwnerMap.get(ownerComponent);
  hooks.onDisconnect.push(callback);
};
