Map.prototype.filter = function(f) {
    ar =[]
    this.forEach(a => f(a) ? ar.push(a) : {}); 
    return ar
}

let map = new Map();

map.set('1', 'str1');   
map.set(1, 'num1');     
map.set(true, 'bool1');

console.log(map.filter(m => m==='str1' | m === 'num1'))