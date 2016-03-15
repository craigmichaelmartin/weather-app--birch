// A sad and unfortunately necessary hack for using bootstrap.
// Rationale: Bootstrap is not written as a module and needs jQuery
// in the global scope. This leaks it into the global scope.
// What is interesting, I first tried to leak it in main.js
// after I imported it, but es6 import statements are hoisted,
// so the bootstrap import statement was hoisted and executed
// before the I could leak jQuery into the global scope.

window.$ = window.jQuery = require('jquery');
