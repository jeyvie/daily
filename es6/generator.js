
const { log } = console;




// itetaror 有 next , 手动创建个


// forEach 与 generator

{
  function f() {
    const arr = [1, 2, 3];

    return arr.forEach(function* (item) {
      yield item;
    });

  }

  const g = f();

  // console.log(g);
}


// 
/* 
  arrow 与 generator
  不能结合。深层原因身什么?
  https://stackoverflow.com/questions/27661306/can-i-use-es6s-arrow-function-syntax-with-generators-arrow-notation
  (没看明白)
*/

const arrow = () => {

}


// iterable, 有 Symbol.itertator, 执行后返回 iterator

{
  const arr = [1, 2, 3];

  const iterator = arr[Symbol.iterator]();

  // console.log(iterator.next())

}

/* 
  iterable 有 keys, values, entries 三个方法。
  取对象 keys, 直接调用 keys 就可以了。 [X]
  iterable 包括 array, set, map, 不包括原生如下的对象

  array 没有 values方法，只有 keys, entries。

  其他的(`set`, `map`)三个方法都有
*/


{

  const detectIterableMethod = (iterable) => {
    log('values', iterable.values ? '有' : '没有');
    log('keys', iterable.keys ? '有' : '没有');
    log('entries', iterable.entries ? '有' : '没有');
  }

  const obj = {
    a: 1,
    b: 2
  }

  //log(obj.keys()) [x]
  const arr = ['a', 'b'];

  /* log('数组')

  detectIterableMethod(arr); */

  const set = new Set([1, 3]);

  // log('set')

  // detectIterableMethod(set);


  const map = new Map([[1, 'a'], [2, 'b']]);

  // log('map')

  // detectIterableMethod(map);

  /* 
    for in 会迭代出数组的属性
    for of 不会
  */

  arr.test = '1';

  /* for(let key of arr) {
    console.log('for of', key);
  }

  for(let key in arr) {
    console.log('for in', key);
  } */





}

/* 

  string iterator

*/
{
  const str = 'a我b';
  // log(str.charAt(1)); // code point

  /* for (let char of str) {
    log(char);
  }

  log([...str]); */

}



/* 
  pass args to next

*/

{
  function* createIterator() {
    let first = yield 1;
    // let first = log(yield 1); // 加了log发现，第一次next 只执行 yield 1, 不执行 log
    let second = yield first + 1;
    yield second + 3;
  }

  let iterator = createIterator();

  /* log(
    iterator.next(), // {value: 1, done: false}
    iterator.next() // {value: NaN, done: false}
  ) */

  //比较

  iterator = createIterator();

  /* log(
    iterator.next(), // {value: 1, done: false}
    iterator.next() // {value: 3, done: false}
  ) */

  // 解析
  /* 
    
    function *createIterator() {
      let first = yield 1;           ---- a
      let second = yield first + 1;  ---- b
      yield second + 3;
    }

    因为
      第一个 iterator.next() 执行 line a 里 [yield 1], 不包括 等号左边的赋值
      第二个 iterator.next(arg) 执行 line a 等号左边的赋值，将next的参数赋值给first
                                然后 执行 line b 等号右边。
      剩余的next依次类推


    => yield 表达式的返回值是 undefined
  */


  iterator = createIterator();

  /* log(
    iterator.next(),
    iterator.next(4),
    iterator.throw('----'), // 通过抛出错误地方式执行 next
  ) */

}


// generator 与 return
{
  let g = function* () {
    yield 1;

    return;
  }

  let iterator = g();

  /* log(
    iterator.next(),
    iterator.next()
  ) */

  g = function* () {
    yield 1;
    return 42;
  }

  iterator = g();

  /* log(
    iterator.next(),
    iterator.next(),
    iterator.next()
  ) */

  // 都是两次就迭代完（done: true）。
  // 但后者第二次 next 返回的 value 是 return 后的值 42。

  // 为什么 return 值没有存起来， 后面执行的next的value一直是42
  /* 
    推测内部实现：
      每次执行 next, 
      会
        先
          将其 value 会被重置赋为 undefined,
          done 设为 false (这里done设为true/false/undefined啥的不重要)
        然后
          从上次停顿的地方开始执行, 
          执行到下个需要停顿(yield或return，或函数结束点[就是函数从此没有可执行代码了])的地方，
          再
            如果这个停顿点是yield就将done设为false, 否则为true
            并将本次执行最后一条语句的返回值赋给value,
            
        最后返回 {value, done}
      。

    
  */
}

/* 
  yield *[[expression]]
*/
{

  const g = function* () {
    // const iterator = 'abc';
    // const iterator = ['a', 'b', 'c'];
    // const iterator = new Set(['a', 'b', 'c']);
    const iterator = new Map([['a', 1], ['b', 2], ['c', 3]]);
    yield* iterator;

  };

  const iterator = g();

  /* log(
    iterator.next()
  ) */
  /* for (let item of iterator) {
    log(item)
  } */
}


// generator 与 异步
// 这里好像就是个co吧

{
  function run(taskDef) {
    // create the iterator, make available elsewhere 
    let task = taskDef();
    // start the task    
    let result = task.next();
    // recursive function to keep calling next()    
    function step() {
      // if there's more to do        
      if (!result.done) {
        if (typeof result.value === "function") {
          result.value(function (err, data) {
            if (err) {
              result = task.throw(err);
              return;
            }
            result = task.next(data);
            step();
          });
        } else {
          result = task.next(result.value);
          step();
        }
      }
    }
    // start the process    
    step();
  }

  // function mimicAsync () {
  //   return function (cb) {
  //     setTimeout(() => cb(null, 'hi'), 50)
  //   }
  // }

  function mimicAsync(cb) {
    setTimeout(() => cb(null, 'hi'), 50)
  }

  run(function* () {
    let contents = yield mimicAsync; //mimicAsync();
    // log('contents', contents);
  });

  // log('xxxx');
}











/* let tracking = new Map([
  ['name', 'jeyvie'],
  ['pro', 'fd'],
  ['hobby', 'programming']
]); */

let tracking = ['a', 'c']

/* for (let entry of tracking.entries()) {
  console.log(entry);
} */

/* for (let key of tracking.keys()) {
  console.log(key);
} */

/* for (let value of tracking) {
  console.log(value);
} */





// 
// 
// 
// 






