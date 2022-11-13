function depthFirst(start, goal, gridx, gridy) {//removed walls bcs assuming theyre not stored in a seperate list, assuming start and goal are arrays storing x and y
    var current_coord, neighbour_coord, leaf
    var pathingMap = new Map()
    var visitStack = [start]
    var visitedSet = []
    while (visitStack[visitStack.length-1].toString() != goal.toString()) {
        // window.requestAnimationFrame()
        // prompt()
        console.log(visitStack)
        current_coord = visitStack.pop()
        leaf = true
        for (var d of [[1,0],[0,1],[-1,0],[0,-1]]) {
            neighbour_coord = addCoords(current_coord, d)
            console.log(!visitedSet.includes(neighbour_coord.toString()))
            if ((0 <= neighbour_coord[0] && neighbour_coord[0] < gridx && 0 <= neighbour_coord[1] && neighbour_coord[1] < gridy) && !(visitedSet.includes(neighbour_coord.toString())))  {//replace black with whatever colour the walls are
                console.log(!(visitedSet.includes(neighbour_coord)))
                if (!IsWall(neighbour_coord[0],neighbour_coord[1])){
                    getNode(neighbour_coord[0],neighbour_coord[1]).className = "Searching GridNode"
                    // setSquareColor(neighbour_coord, "orange") //whatver orange
                    visitStack.push(neighbour_coord)
                    console.log(neighbour_coord)
                    pathingMap.set(neighbour_coord.toString(), current_coord)
                    leaf = false
                }
            }
        }
        // console.log(pathingMap)
        visitedSet.push(current_coord.toString())
        console.log(visitedSet)
        // console.log(leaf)
        if (!leaf) {
            getNode(current_coord[0],current_coord[1]).className = "Path GridNode"
        } else {
        // if (!leaf) setSquareColor(current_coord, "green")//or whatever colour/hex code
        // console.log(current_coord.toString())
            var previous = pathingMap.get(current_coord.toString())
            while (!searchingCheck(previous) || previous.toString() == start.toString()) {
                // setSquareColor(previous,"grey")
                getNode(previous[0],previous[1]).className = "GridNode"
                previous = pathingMap.get(previous.toString())
            }
        }
    }
    getNode(visitStack[visitStack.length-1][0],visitStack[visitStack.length-1][1]).className = "Goal GridNode"
}

function getSquareType(coord) {
    return getNode(coord[0],coord[1]).className
    // return window.getComputedStyle(document.getElementById("node_" + coord[0] + "_" + coord[1])).getPropertyValue("background-color") 
}

// function setSquareColor(coord, color) {
//     document.getElementById("node_" + coord[0] + "_" + coord[1]).style.backgroundColor = color
// }

function searchingCheck(coord) {
    var temp
    for (var d of [[1,0],[0,1],[-1,0],[0,-1]]) {
        console.log(coord)
        console.log(d)
        temp = addCoords(coord, d)
        if (IsSearching(temp[0],temp[1])) return true
    }
    return false
}

function addCoords(c1, c2) {
    return [c1[0]+c2[0], c1[1]+c2[1]]
}