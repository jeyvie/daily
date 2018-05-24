const g = (items) => {
	let i = 0;
	const len = items.length;
	return {
    [Symbol.iterator]:  () => ({
      next: () => {
        const done = i >= len ? true : false;
        const value = items[i++]
        return {
          value,
          done
        }
      }      
    })
	}
}

const it = g(Array.from('123456'))

for(let item of it) {
  console.log(item)
}

