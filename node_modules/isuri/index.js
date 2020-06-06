'use strict';

var rfc3986 = require('rfc-3986');

// See: https://github.com/hapijs/hoek/blob/f62961d3d07aca68ab11480893e6e80a421914b4/lib/index.js#L783-L787
function escapeRegex(string) {
    // Escape ^$.*+-?=!:|\/()[]{},
    return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
}

var internals = {
    Uri: {
        createUriRegex: function (options) {
            options = options || {};

            if (typeof options !== 'object' || Array.isArray(options)) {
                throw new Error('options must be an object');
            }

            var customScheme = '';

            // If we were passed a scheme, use it instead of the generic one
            if (options.scheme) {
                if (!Array.isArray(options.scheme)) {
                    options.scheme = [options.scheme];
                }

                if (options.scheme.length <= 0) {
                    throw new Error('scheme must have at least 1 scheme specified');
                }

                for (var i = 0; i < options.scheme.length; ++i) {
                    var currentScheme = options.scheme[i];

                    if (!(currentScheme instanceof RegExp || typeof currentScheme === 'string')) {
                        throw new Error('scheme must only contain Regular Expressions or Strings');
                    }

                    // Add OR separators if a value already exists
                    customScheme = customScheme + (customScheme ? '|' : '');

                    // If someone wants to match HTTP or HTTPS for example then we need to support both RegExp and String so we don't escape their pattern unknowingly.
                    if (currentScheme instanceof RegExp) {
                        customScheme = customScheme + currentScheme.source;
                    } else {
                        if (!/[a-zA-Z][a-zA-Z0-9+-\.]*/.test(currentScheme)) {
                            throw new Error('scheme at position ' + i + ' must be a valid scheme');
                        }
                        customScheme = customScheme + escapeRegex(currentScheme);
                    }
                }

            }

            // Have to put this in a non-capturing group to handle the OR statements
            var scheme = '(?:' + (customScheme || rfc3986.scheme) + ')';

            /**
             * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
             *
             * OR
             *
             * relative-ref = relative-part [ "?" query ] [ "#" fragment ]
             */
            return new RegExp('^(?:' + scheme + ':' + rfc3986.hierPart + ')(?:\\?' + rfc3986.query + ')?(?:#' + rfc3986.fragment + ')?$');
        },
        uriRegex: new RegExp(rfc3986.uri)
    }
};

internals.Uri.isValid = function (val) {
    return internals.Uri.uriRegex.test(val);
};

module.exports = {
    createUriRegex: internals.Uri.createUriRegex,

    uriRegex: internals.Uri.uriRegex,
    isValid: internals.Uri.isValid
};