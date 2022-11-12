let start = []
let goal = []

// setting up grid

makeGrid(Math.floor(window.screen.width / 100) -2, Math.floor(window.screen.height / 100) - 2)

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