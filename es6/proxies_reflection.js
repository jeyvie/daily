const {log}  = require('./utils');
/* 「」 */


/* 
  Proxy 和 Reflection

  Proxy, 代理对象，修改默认操作行为
  Reflection, 执行默认操作行为, 其 API 与 Proxy 对应
  trap, Proxy上的拦截默认操作的函数

  一， 语法

  1. set
  2. get
  3. has
  4. deleteProperty
  5. getPrototypeOf
  6. setPrototypeOf
  7. isExtensible
  8. preventExtensions
  9. defineProperty
  10. getOwnPropertyDescriptor
  11. ownKeys
  12. construct
  13. apply


*/

{
  /* 
    一， 语法
  */
  
  ((debug) => {
    if(typeof debug === 'boolean' && !debug) return;
    let target = {};

    let proxy = new Proxy(/* 被代理的对象 */target, /* hander, 放traps的对象 */{})

    proxy.name = 'proxy'

    log(
      target.name,
      proxy.name
    )

    target.name = 'myname'

    log(
      '\n',
      target.name,
      proxy.name,
      proxy === target
    )

    // 在 proxy 上添加属性，最终等于在 target 上添加属性，因为 proxy 会把这个行为推到 target 上. 
    // 在 proxy 上读属性实际也是在 target 上读, 读的内容被引入了与target一样的引用中去了    
  })(false);

}

/* 
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
})()

*/
/* 
  1. set(   
    trapTarget, //被代理的对象
    key, //写入的键
    value, //写入的值
    receiver, //拦截操作发生的对象，一般就是 proxy
  )

  可用于赋值验证

*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  let target = {
    name: 'targe'
  }

  let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
      if (!trapTarget.hasOwnProperty(key)) {
        if(isNaN(value)) {
          throw new TypeError('传入的值必须是数字')
        }
      }
      
      // 不用 return 关键字，对功能也没什么影响
      return Reflect.set(trapTarget, key, value, receiver)  //line A
      /*  
        trapTarget[key] = value; 也行， 那用 Reflect 是为了什么，更接近底层，减少中间操作？
        而却这种赋值没再引起settrap， 没有造成死循环。(也许内部有机制，一个对象同一时间只能运行一个trap, 
        发起trap时如果这个trap已在执行，就自动自我销毁？ 类似ng1的脏值检测) 
      */
    }
  })

  proxy.count = 1;

    log(
    proxy.count,  // 如果 line A 不执行， 这里也会是 undefined， 充分说明代理只是代理，赋值时不留值，取值是也是从target里取
    target.count
  ) 

  // proxy.anotherName = 'string'; //
  
  
})(false);


/* 
  in 操作符会读原型链
*/


/* 
  2. get(   
    trapTarget, //被代理的对象
    value, //写入的值
    receiver, //拦截操作发生的对象，一般就是 proxy
  )

  可用于 Object Shappe Validation  (是校验某些属性是否存在，那用has也可以啊)

  即使读取对象上没有的属性，get 也能拦截， get 拦截的读操作 

*/
((debug) => {

  if(typeof debug === 'boolean' && !debug) return;

  let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
      if (!(key in receiver)) { // 在 receiver(proxy上操作，不知道会不会引发has trap. 会)
        throw new TypeError(`属性${key}不存在`)
      }
      
      // 返回值即读取的值
      return Reflect.get(trapTarget, key, receiver)  //line A
    }
  })

  proxy.name = 'ssss'

  log(
    'name:',
    proxy.name
  )

  log(
    proxy.nme
  )

})(false);

/* 
  3. has (
    trapTarget, //被代理的对象
    key, //写入的键
  )

  当 「in」 操作符调用时，has trap 被启用。 记住，是 in 操作符。 就是说值虽然被隐藏，但Object.keys, for 循环依然可以找到它
  => 值虽然被隐藏，但是却可以访问，weird
  可用于隐藏值

*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;

  // 实现读不存在的值，报错
  let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
      if (!(key in receiver)) { // 在 receiver(proxy上操作，不知道会不会引发has trap, 会。 )
        throw new TypeError(`属性${key}不存在`)
      }
      // 
      return Reflect.get(trapTarget, key, receiver)  //line A
    }
  })

  proxy.name = 'ssss'


  /* log(
    proxy.name
  ) */

  // 隐藏某个值
  let proxy2 = new Proxy({}, {

    has (trapTarget, key) {
      /* if (...) { 在某些情况下，可以隐藏值
         ...
         return false
      } */
      if (key === 'tohide') {
        return false;
      }

      return Reflect.has(trapTarget, key)
    }
  })

  proxy2.tohide = 'exists'

  log(
    'tohide' in proxy2, // false
    `tohide: ${proxy2.tohide}` // exists, 值虽然被隐藏，但是却可以访问，weird
  )


})(false);



