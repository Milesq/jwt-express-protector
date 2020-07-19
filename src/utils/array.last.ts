function last() {
  return this[this.length - 1];
}

Array.prototype.last = last;
export { last };
