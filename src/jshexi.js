/*
 * Copyright (c) 2017, Bubelich Mykola
 * https://www.bubelich.com
 *
 * (｡◕‿‿◕｡)
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/** Base 16 Alphabet **/
const _JENCB16 = "0123456789abcdef";
const _JDECB16 = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
  2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1,
  -1, -1, -1, 10, 11, 12, 13, 14, 15, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15
];

/** Base 64 Alphabet **/
const _JENCB64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const _JDECB64 = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, 62, -1, 63, 52, 53, 54,
  55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];

/**
 *
 */
class JSHexi {
  /**
   * Decode input string in Base16 to array of byte.
   *
   * @param {String} data
   * @return {Uint8Array}
   */
  static fromBase16(data) {
    JSHexi._checkLength(data.length, 2);

    const result = new Uint8Array(data.length >> 1);
    let code_a, code_b;

    for (let i = 0; i < result.length; i++) {
      code_a = data.charCodeAt(2 * i);
      code_b = data.charCodeAt(2 * i + 1);

      result[i] = _JDECB16[code_a] << 4 | _JDECB16[code_b];
    }

    return result;
  }

  /**
   * Decode input string in Base64 to array of byte.
   *
   * @param {String} data
   * @return {Uint8Array}
   */
  static fromBase64(data) {

    let dlen = data.length;
    let rlen = dlen * 3 / 4;

    if (dlen % 2 == 0) {
      if (data[dlen - 1] === "=") {
        dlen--;
        rlen--;
      }

      if (data[dlen - 1] === "=") {
        dlen--;
        rlen--;
      }
    }

    const result = new Uint8Array(rlen);
    let dcounter = 0, rcounter = 0, buff, code_a, code_b, code_c, code_d;

    while (dlen >= 4) {

      code_a = data.charCodeAt(dcounter++);
      code_b = data.charCodeAt(dcounter++);
      code_c = data.charCodeAt(dcounter++);
      code_d = data.charCodeAt(dcounter++);

      buff = _JDECB64[code_a] << 18 |
        _JDECB64[code_b] << 12 |
        _JDECB64[code_c] << 6 |
        _JDECB64[code_d];

      result[rcounter++] = (buff >> 16) & 0xFF;
      result[rcounter++] = (buff >> 8) & 0xFF;
      result[rcounter++] = buff & 0xFF;

      dlen -= 4;
    }

    // Padding stage //
    switch (rlen - rcounter) {
      case 2: {
        buff = _JDECB64[data.charCodeAt(dcounter++)] << 18 |
          _JDECB64[data.charCodeAt(dcounter++)] << 12 |
          _JDECB64[data.charCodeAt(dcounter++)] << 6;

        result[rcounter++] = (buff >> 16) & 0xFF;
        result[rcounter++] = (buff >> 8) & 0xFF;

        break;
      }

      case 1 : {
        buff = _JDECB64[data.charCodeAt(dcounter++)] << 18 |
          _JDECB64[data.charCodeAt(dcounter++)] << 12;

        result[rcounter++] = (buff >> 16) & 0xFF;

        break;
      }
    }

    return result;
  }

  /**
   * Encode input byte array as Base64 string
   *
   * @param {Uint8Array} data
   * @return {String}
   */
  static toBase64(data) {
    JSHexi._checkForUint8Array(data);

    let dlen = data.length;
    let result = "", buff, dcounter = 0;

    while (dlen >= 3) {
      buff = data[dcounter++] << 16 | data[dcounter++] << 8 | data[dcounter++];

      result += _JENCB64[buff >> 18 & 0x3F];
      result += _JENCB64[buff >> 12 & 0x3F];
      result += _JENCB64[buff >> 6 & 0x3F];
      result += _JENCB64[buff & 0x3F];

      dlen -= 3;
    }

    // Padding stage //
    switch (dlen) {
      case 2 : {
        buff = data[dcounter++] << 16 | data[dcounter++] << 8;
        result += _JENCB64[buff >> 18 & 0x3F];
        result += _JENCB64[buff >> 12 & 0x3F];
        result += _JENCB64[buff >> 6 & 0x3F];
        result += "=";

        break;
      }

      case 1 : {
        buff = data[dcounter++] << 16;
        result += _JENCB64[buff >> 18 & 0x3F];
        result += _JENCB64[buff >> 12 & 0x3F];
        result += "==";

        break;
      }
    }

    return result;
  }

  /**
   * Encode input byte array as Base16 string
   *
   * @param {Uint8Array} data
   * @return {String}
   */
  static toBase16(data) {
    JSHexi._checkForUint8Array(data);

    let result = "";

    for (let i = 0; i < data.length; i++) {
      result = result.concat(_JENCB16[data[i] >>> 4], _JENCB16[data[i] & 0x0F]);
    }

    return result;
  }

  /**
   * Checks if unicode chars in data string
   *
   * @param {String} data
   * @return {boolean}
   */
  static isUnicodeString(data) {
    for (let i = 0; i < data.length; i++) {
      if (data.charCodeAt(i) > 0xFF) {
        return true;
      }
    }

    return false;
  }

  /**
   * Convert string data to bytes
   *
   * @throws {Error} when data contain unicode char, but unicode flag set to false
   * @param {String} data
   * @param {Boolean} unicode
   * @return {Uint8Array}
   */
  static toBytes(data, unicode = true) {
    JSHexi._checkForUnicode(data, unicode);

    const buffer = new Uint8Array(unicode ? data.length << 1 : data.length);
    let i, code;

    for (i = 0; i < data.length; i++) {
      code = data.charCodeAt(i);

      if (unicode) {
        buffer[i * 2] = (code >> 8) & 0xFF;
        buffer[i * 2 + 1] = code & 0xFF;
      } else {
        buffer[i] = code;
      }
    }

    return buffer;
  }

  /**
   * Convert bytes to string, can be unicode string
   *
   * @param {Uint8Array} data
   * @param {Boolean} unicode
   */
  static fromBytes(data, unicode = true) {
    JSHexi._checkForUint8Array(data);

    const udata = (unicode) ? new Uint16Array(data.length / 2) : data;

    if (unicode) {
      for (let i = 0; i < udata.length; i++) {
        udata[i] = ((data[2 * i] << 8) | (data[2 * i + 1])) & 0xFFFF;
      }
    }

    return String.fromCodePoint(...udata);
  }

  /**
   * Check input string for unicode char
   * If found unicode char, throw error
   *
   * @throws {Error}
   * @param {String} data
   * @param {Boolean} unicode
   * @private
   */
  static _checkForUnicode(data, unicode = true) {
    if (!unicode && JSHexi.isUnicodeString(data)) {
      throw new Error("Unicode char in data!");
    }
  }

  /**
   * Check length by module
   *
   * @param length
   * @param mod
   * @private
   */
  static _checkLength(length, mod) {
    if (length % mod !== 0) {
      throw new Error("Data string has wrong length!");
    }
  }

  /**
   * Check for input if this byte array.
   * If not, throws Error
   *
   * @throws {Error}
   * @param {*} data
   * @private
   */
  static _checkForUint8Array(data) {
    if (!(data instanceof Uint8Array)) {
      throw new Error("Data not byte array!");
    }
  }
}

/** Exports **/
export default JSHexi;
