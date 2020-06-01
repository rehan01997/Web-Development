console.log("before");
async function helper()
{
    console.log(" I Am sync helper");
    return 10;
}
console.log("After");
let helperP = helper();
helperP.then(function(data)
{
    console.log(data);
}).catch(function(err)
{
    console.log(err);
})