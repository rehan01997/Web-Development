let fs = require("fs");

console.log("Start")
let filee = fs.readFile("f122.txt",function(err , data)
                                {   console.log("inside");
                                    if( err)
                                    {
                                        console.log( err);
                                    }
                                    else{                                        
                                        console.log(data + " ")
                                    }
                                    
                                });
console.log("move to next work")
