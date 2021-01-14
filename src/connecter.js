import { nodeProcessedStack } from './internals/nodeProcessStack';

export function createConnecter() {
  const targetNode = nodeProcessedStack.peek();

  if (!targetNode) {
    throw new Error('invalid calls. createConnecter must be called in top level of functional component');
  }

  const connect = (elements, componentFactory, props) => {
    componentFactory(elements, props);
  };

  const disconnect = () => {
    targetNode.schedulesDisconnection = true;
  };

  return {
    connect,
    disconnect
  };
}
