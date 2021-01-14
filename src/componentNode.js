
class Node {
  constructor() {
    this.parent = null;
    this.children = [];
    this.schedulesDisconnection = false;
  }
}

export function createComponentNode() {
  return new Node();
}
