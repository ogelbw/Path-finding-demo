let start = []
let goal = []
let actionState = ""

// setting up grid

makeGrid(Math.floor(window.screen.width / 100) -2, Math.floor(window.screen.height / 100) - 2)

function SetAction(action){
    if (action == "PlaceWall" && actionState == "PlaceWall"){actionState = ""} else{
        actionState = action
    }
}

function NodeAction(x,y) {
    let node = getNode(x,y)
    switch (actionState) {
        case "PlaceStart":
            if(start.length != 0){
                let tempNode = getNode(start[0], start[1])
                tempNode.className = "GridNode"
            }
            if([x,y] == goal) {goal = []}
            start = [x,y]
            node.className = "Start GridNode"
            actionState = ""
            break;
            
            case "PlaceGoal":
                if (goal.length != 0){
                    let tempNode = getNode(goal[0], goal[1])
                    tempNode.className = "GridNode"}
                    if([x,y] == start) {start = []}
            
            goal = [x,y]
            node.className = "Goal GridNode"
            actionState = ""
            break;

        case "PlaceWall":
            if (x == goal[0] && y == goal[1]){goal = []}
            if (x == start[0] && y == start[1]){start = []}
            node.className = "Wall GridNode"

            break
    
        default:
            break;
    }
}

function StartPathing(){
    if (start.length != 2){return}
    if (goal.length != 2) {return}

    switch (document.getElementById("findertype").innerHTML) {
        case "A-STAR":
            window.requestAnimationFrame(aStar(start, goal, 9999999, []))
            break;
    
        case "DEPTHFIRST":
            // put thing here
            break;
        default:
            break;
    } document.getElementById("findertype").innerHTML
}