/**
 * Created by Mykola Bubelich
 * 2017-01-19.
 */

import test from "tape";
import JSHexi from "../lib/jshexi";

const verter = {
  in: [
    "one",
    "one-two",
    "one-two-three-four-five",
    "Hello world (｡◕‿◕｡)",
    "Hello world (｡◕‿‿◕｡)",
  ],
  out: [
    "b25l",
    "b25lLXR3bw==",
    "b25lLXR3by10aHJlZS1mb3VyLWZpdmU=",
    "AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=",
    "AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8gPyXV/2EAKQ=="
  ]
};

/**
 * Text to Base64
 */

// ENCODE //
test("Base64: Non unicode string should be converted to proper Base64 string", tape => {
  tape.equal(JSHexi.toBase64(JSHexi.toBytes(verter.in[0], false)), verter.out[0]);
  tape.equal(JSHexi.toBase64(JSHexi.toBytes(verter.in[1], false)), verter.out[1]);
  tape.equal(JSHexi.toBase64(JSHexi.toBytes(verter.in[2], false)), verter.out[2]);

  tape.end();
});

test("Base64: Unicode string should be converted to proper Base64 string", tape => {
  tape.equal(JSHexi.toBase64(JSHexi.toBytes(verter.in[3])), verter.out[3]);
  tape.equal(JSHexi.toBase64(JSHexi.toBytes(verter.in[4])), verter.out[4]);

  tape.end();
});

// DECODE //
test("Base64: Base64 string should be converted to proper non unicode string", tape => {
  tape.equal(JSHexi.fromBytes(JSHexi.fromBase64(verter.out[0]), false), verter.in[0]);
  tape.equal(JSHexi.fromBytes(JSHexi.fromBase64(verter.out[1]), false), verter.in[1]);
  tape.equal(JSHexi.fromBytes(JSHexi.fromBase64(verter.out[2]), false), verter.in[2]);

  tape.end();
});

test("Base64: Base16 string should be converted to proper unicode string", tape => {
  tape.equal(JSHexi.fromBytes(JSHexi.fromBase64(verter.out[3])), verter.in[3]);
  tape.equal(JSHexi.fromBytes(JSHexi.fromBase64(verter.out[4])), verter.in[4]);

  tape.end();
});
