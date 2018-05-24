const {log}  = require('./utils');


/* 
  fill 与 splice
*/


{
  const arr1 = [1, 2, 3, 'a', 'b'];

  const arr2 = [4, 5, 6];

  /* 
    一次能改多个，返回被删的元素构成的数组，
    可以改变数组长度
  */
  arr1.splice(1, 1, 'e', 'f', 'g')
  
  /* 
    一次只能改一个, 返回原来的数组，
    好像改变不了数组长度
  */
  arr2.fill('e', 1, 2)

  log(
    arr1,
    arr2
  )
}