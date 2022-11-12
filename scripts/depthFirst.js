function depthFirst(start, goal, gridx, gridy) {//removed walls bcs assuming theyre not stored in a seperate list, assuming start and goal are arrays storing x and y
    var current_coord, neighbour_coord, leaf
    var pathingMap = new Map()
    var visitStack = [start]
    var visitedSet = []
    while (visitStack[-1] != goal) {
        current_coord = visitStack.pop()
        leaf = true
        for (var d in [[1,0],[0,1],[-1,0],[0,-1]]) {
            neighbour_coord = addCoords(current_coord, d)
            if (0 <= neighbour_coord[0] < gridx && 0 <= neighbour_coord[1] < gridy && !IsWall(neighbour_coord[0],neighbour_coord[1]) && !visitedSet.includes(neighbour_coord))  {//replace black with whatever colour the walls are
                getNode(neighbour_coord[0],neighbour_coord[1]).className = "Searching GridNode"
                // setSquareColor(neighbour_coord, "orange") //whatver orange
                visitStack.push(neighbour_coord)
                pathingMap.set(neighbour_coord, current_coord)
                leaf = false
            }
        }
        visitedSet.push(current_coord)
        if (!leaf) getNode(current_coord[0],current_coord[1]).className = "Searching GridNode"
        // if (!leaf) setSquareColor(current_coord, "green")//or whatever colour/hex code
        var previous = pathingMap.get(current_coord)
        while (!neighbourColourCheck(previous)) {
            // setSquareColor(previous,"grey")
            getNode(previous[0],previous[1]).className = "GridNode"
            previous = pathingMap(previous)
        }
    }
}

function getSquareType(coord) {
    return getNode(coord[0],coord[1]).className
    // return window.getComputedStyle(document.getElementById("node_" + coord[0] + "_" + coord[1])).getPropertyValue("background-color") 
}

// function setSquareColor(coord, color) {
//     document.getElementById("node_" + coord[0] + "_" + coord[1]).style.backgroundColor = color
// }

function searchingCheck(coord) {
    for (var d in [[1,0],[0,1],[-1,0],[0,-1]]) {
        if (IsSearching(addCoords(coord, d)[0],addCoords(coord, d)[1])) return true
    }
    return false
}

function addCoords(c1, c2) {
    return [c1[0] + c2[0], c1[1]+c2[1]]
}