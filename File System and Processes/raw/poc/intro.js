// console.log("Hello all"); // print
//dynamically typed lang
// let varname;
// varname =10;
// varname = true;
// varname = null;
// varname = "rehann";
// console.log(varname);



// let n = 22;
// for( let div = 2 ; div*div <= n ; div++)
// {
//     if( n % div == 0)
//         console.log("not prime");
//         return;       
// }
// console.log("prime");
// let greeter = function sayHi()
// {
//     console.log("hunction exp");
// }

// console.log(greeter);
// console.log(greeter());


// function myfun(varname)
// {
//     console.log(varname());
//     console.log(" i am waiting for line 32");
// }
// myfun( function sayHi()
// {
//     console.log("function expression");
// });




//library
// function lib(number)
// {
//     for( let div = 2 ; div*div <= number ; div++)
//     {
//         if( number % div == 0)
//         {
//             return false;
//         }
//     }
//     return true;
// }
// console.log("Prime ?" + lib(21));
// console.log("Prime ?" + lib(23));




//Framework
//frame--->user-->> socket
// function frame( number , scb , fcb)
// {   
//     for(let div = 2; div*div <= number ; div++ )
//     {
//         if( number % div == 0) return fcb();
//     }
//     return scb();
// }
// //developer code
// const {exec} = require("child_process")
// function scb()
// {
//     console.log(" prime")
//     exec("calc").unref();
// }
// function fcb()
// {
//     console.log(" not prime");
//     exec("start chrome").unref();
// }
// frame( 6 , scb , fcb) // Jquery--->library
//                       // Angular-->framework




let arr = [4,14,17,23,48,66];
function pro(number)
{
    if( number % 2 == 0) return number + 1
    else return number - 1
}
let map = arr.map( x => pro(x)); //map
console.log(map);

function filter_prime(number) 
{
    for(let div= 2 ; div*div <= number ; div ++)
    {
        if( number % div == 0) return false;
    }
    return true;
}
let new_map = map.filter( x => filter_prime(x) == true); //if prime push
console.log(new_map);   
new_map.push(1);
console.log(new_map);
