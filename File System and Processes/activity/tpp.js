let viewFile = require("./commands/viewFile")
let treefyFile = require("./commands/treefyFile.js")
let untreefyFile = require("./commands/untreefyFile")
let helpFile = require("./commands/helpFile")

let input = process.argv.slice(2);

let cmd = input[0]
switch(cmd)
{
    case "view":
        viewFile.view( input[1] ,input[2]);
        break;
    case "treefy":
        treefyFile.treefy(input[0] , input[1]);
        break;
    case "untreefy":
        untreefyFile.untreefy( input[1] , input[2] );
        break;
    case "help":
        helpFile.help();
        break;
}