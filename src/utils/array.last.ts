function last<T>(this: Array<T>): T {
  return this[this.length - 1];
}

Array.prototype.last = last;
export { last };
