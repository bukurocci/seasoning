
const createStack = (maxSize = 1024) => {
  const stack = [];

  const size = () => stack.length;

  const pop = () => {
    if(empty()) {
      throw new Error('the stack is empty');
    }

    return stack.pop();
  };

  const push = (value) => {
    if(stack.length === maxSize) {
      throw new Error('the stack is full');
    }

    stack.push(value);
  };

  const empty = () => size() === 0;

  const full = () => size() === maxSize;

  const peek = () => {
    if(empty()) {
      throw new Error('the stack is empty');
    }

    return stack[size() - 1];
  };

  return {
    push,
    pop,
    peek,
    size,
    empty,
    full
  }
};

const nodeProcessedStack = createStack(1024);

export { nodeProcessedStack };
