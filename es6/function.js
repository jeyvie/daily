const { log } = require('./utils');

function makeRequest(url, timeout, callback) {
  timeout = (typeof timeout !== "undefined") ? timeout : 2000;
  callback = (typeof callback !== "undefined") ? callback : function () { };
  // the rest of the function
}


function pick(object) {
  let result = Object.create(null);
  // start at the second parameter
  for (let i = 1, len = arguments.length; i < len; i++) {
    result[arguments[i]] = object[arguments[i]];
  }
  return result;
}


let book = {
  title: "Understanding ECMAScript 6",
  author: "Nicholas C. Zakas",
  year: 2016
};
let bookData = pick(book, "author", "year");
console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2016



function pick(object, ...keys) {
  let result = Object.create(null);
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}

// Syntax error: Can't have a named parameter after rest parameters
/* function pick(object, ...keys, last) {
  let result = Object.create(null);
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
} */


let obj = {
  get name() {
    console.log('get name');
    return obj.name
  },

  // Syntax error: Can't use rest param in setter
  set name(value) {
    // do something
    // obj.name = 'ccc'
    Object.defineProperty(obj, 'name', {
      value: value
    })
    console.log('set name');
  },

};

obj.name = 'ddd'

log('----', obj.name)


let anotherObj = {}


/* 
  在  set 里不能设置值，那设置的意义是什么 。
  也许上面的是正确的用法
*/

let settedV;

Object.defineProperty(anotherObj, 'name', {
  set(...value) {
    console.log('anotherObj set', value);
    settedV = value;
  },

  get() {
    console.log('anotherObj get');
  }
})

anotherObj.name = 'ccc'

console.log(anotherObj.name, settedV);



function func(arg, b, c = 2, ...rest) {

}


console.log(func.length)


var doSomething = function doSomethingElse() {
  // empty
};
var person = {
  get firstName() {
    return "Nicholas"
  },
  sayName: function () {
    console.log(this.name);
  }
}
console.log(doSomething.name);      // "doSomethingElse"
console.log(person.sayName.name);   // "sayName"
console.log(person.firstName.name); // "get firstName"





function ChangeProto() {

}

ChangeProto.prototype.greeting = function () {
  log('ChangeProto hi')
}

let anotherProto = {
  greeting: function () {
    log('greeting hi')
  }
}

var instance = new ChangeProto();

instance.greeting();




let person2 = {
  getGreeting() {
    return this.name;
  },
  name: 'person'
};
// prototype is person
let friend = {
  getGreeting() {
    return super.getGreeting() + ", hi!";
  },
  name: 'friend'
};


Object.setPrototypeOf(friend, person2);
console.log(friend.getGreeting());  // "Hello, hi!"









