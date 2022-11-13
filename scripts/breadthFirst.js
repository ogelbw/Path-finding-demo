function BreadthFirst() {//removed walls bcs assuming theyre not stored in a seperate list, assuming start and goal are arrays storing x and y
    let q = [[start,[]]]
    window.requestAnimationFrame(() => {setTimeout(()=> {BreadthLoop(q)}, 100)})
}

function BreadthLoop(q){
    let v = q.shift()
    let htmlV = getNode(v[0][0],v[0][1])
    // console.log(getNode(v[0][0],v[0][1]).className, htmlV.className == "Goal GridNode")
    if(htmlV.className == "Goal GridNode"){DrawPath(v[1]); return}
    if (htmlV.className != "Start GridNode"){htmlV.className = "Searching GridNode"}
    children = generateSuccessorsBreadth(v)
    let qu = q.concat(children)
    qu = removeDupe(qu)
    window.requestAnimationFrame(() => {setTimeout(()=> {BreadthLoop(qu)}, 100)})
}


function generateSuccessorsBreadth(node){
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
                validList.push([list[i], node[1].concat([[list[i][0], list[i][1]]])])
            }
        }
    }
    return validList
}
