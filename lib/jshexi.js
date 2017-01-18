"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (c) 2017, Bubelich Mykola (https://www.bubelich.com)
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

var JSHexi = function () {
    function JSHexi() {
        _classCallCheck(this, JSHexi);
    }

    _createClass(JSHexi, null, [{
        key: "fromBase16",
        value: function fromBase16(data) {
            var unicode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return null;
        }

        /**
         * Convert string to Base16 (hex) string
         *
         * @param {String} data
         * @param {Boolean} unicode
         * @return {String}
         */

    }, {
        key: "toBase16",
        value: function toBase16(data) {
            var unicode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var con = "",
                carry = void 0;
            var len = unicode ? 4 : 2;
            var prefix = "0".repeat(len);

            if (!unicode && JSHexi._isUnicodeString(data)) {
                throw new Error("Unicode char in data!");
            }

            for (var i = 0; i < data.length; i++) {
                carry = data.charCodeAt(i).toString(16);
                con += (prefix + carry).substr(-1 * len, len);
            }

            return con;
        }

        /**
         * Checks if unicode chars in data string
         *
         * @param {String} data
         * @return {boolean}
         * @private
         */

    }, {
        key: "_isUnicodeString",
        value: function _isUnicodeString(data) {
            for (var i = 0; i < data.length; i++) {
                if (data.charCodeAt(i) > 0xFF) {
                    return true;
                }
            }

            return false;
        }
    }]);

    return JSHexi;
}();

var x = JSHexi.toBase16("09123☺", true);

console.log("to base16: ", x);

exports.default = JSHexi;
// exports.default = JSHexi;