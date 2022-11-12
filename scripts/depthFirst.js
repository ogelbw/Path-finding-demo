function depthFirst(start, goal, gridx, gridy) {//removed walls bcs assuming theyre not stored in a seperate list, assuming start and goal are arrays storing x and y
    var current_coord, neighbour_coord, current_node, leaf
    var pathingMap = new Map()
    var visitStack = [start]
    var visitedSet = []
    while (visitStack[-1] != goal) {
        current_coord = visitStack.pop()
        current_node = getSquareType(current_coord)
        leaf = true
        for (var d in [[1,0],[0,1],[-1,0],[0,-1]]) {
            neighbour_coord = addCoords(current_coord, d)
            if (0 <= neighbour_coord[0] < gridx && 0 <= neighbour_coord[1] < gridy && getSquareType(neighbour_coord) != "black" && !visitedSet.includes(neighbour_coord))  {//replace black with whatever colour the walls are
                setSquareColor(neighbour_coord, "orange") //whatver orange
                visitStack.push(neighbour_coord)
                pathingMap.set(neighbour_coord, current_coord)
                leaf = false
            }
        }
        visitedSet.push(current_coord)
        if (!leaf) setSquareColor(current_coord, "green")//or whatever colour/hex code
        var previous = pathingMap.get(current_coord)
        while (!neighbourColourCheck(previous, "orange")) {
            setSquareColor(previous,"grey")
            previous = pathingMap(previous)
        }
    }
}

function getSquareType(coord) {
    return window.getComputedStyle(document.getElementById("node_" + coord[0] + "_" + coord[1])).getPropertyValue("background-color") 
}

function setSquareColor(coord, color) {
    document.getElementById("node_" + coord[0] + "_" + coord[1]).style.backgroundColor = color
}
function neighbourColourCheck(coord, color) {
    for (var d in [[1,0],[0,1],[-1,0],[0,-1]]) {
        if (getSquareType(addCoords(coord, d)) == true) return true
    }
    return false
}

function addCoords(c1, c2) {
    return [c1[0] + c2[0], c1[1]+c2[1]]
}