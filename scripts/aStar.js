function aStar(queueToSee){
    if (queueToSee.length == 0) {
        return "Fail";
    }
    console.log("ran")
    node = queueToSee.shift()
    htmlNode = getNode(node[0][0], node[0][1])
    if (htmlNode.className == "Goal GridNode") {
        DrawPath(node[2])
        return;
    }

    htmlNode.className = "Searching GridNode"

    children = generateSuccessors(node, node[1], node[2])
    for (let i = 0; i< children.length; i++){
        queueToSee.push(children[i])
    }
    queueToSee.sort(function(a,b) {return a[1] - b[1]})

    aStar(queueToSee)
}

function DrawPath(path){
    for(let i = 0; i < path.length; i++){
        getNode(path[i][0], path[i][1]).className = "Path GridNode"
    }
}

function generateSuccessors(node, currentCost, PathTaken){
    let list = [
        [node[0][0],     node[0][1] + 1],
        [node[0][0] + 1, node[0][1]],
        [node[0][0] - 1, node[0][1]],
        [node[0][0],     node[0][1] -1],
    ]

    let validList = []

    for (let i = 0 ; i< list.length; i++){
        if (getNode(list[i][0],list[i][1]) != null){
            if (getNode(list[i][0],list[i][1]).className != "Wall GridNode" && getNode(list[i][0],list[i][1]).className != "Searching GridNode"){
                validList.push([list[i], currentCost + GetCost(node, list[i]), PathTaken.concat([[list[i][0], list[i][1]]])])
            }
        }
    }

    return validList
}

function sortList(list){
    list.sort(function(a,b) {return a[1] - b[1]})
    return list
}

function GetCost(from, to){
    let q = [Math.abs(to[0] - from[0]), Math.abs(to[1] - from[1])]
    // let h = Math.abs(to[0] - goal[0]) + Math.abs(to[1] - goal[1]) //Strange goal cost

    return Math.sqrt(Math.pow(q[0], 2), Math.pow(q[1], 2)) //+ h
}