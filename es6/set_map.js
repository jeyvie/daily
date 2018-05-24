const { log } = require('./utils');

{
  let set = new Set(),
    key = { a: 1 };
  set.add(key);
  console.log(set.size);      // 1
  // eliminate original reference
  key = null;
  console.log(set.size);      // 1
  // get the original reference back
  key = [...set][0];
  console.log(set.size);
}


{
  let set = new WeakSet(),
    key = { a: 1 };
  set.add(key);

  console.log(set.has(key));      //true

  set.delete(key)

  console.log(set.has(key));      //false
}



