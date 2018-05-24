const {log}  = require('./utils');

/* 
  1. 完成后能否多次then。
  可以
*/
{
  const promise = new Promise(function(resolve, reject){
    // log('now')
    setTimeout(() => resolve('complete'), 50);
  });

  /* promise.then((state) => {
    log(state);
    promise.then(state => log('第二次', state))
  })

  log('3') */
}


/* 
  2. 立即执行的 promise
    Promise.resolve/Promise.reject。 可以传正常数据(非promise)，也可以直接传promise
*/

{
  let promise = Promise.resolve(42).then(/* ... */)
  //let promise = Promise.reject(42).then(/* ... */)

  let promise2 = new Promise(resolve => setTimeout(() => resolve(8), 50));

  // Promise.resolve(promise2).then(d => log(d));
}


/* 
  3. promise 链接
    promise.then 返回的是一个新的promise, 只有前一个promise完成后，才会执行
*/

{
  let p1 = new Promise(resolve => resolve('chain - 1'));

  p1
    .then(v => log(v))
    .then(v => log('chain - 2', v))
    .then(v => log('chain - 3', v))
    .then(v => log('chain - 4', v))
    // ....
    .then(() => {
      return new Promise(resolve => setTimeout(() => resolve('new promise'), 50)) // 这样也是可以的
    })
    .then(v => log('chain - 5', v))
}