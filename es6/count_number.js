let arr = [
  1, 2, 7 ,9 , 3, 4, 5
]

let sumArr = [
  []
];
let startNum;
let endNum;

let curArr = sumArr[sumArr.length - 1];
let preNum;

arr.forEach((num, index) => {
  if (index === 0) {
    curArr.push(num)
  } else {
    preNum = arr[index - 1];
    if (num - preNum === 1) {
      curArr.push(num)
    } else {
      curArr = [num];
      sumArr.push(curArr)
    }  
  }
});

let maxIndex = 0;

for(let item of sumArr) {
  if (item.length > maxIndex) {
    maxIndex = item.length;
  }
}

const getSequence = (arr, direaction = 1) => {
  if (!Array.isArray(arr)) return console.log('传入的不是数组');
}



for(let item of arr) {
  console.log(item)
}


console.log(sumArr, maxIndex);


console.log(sumArr[maxIndex]);
