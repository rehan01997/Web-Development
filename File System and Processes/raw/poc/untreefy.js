let fs = require("fs")
let path = require("path")
let uniqid = require("uniqid")

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
function untreefy( src , dest , obj)
{
    let isFile = checkWhetherFile(src);
    if( isFile == true)
    {
        let newName = uniqid();
        let oldName = path.basename(src);
        fs.copyFileSync( src , path.join( dest , newName) );
        obj.newName = newName;
        obj.oldName = oldName;
        obj.isFile = true;
        console.log("filee")
    }
    else{
        let dirname = path.basename(src)
        obj.isFile = false;
        obj.name = dirname;
        obj.children = [];

        let children = childReader(src);
        for( let i = 0 ; i < children.length ; i++)
        {
            let childpath = path.join( src , children[i])
            let chobj = {}
            untreefy( childpath , dest , chobj)
            obj.children.push(chobj);
        }
    }
}
let input = process.argv.slice(2)
let src = input[0]
let dest = input[1]
let root = {}
untreefy(src , dest , root)
console.log(root)
fs.writeFileSync(path.join(dest ,"metadata.json") , JSON.stringify(root))