/* 
  4. deleteProperty, 当 delete 操作符用在对象属性上时， 该trap调用。
     可控制值能否被删， 严格模式下，删除被trap保护的值，会报错。正常模式返回false


  delete , 成功返回true失败返回 false
        删除 nonconfigurable (configurable决定是否能被删和配置属性能否被修改, 具体见defineProperty.js文件)的值，严格模式返回错误，正常模式返回false
        那删除不存在的值呢？  严格、正常模式下都，返回值是true
*/
((debug) => {
  'use strict'
  if(typeof debug === 'boolean' && !debug) return;
  
  let o = {};

  /* log(
    o.a,
     delete o.a
  ); */


  let proxy = new Proxy({}, {

    deleteProperty (trapTarget, /* string or symbol */key) {

      if (key === 'sticky') {
        return false;
      } 

      return Reflect.deleteProperty(trapTarget, key)
    }
  })

  proxy.sticky = 'can not be deleted'

  proxy.value = 'can be deleted'
  
  log(
    proxy.sticky,
    proxy.value
  )
  
  log(
    delete proxy.sticky, // 严格模式下会报错
    delete proxy.value
  )

  log(
    proxy.sticky,
    proxy.value    
  )


})(false);


/* 
  5-6. getPrototypeOf/setPrototypeOf
       分别调用  Object[ getPrototypeOf/setPrototypeOf ]时, 触发对应的trap

      getPrototypeOf trap 必须返回Object或null, 否则会导致 runtime error
      setPrototypeOf trap 返回除了false外的其他值， Object.setPrototypeOf()都认为它成功了。
                          返回false, Object.setPrototypeOf()会抛错 。 false 包括能被转为false的值，如空字符串，数字0 和  null

*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;

  let target = {}
  let proxy = new Proxy(target, {

    getPrototypeOf (trapTarget) {
      // return 'null' // 会报错，不是object或null
      return null
      
    },

    setPrototypeOf (trapTarget, proto) {
      return false
    }
  })

  // 想要默认属性，在各自trap下调用 Reflect下对应的方法即可。

  let targetProto = Object.getPrototypeOf(target);
  let proxyProto = Object.getPrototypeOf(proxy);

  /* log(
    targetProto,
    proxyProto
  ) */

  Object.setPrototypeOf(target, {})

  // Object.setPrototypeOf(proxy, {}) // 抛错


  // log(
  //   Object.getPrototypeOf(target),
  //   Object.getPrototypeOf(proxy)
  // )

  
  /* 
    Reflect 和 Object 下 getPrototypeOf/setPrototypeOf 区别

    总的说，Reflect下的更底层，Object下的方法，一开始就是针对开发者的更高级的接口， 做了一些容错处理
    // 他们都调用了对应的只有语言内部才能调用的[[GetPrototypeOf]] 和 [[SetPrototypeOf]]

    就 getPrototypeOf 而言
    如果传入的参数不是对象，Reflect.getPrototypeOf 会报错，而 Object.getPrototypeOf 会先把参数转为对象，再进行操作

    就 setPrototypeOf 而言
    Reflect下 成功返回true, 失败返回false, 而 Ojbect下，成功返回需要设置prototype的对象， 即第一个参数， 失败抛出错误
  */

  target = {}
  proxy = new Proxy(target, {

    getPrototypeOf (trapTarget) {
      log('calll getPrototypeOf trap');
      return Reflect.getPrototypeOf(trapTarget)
      
    },

    setPrototypeOf (trapTarget, proto) {
      log('calll setPrototypeOf trap');
      return Reflect.setPrototypeOf(trapTarget, proto)
    }
  })

  Object.setPrototypeOf(proxy, {})
  
  Reflect.setPrototypeOf(proxy, {})


})(false);



