let fs = require("fs")
let path = require("path");
//use metadata.json to move/create file/directory in new dest

module.exports.treefy = function()
{
    console.log("treefy command is implemented");
    let src = arguments[0] , dest = arguments[1];
    
    //read json file
    let root = require(path.join( src , "metadata.json"));
    treefyLogic ( src  , dest , root)
}


function treefyLogic( src , dest , node)
{ 
    //metadata.json file in dest..need to move to new_dest
    if( node.isFile == true)
    {
        let srcPath = path.join( src , node.newName)
        let destPath = path.join( dest , node.oldName);
        fs.copyFileSync(srcPath , destPath);
        console.log(`Data copied from ${srcPath} to ${destPath}`);
    }
    else
    {
        let dirPath = path.join(dest , node.name);
        //search=>>directory exist?? if not exist..create it
        if( !fs.existsSync( dirPath))
        {
            fs.mkdirSync(dirPath);
        }
        //children loop
        for(let i = 0 ; i < node.children.length ; i++)
        {
            let child = node.children[i];
            let pPath = dirPath;
            treefyLogic( src , pPath , child)
        }
    }

}
// let input = process.argv.slice(2);
// let src = input[0] , dest = input[1]

// //read json file
// let root = require(path.join( src , "metadata.json"));
// treefyLogic ( src  , dest , root)
