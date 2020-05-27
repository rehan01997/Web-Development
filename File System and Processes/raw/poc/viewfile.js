let fs = require("fs");  //to include file system module
let path = require("path");  //to include path module
//  d10=> tree view print
// d10 => flat file view print

// how to check whether a path is file or directory in nodejs ??=> google 
function checkWhetherFile(path_string) {
    return fs.lstatSync(path_string).isFile();
}
// content read directory??=> google
function childReader(src) {
    let children = fs.readdirSync(src);
    return children;
}
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
let input = process.argv[2];
// console.log(input)
Treeview(input);
// node tpp view src