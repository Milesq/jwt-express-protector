import { last } from '../src/utils/'

describe('functions', () => {
  it('Array.last works', () => {
    expect(last.call([1, 2, 3, 4])).toBe(4)
    expect(last.call([256, 'foo'])).toBe('foo')
    expect(last.call([])).toBeUndefined()
  })
})
