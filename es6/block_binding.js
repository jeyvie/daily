const { log } = require('./utils');

log(a);

// log (b);

{
  var a = 1;
  let b = 2;
}

log(a);


function getValue(condition) {
  if (condition) {
    var value = "blue";
    // other code
    return value;
  } else {
    // value exists here with a value of undefined
    return null;
  }
  // value exists here with a value of undefined
}

function getValue(condition) {
  if (condition) {
    let value = "blue";
    // other code
    return value;
  } else {
    // value doesn't exist here
    return null;
  }
  // value doesn't exist here
}

var count = 30;

// let count = 30; // error


const maxItems = 30;



// const name;

// log(typeof person)

{
  // log(typeof person)
  let person = 'xiaom'
}


var funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i);
  });
}

funcs.forEach(function (func) {
  func();     // outputs 0, then 1, then 2, up to 9
})


var funcs = [];
// throws an error after one iteration
// for (const i = 0; i < 10; i++) {
//   funcs.push(function () {
//     console.log(i);
//   });
// }

var funcs = [],
  object = {
    a: true,
    b: true,
    c: true
  };
// doesn't cause an error
for (const key in object) {
  funcs.push(function () {
    console.log(key);
  });
}
funcs.forEach(function (func) {
  func();     // outputs "a", then "b", then "c"
});