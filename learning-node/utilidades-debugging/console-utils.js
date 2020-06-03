// %s string
// %d numero
// %j json
// console.log("Un %s y un %s", "perrito", "gatito");

// console.info("Hola mundo");
// console.warn("hola mundo hp");

// console.assert(42 === "42");
// console.assert(42 === 42);

// console.trace("hola");

const util = require("util");
const debuglog = util.debuglog("foo");

debuglog("hello from foo");