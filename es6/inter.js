
// 1. 数组去重
var arr = [1,1,2,3,4,4,5,5,5,6]

/* console.log([...new Set(arr)])

console.log(arr.filter((value, index, self) => {
  return self.indexOf(value) === index
})) */

// 

// 2. 格式化

let str = '1234567'

/* str = str.split('').reverse().join('')

console.log(str, str.match(/\d{1,3}/g)) */

function format(num) {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// x(?=y), 匹配'x'仅仅当'x'后面跟着'y'.这种叫做正向肯定查找。
// (?:x), 匹配 'x' 但是不记住匹配项。这里不用这个页可以

// console.log(format(1234567))


function Foo () {  
  getName = function (){  
      console.log(1)
  };  
  return this;  
};  
Foo.getName = function (){  
  console.log(2);  
};  
Foo.prototype.getName = function (){  
  console.log(3);  
};  
var getName =function (){  
  console.log(4);  
};  
function getName(){  
  console.log(5);  
} 

Foo.getName();  // 2
getName();    // 4
Foo().getName(); // 1 
getName();   // 1
new Foo.getName(); // 2 
new Foo().getName();  // 3
new new Foo().getName(); // 3






