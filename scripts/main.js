let start = []
let goal = []
let actionState = ""
let Startbtn = document.getElementsByClassName("Start Button")[0]
let GoalBtn = document.getElementsByClassName("Goal Button")[0]
let WallBtn = document.getElementsByClassName("Wall Button")[0]
let GoBtn = document.getElementsByClassName("Go Button")[0]


// setting up grid
var gridWidth = Math.floor(window.screen.width / 100) -2
var gridHeight = Math.floor(window.screen.height / 100) - 2

makeGrid(gridWidth, gridHeight)

function SetAction(action){

    if (action == "PlaceWall" && actionState == "PlaceWall"){actionState = ""; WallBtn.className = "Wall Button"} else{
        actionState = action
        WallBtn.className = "Filled Wall Button"
    }

    if(action == "PlaceGoal") {GoalBtn.className = "Filled Goal Button"; Startbtn.className = "Start Button"; GoBtn.className = "Go Button"; WallBtn.className = "Wall Button"}
    if(action == "PlaceStart") {GoalBtn.className = "Goal Button"; Startbtn.className = "Filled Start Button"; GoBtn.className = "Go Button"; WallBtn.className = "Wall Button"}
    if(action == "Go") {GoalBtn.className = "Goal Button"; Startbtn.className = "Start Button"; GoBtn.className = "Filled Go Button"; WallBtn.className = "Wall Button"
        StartPathing()
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
            Startbtn.className = "Start Button"
            break;
            
            case "PlaceGoal":
                if (goal.length != 0){
                    let tempNode = getNode(goal[0], goal[1])
                    tempNode.className = "GridNode"}
                    if([x,y] == start) {start = []}
            
            goal = [x,y]
            node.className = "Goal GridNode"
            actionState = ""
            GoalBtn.className = "Goal Button"
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
            aStar([ [[start[0],start[1]], 0, []] ])
            break;
    
        case "DEPTHFIRST":
            depthFirst(start,goal,gridWidth,gridHeight)
            break;
        default:
            break;
    } document.getElementById("findertype").innerHTML
}