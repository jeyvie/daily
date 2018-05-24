
const {log} = console

/* 
  1. 判断单词是否回文
*/

const checkPalindrome = (str) =>  str == str.split('').reverse().join('')


// log(checkPalindrome('assa'));


/* 
  2. 数组去重
*/

const unique = function(arr) {  
  let hashTable = {};
  let data = [];
  let item;
  for(let i=0,l=arr.length; i<l ; i++) {
    item = arr[i]
    if(!hashTable[item]) {
      hashTable[item] = true;
      data.push(item);
    }
  }
  return data
}

// log(unique([1, 2, 2, 1]))

const uniqueBySet = (arr) => Array.from(new Set(arr))

// log(uniqueBySet([1, 2, 2, 1]))


/* 
  3. 统计出现次数最多的字母
*/
function findMaxDuplicateChar(str) {  
  if(str.length == 1) {
    return str;
  }
  let charObj = {};
  for(let i=0;i<str.length;i++) {
    if(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    }else{
      charObj[str.charAt(i)] += 1;
    }
  }

  let maxChar = '',
      maxValue = 1;
  for(var k in charObj) {
    if(charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar;
}

// log(findMaxDuplicateChar('afjghdfraaaasdenas'))


/* 
  4 排序
*/

 
/* 
  4. 1 冒泡， 往一个方向(这里是往小冒，怎么往大冒)
*/
function bubbleSort(arr) {  
  for(let i = 0,l=arr.length; i<l-1; i++) {
      for(let j = i+1; j<l; j++) { 
        if(arr[i] > arr[j]) {
          let tem = arr[i];
          arr[i] = arr[j];
          arr[j] = tem;
        }
      }
  }
  return arr;
}


// log(bubbleSort([3, 1, 5, 6, 2]))

// 4.2 快速排序
// 4.3 选择排序
  /* 
    每次选择最大的，和本次循环的最后一个交换位置
  */
// 4.4 插入排序
// 4.5 希尔排序
// 4.6 合并排序


/* 
  5. 不借助临时变量，进行两个整数的交换
*/
function swap(a , b) {  
  b = b - a;
  a = a + b;
  b = a - b;
  return [a,b];
}

const swapByDestruction = (a, b) => [a, b] = [b, a]


/* 
  6. 使用canvas 绘制一个有限度的斐波那契数列的曲线

  fibo[i] = fibo[i-1]+fibo[i-2];  
*/

function getFibonacci(n) {  
  var fibarr = [];
  var i = 0;
  while(i<n) {
    if(i<=1) {
      fibarr.push(i);
    }else{
      fibarr.push(fibarr[i-1] + fibarr[i-2])
    }
    i++;
  }

  return fibarr;
}

/* 
  7. 正数数组的最大差值
*/

function getMaxProfit(arr) {

  var minPrice = arr[0];
  var maxProfit = 0;

  for (var i = 0; i < arr.length; i++) {
      var currentPrice = arr[i];

      minPrice = Math.min(minPrice, currentPrice);

      var potentialProfit = currentPrice - minPrice;

      maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}

/* 
  7. 随机生成指定长度的字符串
*/

function randomString(n) {  
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let tmp = '',
      i = 0,
      l = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l));
  }
  return tmp;
}

const randomString2 = (n, base) => {
  
  let str = ''

  while (str.length < n) {
    str += Math.random().toString(16).substring(2)
  }
  
  return str.substring(0, n)
}

/* 
  8.实现类似 getElementsByClassName

  自己实现一个函数，查找某个DOM节点下面的包含某个class的所有DOM节点？
  不允许使用原生提供的 getElementsByClassName querySelectorAll 等原生提供DOM查找函数

  基本思想： 
    1. node.getElementsByTagName("*")
    2. 然后遍历节点，用正则匹配，看是否包含指定class
*/

function queryClassName(node, name) {  
  var starts = '(^|[ \n\r\t\f])',
       ends = '([ \n\r\t\f]|$)';
  var array = [],
        regex = new RegExp(starts + name + ends),
        elements = node.getElementsByTagName("*"),
        length = elements.length,
        i = 0,
        element;

    while (i < length) {
        element = elements[i];
        if (regex.test(element.className)) {
            array.push(element);
        }

        i += 1;
    }

    return array;
}


