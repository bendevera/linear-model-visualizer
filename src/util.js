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

export function roundToThree(num) {
    return Math.round(num*1000) / 1000
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

export function randomData(maxVal, num) {
    let points = [];
    for (let i=0;i<num;i++) {
        let currX = roundToThree(Math.random() * maxVal)
        let currY = roundToThree(Math.random() * maxVal)
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