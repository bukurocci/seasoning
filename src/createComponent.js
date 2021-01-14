import { createComponentNode } from './componentNode';
import { nodeProcessedStack } from './internals/nodeProcessStack';

const findDomRefs = (el) => {
  const refs = Array.from(el.querySelectorAll('[data-ref]'));
  return refs.reduce((refMap, element) => {
    const refKey = element.dataset.ref;

    if (!refKey) {
      console.error('the value of data-ref cannot be empty.');
      return refMap;
    }

    const parent = element.parentNode;
    while (parent !== element && parent !== null) {
      if ('component' in parent.dataset) {
        break;
      }
    }

    if (parent !== element) {
      return refMap;
    }

    if (!(refKey in refMap)) {
      refMap[refKey] = [];
    }

    refMap[refKey].push(element);
  }, {});
};

const prepareInitialize = () => {
  const node = createComponentNode();
  nodeProcessedStack.push(node);
};

const finishInitialize = () => {
  nodeProcessedStack.pop();
};

export function createComponent(functionalComponent) {
  return (el, props) => {
    const domRefs = findDomRefs(el);
    prepareInitialize();
    functionalComponent(el, domRefs, props);
    finishInitialize();
  };
}
