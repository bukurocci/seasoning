import { currentUpdate } from './internals/currentUpdate';

export function update(updateHandler) {
  currentUpdate.handler = updateHandler;
  updateHandler();
  currentUpdate.handler = null;
}
