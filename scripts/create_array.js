
/* 
  需求： 创建一个长度为 n 的数组，子项从 0 到 n;
*/
// https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
var N = 10; 
Array.apply(null, {length: N}).map(Number.call, Number)

// 没明白，
/* 
  没明白，为什么第二个Number 不传，会报错
*/ 


// 这样也可以

Array.apply(null, {length: 100}).map((item, index) => index);

Array.from(Array(10).keys());

[...Array(10).keys()];


