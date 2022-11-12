function IsWall(x,y){
    let thing = getNode(x,y)
    return thing.className == "Wall GridNode"
}

function isGoal(){
    let thing = getNode(x,y)
    return thing.getAttribute("data") == "goal"
}

function getNode(x,y){
    return document.getElementById("node_"+x+"_"+y)
}