/* 
  7-8. isExtensible/preventExtensions
      ES5 提供了两个修改对象继承能力的API Object[isExtensible/preventExtensions]
      ES6 提供了为他们分别提供了拦截的 trap, 这两个trap 都必须返回布尔值(如果是其他值呢，会被转了布尔值吗)。
          来说明是否能继承，以及是否成功阻止了继承。

*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  let target = {a: 1}
  let proxy = new Proxy(target, {

    isExtensible (trapTarget) {
      return Reflect.isExtensible(trapTarget)
    },

    preventExtensions (trapTarget) {
      return Reflect.preventExtensions(trapTarget)
    }
  })

  log(
    Object.isExtensible(target),
    Object.preventExtensions(proxy),
    Object.isExtensible(target)
  )

  /* 
    Reflect 和 Object上 isExtensible/preventExtensions区别
    
    两者 isExtensible 很像， 只不过传入非对象时，Object上 返回false, Reflect抛出错误。这跟 类似于 Reflect 和 Object上的 getProtoOf

    两者 preventExtensions 也很像， 只不过Object上的返回第一个参数，即使不是对象。而传入不是对象的参数，Reflect会抛出错误。
  
  */

})(false);



/* 
  9-10. defineProperty/getOwnPropertyDescriptor
  ES5 提供的最重要的特性之一就是defineProperty
  ES6 也提供了对应的拦截方法
*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  let target = {a: 1}
  let proxy = new Proxy(target, {

    defineProperty (trapTarget, key, discriptor) {
      
      return Reflect.defineProperty(trapTarget, key, discriptor) 
    },

    getOwnPropertyDescriptor (trapTarget, key) {
      return Reflect.getOwnPropertyDescriptor(trapTarget, key)
    }
  });

  const d = Object.defineProperty(proxy, 'name', {  // 对应trap没返回true, 这里会报错
    value: 'proxy'
  })

  /* log(
    d,
    proxy.name
  ); */

  /* 
    discriptor 的限制， 会被格式化

    传入 defineProperty trap 的discriptor会被格式化，即只有 configurable, enumerable, writable, value, set, get可以传入，其他的都会被过滤
     //另一方面，也就是说 defineProperty trap 里接收的discriptor并不是传入参数的引用
    从 getOwnPropertyDescriptor trap 返回值也同样会被格式化

    getOwnPropertyDescriptor trap 的返回值必须是 null, undefined或object。 如果是object, 那跟上面一样，只能返回那几个值，如果包含了其他值，会报错


    这些限制，保证了统一的数据结构

  */

  /* 

    Object 和 Reflect 下 defineProperty /getOwnPropertyDescriptor 差别

    两个defineProperty除了返回值，其他都一样。Reflect返回布尔值表示操作是否成功， 而Object返回第一个参数。
    因为 defineProperty trap 需要布尔值作为返回值，所以如果需要，最好用Reflect实现其默认行为

    getOwnPropertyDescriptor， 当传入基本数据类型参数时， Obeject下的会将其转化为对象，而Reflect抛出一个错误

  */

  let d1 = Object.getOwnPropertyDescriptor(2, 'name')
  log(
    d1  // 返回undefined是因为传入的对象没有属性。传入空对象也是这样的结果
  )

  let d2 = Reflect.getOwnPropertyDescriptor(2, 'name')  // throw error
  
})(false);





