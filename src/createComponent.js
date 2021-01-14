import { activeComponent } from './internalGlobals';

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

const prepareInitialize = () => {};

const finishInitialize = () => {};

export function createComponent(functionalComponent) {
  const factory = (el, props) => {
    const domRefs = findDomRefs(el);
    functionalComponent(el, domRefs, props);
  };

  return factory;
}
