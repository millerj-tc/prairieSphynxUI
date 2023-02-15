export function ShuffleArray(array) {
    
    
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return [...array]
}

export function GetMean(arr){
    
    let mean = arr.reduce((acc, curr)=>{
	return acc + curr
}, 0) / arr.length;
    
    return mean
}

export function StandardDeviation(arr){
    
    let mean = GetMean(arr);

    arr = arr.map((el)=>{
        return (el - mean) ** 2
    })

    let total = arr.reduce((acc, curr)=> acc + curr, 0);

    return Math.sqrt(total / arr.length)
}

export function permutationsOf(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}


export function Combinations(objects, sample) 
{
  if (objects==sample || sample==0) 
  {
    return 1;
  } 
  else 
  {
    sample=(sample < objects-sample) ? objects-sample : sample;
    return _product_Range(sample+1, objects)/product_Range(1,objects-sample);
  }
}

function _product_Range(a,b) {
  var prd = a,i = a;
 
  while (i++< b) {
    prd*=i;
  }
  return prd;
}