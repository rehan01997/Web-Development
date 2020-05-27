let arr = [1,2,4,6,3,8]
let arr1 = [5,6,8,3,9]
let arr2 = [4,14,-23,23,48]
Array.prototype.sum = function()
{   
    let sum =0 ;
    for( let i = 0 ; i < this.length ; i ++ )
    {
        sum += this[i]
    }
    return sum;
}

console.log(arr.sum());    // 24
console.log(arr1.sum())    // 31
console.log(arr2.sum()     //66
)



function cb(number)
{
    if( number % 2 == 0) return number + 1
    else return number - 1
}
function filter_prime(number) 
{
    for(let div= 2 ; div*div <= number ; div ++)
    {
        if( number % div == 0) return false;
    }
    return true;
}
Array.prototype.my_map = function(cb)
{
    let narr = [];
    for(let  i= 0 ; i < this.length ; i++)
    {
        let rval = cb(this[i]);
        narr.push(rval);
    }
    return narr;
}
Array.prototype.myFilter = function(filter_prime)
{
    let nArr = []
    for( let i = 0 ; i < this.length ; i++)
    {
        if(filter_prime(this[i]) == true)
        {
            nArr.push(this[i]);
        }
    }
    return nArr;
}

let tArr = arr.my_map(cb)
console.log(tArr)

let farr = tArr.myFilter(filter_prime)
console.log(farr)