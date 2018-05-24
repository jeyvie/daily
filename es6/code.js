var name = 'outer'

function A () {
  this.name = 'inner'
  return function () {
    console.log(this)
    return this.name;
  }
}

// console.log(new A());



console.log(new A()())

