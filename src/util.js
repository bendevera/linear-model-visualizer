export function sum(array) {
    return array.reduce((a, b) => a+b, 0)
}

export function mean(array, ln) {
    return sum(array) / ln
}

export function standardDeviation(array, mean, ln) {
    let std = array.map((item) => {
        return Math.pow(item - mean, 2)
    })
    std = sum(std)
    return Math.pow(std/(ln-1), .5)
}

export function roundTo(num, place) {
    let multiplier = place * 10
    return Math.round(num*multiplier) / multiplier
}


export function get_r(x, y) {
    let num_r = x.map((item, index) => {
        return item * y[index]
    }).reduce((a, b) => a+b, 0)
    
    let den_r = x.map((item) => {
        return Math.pow(item, 2)
    }).reduce((a,b) => a+b, 0)
    
    den_r = den_r + y.map((item) => {
        return Math.pow(item, 2)
    }).reduce((a, b) => a+b, 0)

    let r = num_r / den_r
    return r
}

export function getStats(active) {
    let ln = active.length
    if (ln < 2) {
        alert("Can't get best fit of less than two points.")
        return 
    }
    
    // array of all x values
    let x = active.map((item) => { 
        return item.x 
    })
    // calculates mean of x 
    let mx =  mean(x, ln)
    // calculates std of x
    let sx = standardDeviation(x, mx, ln)
    // array of all y values
    let y = active.map((item) => {
        return item.y
    })
    // calculates mean of y
    let my = mean(y, ln)
    // calculates std of y
    let sy = standardDeviation(y, my, ln)
    // r calculations
    let r = get_r(x, y)
        
    let b = r * (sy/sx)
    let A = my - (b*mx)
    let results = {
        A: roundTo(A, 2),
        b: roundTo(b, 2),
        mx: roundTo(mx, 2),
        my: roundTo(my, 2),
        sx: roundTo(sx, 2),
        sy: roundTo(sy, 2), 
        r: roundTo(r, 2)
    }
    return results
}

export function randomData(xMax, yMax, num) {
    let points = [];
    for (let i=0;i<num;i++) {
        let currX = roundTo(Math.random() * xMax, 1)
        let currY = roundTo(Math.random() * yMax, 1)
        let currPoint = {
            x: currX,
            y: currY
        }
        // console.log("POINT " + i.toString())
        // console.log(currPoint);
        points.push(currPoint);
    }
    // console.log(points)
    return points
}