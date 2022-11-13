function aStar(queueToSee){
    if (queueToSee.length == 0) {
        return "Fail";
    }
    node = queueToSee.shift()
    htmlNode = getNode(node[0][0], node[0][1])
    if (htmlNode.className == "Goal GridNode") {
        DrawPath(node[2])
        return;
    }

    if(htmlNode.className != "Start GridNode" && htmlNode.className !=  "Goal GridNode"){ htmlNode.className = "Searching GridNode" }

    children = generateSuccessors(node, node[2])
    queueToSee =  queueToSee.concat(children)
    queueToSee.sort(function(a,b) {return a[1] - b[1]})
    queueToSee = removeDupe(queueToSee)

    window.requestAnimationFrame (function () {setTimeout( () => {aStar(queueToSee)}, 100)})
}

function DrawPath(path){
    for(let i = 0; i < path.length; i++){
        let n = getNode(path[i][0], path[i][1])
        if (n.className == "Start GridNode") { continue }
        if (n.className == "Goal GridNode") { continue }
        n.className = "Path GridNode"
    }
}

function removeDupe(arr){
    var unique = [];
    var fullyU= []
    arr.forEach(element => {
        if (!unique.includes(element[0].toString() )) {
            unique.push(element[0].toString());
            fullyU.push(element)
        }
    });
    return fullyU;
}

function generateSuccessors(node, PathTaken){
    let list = [
        [node[0][0],     node[0][1] + 1],
        [node[0][0] + 1, node[0][1]],
        [node[0][0] - 1, node[0][1]],
        [node[0][0],     node[0][1] -1],
    ]

    let validList = []
    for (let i = 0 ; i< list.length; i++){
        if (getNode(list[i][0],list[i][1]) != null){
            if (getNode(list[i][0],list[i][1]).className != "Wall GridNode" && getNode(list[i][0],list[i][1]).className != "Searching GridNode" && getNode(list[i][0],list[i][1]).className != "Start GridNode"){
                validList.push([list[i], GetCost(node[0], list[i]), PathTaken.concat([[list[i][0], list[i][1]]])])
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
    // let q = Math.abs(to[0] - from[0])+ Math.abs(to[1] - from[1])
    let stepsGoal = Math.abs( to[0] - goal[0]) + Math.abs(to[1] - goal[1]) //Strange goal cost
    let DistToGoal = Math.sqrt( Math.pow(goal[0] - to[0], 2) + Math.pow(goal[1] - to[1], 2) )
    // console.log(stepsGoal, goal, to)
    return stepsGoal + DistToGoal
}