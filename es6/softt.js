//求交际

let arr1 = [1, 3, 4, 5]; // index1 

let arr2 = [3, 4, 4, 5, 7] // index2


let index1 = 0;
let index2 = 0;
let uionArr = [];
let item1;
let item2;

let count = 0;

while (index1 < arr1.length && index2 < arr2.length) {
  item1 = arr1[index1];
  item2 = arr2[index2];
  console.log({
    item1,
    item2,
    index1,
    index2
  });
  if (item1 === item2) {
    if (!uionArr.includes(item1)) {
      uionArr.push(item1)
    }
    index2++
    index1++
  } else if (item1 > item2) {
    index2++
  } else {
    index1++
  }
  count ++;

  if ( count > 10) break;
}

console.log(uionArr);






