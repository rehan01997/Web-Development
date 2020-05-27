let root = {
    data : "d10", 
    children : [{ //children 1 of d10
        data : "d20" , 
        children : [{ data : "d50" ,children : []},
                    { data : "d60", children : [] }],
        },
        { data : "d30",
        children : []
        },
        {
        data : "d40",
        children : [{ data : "d80" , children :[]
        }]
        }]
}

function displayTree(node)
{
    let Myfam = node.data + "=>";
    for(let i= 0 ; i < node.children.length ; i++)
    {
        let child = node.children[i];
        Myfam += child.data + ","
    }
    console.log(Myfam);
    //faith => abstraction
    for( let i = 0  ; i < node.children.length ; i++)
    {
        let child = node.children[i];
        displayTree(child);
    }
}
displayTree(root)