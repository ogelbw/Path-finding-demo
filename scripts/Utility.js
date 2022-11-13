function IsWall(x,y){
    let thing = getNode(x,y)
    return thing.className == "Wall GridNode"
}

function IsSearching(x,y){
    let thing = getNode(x,y)
    return thing.className == "Searching GridNode"
}

function getNode(x,y){
    return document.getElementById("node_"+x+"_"+y)
}