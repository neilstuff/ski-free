/*
 *
 * For the browser ONLY
 *
 */

var __this = this;

function require(name) {

    var indexToGoFrom = name.lastIndexOf('/');
    name = name.substring(indexToGoFrom + 1);
    return __this[name];

}