
// import {log} from './utils';
const {log}  = require('./utils');

/* 
  1. class 里的方法前不能加 function 关键字，语法不支持
*/
{
  class Test {

    greeting () {
      log('hi');
    }

    /* function declaration () {
      log('hi, declaration');
    } */
  }
  
  const test = new Test();

  // test.greeting();
}


/* 
  2. class 的原型不能被改写.
     改写不报错，但无效
*/

{
  class Test {
    greeting () {
      log('hi');
    }
  }

  // log(Test.prototype);

  Test.prototype = {};

  // log(Test.prototype);

  const test = new Test();

  // test.greeting();

}



/* 
  3. 回调函数能否访问调用处外面的变量

     不行，只能访问声明出外部环境，
     不能访问被调用处外部环境, 需要访问的话，只能通过传参的形式
*/

{

  const outFn = (cb) => {

    const a = '1';

    cb(a);

  }
  const a = '2';
  const callback = (a) => {
    log(a);
  }

  // outFn(callback);

}


/* 
  4. 匿名的class表达式是否有名字
    - 有
    - 匿名函数表达式也有名字

    有名字的class表达式，其名字是表达式里的名字

    => 有名、无名函数表达式和class表达式表现一样
        无名: 名字都是变量的字符串
        有名: 名字是(class 或 function) 后的标识符，但这标识符不在作为变量存在了
*/

{
  const Test = class {
    greeting () {
      log('hi')
    }
  }

  // 有名字的class表达式，其名字是表达式里的名字
  const Test2 = class anotherName {

  }

  const fn = function () {};

  const fnWithName = function myName() {};

  const test = new Test();

  /* log(
    // Test.name,
    fn.name,
    fnWithName.name,
    typeof fnWithName,
    typeof myName,  // 虽然这个名字在，但这个变量已不存在
    // test.name,
    // Test2.name,
    // typeof anotherName, // 虽然这个名字在，但这个变量已不存在
    // typeof Test2,  
    
  ) */

}


/* 
  5. class 静态方法
      目前只能通过存取器设置
  
*/

{
  class Test {
    static sayHi () {
      log('hi');
    }

    static get nick () {
      return 'nickName'
    } 
  }

  /* log(
    // Test.sayHi(),
    Test.nick
  ) */

}


/* 
  6. class 继承

  super 无法改变this执行吗
*/

{
  class Rect {
    constructor (len, width) {
      this.len = len;
      this.width = width;
    }

    getArea () {
      return this.len * this.width;
    }
  }

  class Square extends Rect {
    constructor (len) {
      // 有 constructor 必须调super, 否则返回一个对象, 但这样继承似乎没有意思，因为也找不到 Rect 原型上的方法了
      super(len, len)
      // return {}

      // this.width = 4;
      // this.len = 4;
    }

    getOwnArea () {
      super.getArea() // undefined
      super.getArea.call(this) // 无法改变this指向
      log('xxx', super.len)
    }
  }

  const square = new Square(3);

  log(
    square.getArea(),
    // square instanceof Square,
    // square instanceof Rect,
    square.getOwnArea(),

  )

}


/* 
  7. es6前不能继承内置方法的原因 
*/
