let fs = require("fs")
let path = require("path")

module.exports.view = function()
{
    //console.log("view File command is implemented")
    let src = arguments[0] , mode = arguments[1]
    if(mode == "-t")
    {   
        console.log("Flat view command is implemented")
        Flat_view( src , "")
    }
    else
    {
        console.log("Tree view command is implemented")
        Treeview( src );
    }
}

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

//logic Tree view 
// logic
function Treeview(src) {
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        console.log(src + "*");
    } else {
        console.log(src);

        let children = childReader(src);
        // console.log(children);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            Treeview(childPath);
        }
        // children loop
    }

}

//logic Flat view
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
