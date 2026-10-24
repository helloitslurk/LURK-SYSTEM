export function createKeyedWriteQueue(write) {
  const queues = new Map();
  return function enqueue(key, value) {
    const previous = queues.get(key) || Promise.resolve();
    const current = previous.catch(() => false).then(() => write(key, value));
    queues.set(key, current);
    current.then(
      () => { if (queues.get(key) === current) queues.delete(key); },
      () => { if (queues.get(key) === current) queues.delete(key); }
    );
    return current;
  };
}
