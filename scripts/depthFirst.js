function DepthFirst() {//removed walls bcs assuming theyre not stored in a seperate list, assuming start and goal are arrays storing x and y
    let q = [[start,[]]]
    console.log("Depth")
    window.requestAnimationFrame(() => {setTimeout(()=> {DepthLoop(q)}, 100)})
}

function DepthLoop(q){
    let v = q.shift()
    let htmlV = getNode(v[0][0],v[0][1])
    // console.log(getNode(v[0][0],v[0][1]).className, htmlV.className == "Goal GridNode")
    if(htmlV.className == "Goal GridNode"){DrawPath(v[1]); return}
    if (htmlV.className != "Start GridNode"){htmlV.className = "Searching GridNode"}
    children = generateSuccessorsBreadth(v)
    let qu = children.concat(q)
    qu = removeDupe(qu)
    window.requestAnimationFrame(() => {setTimeout(()=> {DepthLoop(qu)}, 100)})
}