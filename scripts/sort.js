class CArray {
  constructor(count) {
    this.dataStore = [...Array(count).keys()];
    this.pos = 0;
    this.numElements = count;
  }

  setData() {
    this.dataStore = this.dataStore.map(item => Math.floor(Math.random() * this.numElements))
  }

  getData() {
    return this.dataStore;
  }

  clear() {
    this.dataStore.fill(0)
  }

  insert(element) {
    this.dataStore[this.pos++] = element;
  }

  toString() {
    return this.dataStore.join(' ').match(/(\d\s?){1,10}/g).join('\n')
  }
}

const swap = (arr, index1, index2) => {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}



// console.log(myNums.toString());

const getArr = (count = 10) => Array.apply(null, { length: count }).map(() => {
  return Math.floor(Math.random() * 100)
})

let arr = getArr()


/* 
  依次比较相邻的两个数，往大(或小)的方向改变位置
*/
const bubbleSort = (function bubbleSort(arr, end = arr.length - 1) {
  for (let i = 0; i < end; i++) {
    const cur = arr[i];
    const next = arr[i + 1];
    if (cur > next) {
      arr[i] = next;
      arr[i + 1] = cur;
    }
  }
  if (end - 1 > 0) bubbleSort(arr, end - 1)
})




/* 
  每次选出最小值，放到本次循环的开头处
*/

const selectionSort = (function selectionSort(arr, start = 0) {

  let min;
  let cur;
  let minIndex;

  for (let i = start; i < arr.length; i++) {
    if (i === start) {
      min = arr[i];
      minIndex = i;
    } else {
      cur = arr[i]
      if (cur < min) {
        min = cur;
        minIndex = i;
      }
    }
  }

  arr[minIndex] = arr[start];
  arr[start] = min;
  start++;
  if (start < arr.length) selectionSort(arr, start);
})





/* 
  依次挑出一个值，插入到它的比他大的最前的值的前面
*/
const insertionSort = (function insertionSort(arr, start = 1) {

  let swapItem = arr[start];
  let swapIndex = start;
  let cur;

  for (let i = start - 1; i >= 0; i--) {
    cur = arr[i];
    if (cur > swapItem) {
      swapIndex = i;
    }
  }

  if (swapIndex !== start) {
    arr.splice(start, 1);
    arr.splice(swapIndex, 0, swapItem);
  }
  start++;
  if (start < arr.length) insertionSort(arr, start)
})

// console.log(arr);

// insertionSort(arr);

// console.log(arr);


/* 
  把数组一分为二，然后排序，合并
*/
function merge(left, right) {
  var result = [],
    il = 0,
    ir = 0;

  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }

  return result.concat(left.slice(il)).concat(right.slice(ir));
}

function mergeSort(items) {
  // 长度为0或者1的数组将直接返回
  if (items.length < 2) {
    return items;
  }

  var middle = Math.floor(items.length / 2),
    left = items.slice(0, middle),
    right = items.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

arr = getArr(80)

console.log(arr.join());

arr = mergeSort(arr);

console.log(arr.join());


// label 语句