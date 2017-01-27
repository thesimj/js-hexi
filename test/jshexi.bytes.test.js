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
    new Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
    new Uint8Array([0, 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 32, 0, 119, 0, 111, 0, 114, 0, 108, 0, 100, 0, 32, 0, 40, 255, 97, 37, 213, 32, 63, 37, 213, 255, 97, 0, 41])
  ]
}

/**
 * Text to bytes
 */

// ENCODE //
test('Bytes: Non unicode string should be converted to proper byte array', tape => {
  tape.deepEquals(JSHexi.toBytes(verter.in[0], false), verter.out[0])

  tape.end()
})

test('Bytes: Unicode string should be converted to proper byte array', tape => {
  tape.deepEquals(JSHexi.toBytes(verter.in[1], true), verter.out[1])

  tape.end()
})

// DECODE
test('Bytes: Bytes should be decoded to non unicode string', tape => {
  tape.equal(JSHexi.fromBytes(verter.out[0], false), verter.in[0])

  tape.end()
})

test('Bytes: Bytes should be decoded to unicode string', tape => {
  tape.equal(JSHexi.fromBytes(verter.out[1]), verter.in[1])

  tape.end()
})

// ERRORS
test('Bytes: Convert unicode string to non unicode bytes should throws error', tape => {
  tape.throws(() => {
    JSHexi.toBytes(verter.in[1], false)
  }, /Unicode char in data!/)

  tape.end()
})

test('Bytes: Convert unicode string to non unicode bytes should throws error', tape => {
  tape.throws(() => {
    JSHexi.fromBytes(null, false)
  }, /Data not byte array!/)

  tape.end()
})

