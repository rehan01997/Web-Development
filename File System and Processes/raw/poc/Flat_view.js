let fs = require("fs")
let path = require("path")

//check whther a file
function checkWhetherFile(path_string)
{
    return fs.lstatSync(path_string).isFile();
}

//contrnt read directory
function childReader(src)
{
    let children = fs.readdirSync(src);
    return children;
}

//logic
function Flat_view( src , indent)
{
    let isFile = checkWhetherFile(src);
    if( isFile == true) 
    {
        console.log( indent + path.basename(src) + "*");
    }
    else{
        console.log(indent + path.basename(src));
        //childreader
        let children = childReader(src);
        for(let i = 0 ; i < children.length ; i ++)
        {
            let childpath = path.join(src , children[i]);
            Flat_view(childpath , indent + "\t");
        }
    }
}
let input = process.argv[2]
Flat_view(input , "")