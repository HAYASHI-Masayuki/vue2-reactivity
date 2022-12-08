import { expect, test } from 'vitest'

const makePropertiesGetter = <T extends object>(o: T): T => {
  const p = { ...o }

  for (const key in p) {
    const value = p[key]
    delete p[key]

    Object.defineProperty(p, key, {
      get() {
        return value
      },
    })
  }

  return p
}

test('make properties getter', () => {
  const o = { a: 234 }
  const r = makePropertiesGetter(o)

  expect(o.a).toBe(234)
  expect(Object.getOwnPropertyDescriptor(o, 'a')).toHaveProperty('value')
  expect(Object.getOwnPropertyDescriptor(o, 'a')).not.toHaveProperty('get')

  expect(r.a).toBe(234)
  expect(Object.getOwnPropertyDescriptor(r, 'a')).not.toHaveProperty('value')
  expect(Object.getOwnPropertyDescriptor(r, 'a')).toHaveProperty('get')
})