/* 
  11. ownKeys, 这个trap 调用内部方法 [[OwnPropertyKeys]]
      在该trap里返回类数组，可以覆盖默认行为(如果不是数组呢? 报错或者阻止失败？报错)

      Object.keys, Object.getOwnPropertyNames, Object.getOwnPropertySymbols 和 Object.assin 方法，会触发这个trap
      通过 Reflect.ownKeys()调用默认行为， 返回属性key值数组，包括strings和symbols
      Object.keys ， Object.getOwnPropertyNames 会过滤掉symbols
      Object.getOwnPropertySymbols 会过滤掉 strings(构成的key值)
      assign strings和symbols都有


      for .. in 也会被影响

      所以，可以在trap里，过滤掉不想要的值


*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;

  let proxy = new Proxy({
    a: 2,
    b: 4
  }, {

    ownKeys (trapTarget) {

      return Reflect.ownKeys(trapTarget).filter(key => {
        // return ... 过滤条件 
        return key !== 'a'
      })
      
    },

  });

  for( let item in proxy) {
    log(item)
  }

  log(
    Object.keys(proxy)
  )
  
  
})(false);


/* 
  12-13. construct/apply, 所有的trap里，只有这两要求trapTarget是function
         函数内部有[[Construct]]和[[Call]]方法，分别在使用和不使用 new 调用函数时触发。
         这两个trap能使我们覆盖默认的行文

        

*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  /* 
    apply 参数
      trapTarget
      thisArg
      argumentsList
  */

  /* 
    constructor 参数
      trapTarget
      argumentsList
      [newTarget]
  */

  // 用途
  /* 
    1. 校验参数
  */
  function sum (...values) {
    return values.reduce((previous, current)=> previous + current, 0);
  }

  let sumProxy = new Proxy(sum, {
    apply: function(trapTarget, thisArg, argumentsList) {
        argumentsList.forEach(arg => {
          if (typeof arg !== "number") {
            throw new TypeError('All arguments must be numbers')
          }
        });
        return Reflect.apply(trapTarget, thisArg, argumentsList);
    },
    construct: function(trapTarget, argumentsList) {
      throw new TypeError('this function can\'t be called with new')
    }
  })

  log(sumProxy(1, 2, 3, 4));

  // log(sumProxy(1, 2, '3', 4));

  // let result = new sumProxy();

  /* 
    2. 判断是否用 new 调用的。 // 用 new.target(执行用 new 调用的函数) 也能实现这个功能
  */


  /* 
    3. 绕过new.target检测， 比如某些函数默认只能用来被继承，那通过trap可以修改该行为
  */

  /* 
    4. callable class constructor。 (实现直接调用和用new调用一样的结果)
  */

})(false);




/* 

  revocable Proxies. 可撤销的代理

*/

((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  let target = {
    name: 'target'
  }

  let {proxy, revoke} = Proxy.revocable(target, {}) // 没用 new

  log(
    proxy.name
  )
  revoke();
  
  log(
    // proxy, // 报错
    typeof proxy // object
  )
})(false);




/* 

  数组
*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  const arr = [];

  arr[0] = [1]

  arr['0'] = [2]

  log(
    arr.toString()
  )

})(false);



// 以 proxy 为原型. (这时只有get, set, has 三个可用)
/* 
  因为只有对象实例本身没有的属性才会去原型上找，所以在以proxy为原型，proxy发挥的作用有限
*/

((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  

  /* 1. get ， 阻止进一步往原型链上找，或者找到这里的时候做些什么，比如报错，说数据不存在*/ 
  
  /* 
    2. set
      比较奇怪的一点是，如果实例上没有该属性，set trap 会被调用， 但值最终会被辅到实例上，不管原型上是否有这个属性。
      可用于检测属性是否第一次被赋值到实例上？
  */ 

  let target = {}
  let thing = Object.create(new Proxy(target, {
    set(trapTarget, key, value, receiver) {
      log('set called')
      return Reflect.set(trapTarget, key, value, receiver)
    }
  }));

  log(
    thing.hasOwnProperty('name')
  )

  thing.name = 'thing' // 触发 set trap

  log(
    thing.name
  )

  log(
    thing.hasOwnProperty('name')
  )


  thing.name = 'foo' // 不会触发 set trap

  log(
    thing.name
  )


  /* has, 实例上没有，才有找到原型上 */


})();


/* 
  用覆盖的方法以代理重置原型。上面是用Object.create
*/
((debug) => {
  if(typeof debug === 'boolean' && !debug) return;
  
  /* 
    因为ES6 class 不支持修改原型，
    所以只能先用es5风格写个类，然后 class 继承它
  */

  function NoSuchProperty () {
    // empty
  }

  NoSuchProperty.prototype = new Proxy({}, {
    get(trapTarget, key, receiver) {
      throw new ReferenceError(`${key} doesn't exsit`)
    }
  })

  let thing = new NoSuchProperty();

  class Square extends NoSuchProperty {
    // ....
  }


})();




