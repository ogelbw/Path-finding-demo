function makeGrid(x,y){
    for (let rows = 0; rows < y; rows++){
        let row = document.createElement('div')
        row.className = "Row"
        for (let column = 0; column < x; column++){
            let block = document.createElement('div')
            block.className = "GridNode"
            block.id = "node_" + column + "_" + rows
            block.setAttribute("onclick", "NodeAction("+column+", "+rows+")")
            row.appendChild(block)
        }
        grid = document.getElementById("grid")
        grid.appendChild(row)

    }

}