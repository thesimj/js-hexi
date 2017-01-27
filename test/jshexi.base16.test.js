/**
 * Created by Mykola Bubelich
 * 2017-01-19.
 */

import test from 'tape'
import JSHexi from '../src/jshexi'

const verter = {
  in: [
    'Hello world',
    'Hello world (｡◕‿◕｡)'
  ],
  out: [
    '48656c6c6f20776f726c64',
    '00480065006c006c006f00200077006f0072006c006400200028ff6125d5203f25d5ff610029'
  ]
}

/**
 * Text to Base16 (hex)
 */

// ENCODE //
test('Base16: Non unicode string should be converted to proper base16 string', tape => {
  const bytes = JSHexi.toBytes(verter.in[0], false)
  const result = JSHexi.toBase16(bytes)

  tape.equal(result, verter.out[0])

  tape.end()
})

test('Base16: Unicode string should be converted to proper base16 string', tape => {
  const bytes = JSHexi.toBytes(verter.in[1])
  const result = JSHexi.toBase16(bytes)

  tape.equal(result, verter.out[1])

  tape.end()
})

// DECODE //
test('Base16: Base16 string should be converted to proper non unicode string', tape => {
  const bytes = JSHexi.fromBase16(verter.out[0])
  const result = JSHexi.fromBytes(bytes, false)

  tape.equal(result, verter.in[0])

  tape.end()
})

test('Base16: Base16 string should be converted to proper unicode string', tape => {
  const bytes = JSHexi.fromBase16(verter.out[1])
  const result = JSHexi.fromBytes(bytes)

  tape.equal(result, verter.in[1])

  tape.end()
})
