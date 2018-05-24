const { log } = require('./utils');

let text = "𠮷"



/* console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // ""
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
 */


let text2 = "𠮷a"


/* console.log(text2.charCodeAt(0));    // 55362
console.log(text2.charCodeAt(1));    // 57271
console.log(text2.charCodeAt(2));    // 97
console.log(text2.codePointAt(0));   // 134071
console.log(text2.codePointAt(1));   // 57271
console.log(text2.codePointAt(2));   // 97
 */

function is32Bit(c) {   
  return c.codePointAt(0) > 0xFFFF;
}         

// console.log(is32Bit('𠮷'))
// console.log(is32Bit('a'))




function passthru (literals, ...substitutions) {
  console.log(literals);
  console.log(substitutions);

  // return 'tst'
  // return {}
} 

let count = 10,
    price = 0.25,
    message = passthru`${count} items const $${(count * price).toFixed(2)}`;


log (message);


  