const {log}  = require('./utils');


/* 

  1. Object.defineProperty(obj, prop, descriptor)
  用于创建或者修改对象的「属性」, 并对该属性操作作出限制。 正常赋值到对象上的属性
  是默认可以被循环、修改和删除的，通过此方法修饰属性，可改变该默认行为。

  descriptor(修饰符)分两类, data 和 accessor, 且二者不能并存，否则报错。
  

  公共可选属性： configurable(false), enumerable(false)
  data可选属性: value(undefined), writable(false)
  accessor可选属性: get(undefined), set(undefined)
  // 括号里是默认值



  configurable: 决定对象的属性(property)能否被删除, 以及它的修饰符(attributes)能否被修改, writable 和 value 情况不同
                当 configurable 为 false, writable 为 true时， value 可以修改，writable 从true改为 false(改后不能从false改为true)
                当 configurable 为 true, writable true, writable 能改成 false, 反之不行
  enumerable:  能否被for...in , Object.keys  迭代
  writable: 是否可写
  value:  写入的值
  get 返回值就是获得的值，无参数
  set 不用设置返回值, 参数是要设置的值
  
  A TypeError is thrown when attempts are made to change 
  non-configurable property attributes (except value and writable, if permitted) 
  unless the current and new values are the same.                    
*/

{
  
  /* 
    1. Writable attribute， false 就不能修改
  */
 (function () {
  // 'use strict'  // 写在函数里才有效
  let obj1 = {};

  Object.defineProperty(obj1, 'a', {
    value: 37,
    writable: false
  })

  // log(obj1.a)
  obj1.a = 25 // 严格模式会报错
  // log(obj1.a)  
 })();


 /* 
  2. Enumerable attribute， 决定是否能在 for in 和 Object.keys 里出现 

  通过 Object.defineProperty 设置的默认是 false,
  通过正常赋值，默认是 true (如 obj.key = 'ddd'模式)

 */


 /* 
  3. Configurable attribute

  The configurable attribute controls at the same time 
  whether the property can be deleted from the object 
  and whether its attributes (other than(除了) value and writable) can be changed.
 */

  var o = {};
  Object.defineProperty(o, 'a', {
    get() { return 1; },
    configurable: false
  });

  /* Object.defineProperty(o, 'a', {
    configurable: true
  }); // throws a TypeError
  Object.defineProperty(o, 'a', {
    enumerable: true
  }); // throws a TypeError
  Object.defineProperty(o, 'a', {
    set() {}
  }); // throws a TypeError (set was undefined previously)
  Object.defineProperty(o, 'a', {
    get() { return 1; }
  }); // throws a TypeError
  // (even though the new get does exactly the same thing)
  Object.defineProperty(o, 'a', {
    value: 12
  }); // throws a TypeError

  // console.log(o.a); // logs 1
  delete o.a; // Nothing happens
  // console.log(o.a); // logs 1 */

}


{
  /* 3.2 
    configurable 与 writable
    当 configurable 为 false时
      如果  writable 为true, 那 value 可以修改， writable 也可以修改为 false(修改后就改不回去了)
  */
  var o = {};
  Object.defineProperty(o, 'a', {
    configurable: false,
    writable: true,
  });


  Object.defineProperty(o, 'a', {
    value: 12
  }); 

  // console.log(o.a); // logs 1
  delete o.a; // Nothing happens
  Object.defineProperty(o, 'a', {
    writable: false
  }); 
  o.a = 35;
  /* Object.defineProperty(o, 'a', { // 能从true改成 false， 不能从false改成true 
    writable: true
  }); */
  o.a = 37;
  // console.log(o.a); // logs 1
}

{
  /* 正常赋值与通过 defineProperty 赋值的区别*/
  var o = {};

  o.a = 1;
  // is equivalent to:
  Object.defineProperty(o, 'a', {
    value: 1,
    writable: true,
    configurable: true,
    enumerable: true
  });

  // On the other hand,
  Object.defineProperty(o, 'a', { value: 1 });
  // is equivalent to:
  Object.defineProperty(o, 'a', {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: false
  });
}


/* 
  4. get 和 set 
*/

(() => {

  // 自存档， 用于调试挺好

  function Archiver() {
    var temperature = null;
    var archive = [];
  
    Object.defineProperty(this, 'temperature', {
      get() {
        console.log('get!');
        return temperature;
      },
      set(value) {
        temperature = value;
        archive.push({ val: temperature });
      }
    });
  
    this.getArchive = function() { return archive; };
  }
  
  var arc = new Archiver();
  arc.temperature; // 'get!'
  arc.temperature = 11;
  arc.temperature = 13;
  log(arc.getArchive()); // [{ val: 11 }, { val: 13 }]  
})/* () */;

{
  /* 
    5. 比较诡异的(继承里的坑)

    1. 如果原型里 set/get 参数值用变量存起来的话，会影响实例
  */

  {
    function myclass() {
    }
    
    var value;
    Object.defineProperty(myclass.prototype, "x", {
      get() {
        return value;
      },
      set(x) {
        value = x;
      }
    });
    
    var a = new myclass();
    var b = new myclass();
    a.x = 1;
    console.log(b.x); // 1 // 应该是 undedined
  }

  // 修复方法
  {
    function myclass() {
    }
    
    Object.defineProperty(myclass.prototype, "x", {
      get() {
        return this.stored_x;
      },
      set(x) {
        this.stored_x = x;
      }
    });
    
    var a = new myclass();
    var b = new myclass();
    a.x = 1;
    console.log(b.x); // undefined
  }

  /* 
    2. 如果原型上有不可修改的值，那其后代的这个值也不可修改
  */
  {
    function myclass() {
    }
    
    myclass.prototype.x = 1;
    Object.defineProperty(myclass.prototype, "y", {
      writable: false,
      value: 1
    });
    
    var a = new myclass();
    a.x = 2;
    console.log(a.x); // 2
    console.log(myclass.prototype.x); // 1
    a.y = 2; // Ignored, throws in strict mode
    console.log(a.y); // 1
    console.log(myclass.prototype.y); // 1
  }
}
