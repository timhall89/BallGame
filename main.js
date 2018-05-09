const friction = 0.01
const unit = 'px'
const g = 9.81

var boxHeight, boxWidth
var container = document.getElementById('container')
var pointer = document.getElementsByClassName('pointer')[0]

var fixies = []
fixies.push(newCircle(200, 400, 'fixedPoint', 14))
fixies.push(newCircle(556, 400, 'fixedPoint', 14))
fixies.push(newCircle(700, 400, 'fixedPoint', 14))
console.log(fixies.length)
for (var i in fixies) {
    console.log(fixies[i].x)
}

function getAngle(y, x) {
    return Math.atan2(y, x)
}

function getX(length, angle){
    return Math.cos(angle) * length
}

function getY(length, angle){
    return Math.sin(angle) * length
}

function newMoving(_xspeed = 0, _speed = 0) {
    var newC = newCircle
}
function newCircle(x, y, cls, r = 10){
    var newdiv = document.createElement('div')
    newdiv.classList.add(cls)
    container.appendChild(newdiv)

    newdiv.move = function(_x, _y){
        if (this.x != _x) {
            this.style.left = _x + unit
            this.x = _x
        } 

        if (this.y != _y){
            this.style.top = y + unit
            this.y = _y
        }
    }
    newdiv.move(x, y)

    return newdiv
}
function getBoxSize(){
    boxWidth = container.offsetWidth
    boxHeight = container.offsetHeight
}

window.addEventListener('resize', getBoxSize)

var movingBox = {
    
    element: document.getElementsByClassName('moving')[0],
    speed: 0,
    angle: 0,
    xspeed: 0,
    yspeed: 0,
    x: 0,
    y: 0,
    move: function() {

        var xdiff = getX(this.speed, this.angle)
        var ydiff = getY(this.speed, this.angle)
        var x1 = 0
        var y1 = 0

        if ((this.element.offsetLeft + xdiff) < 0) {
            this.element.style.left = '0'
            this.angle = this.angle < 0 ? -Math.PI - this.angle : Math.PI - this.angle
            
        } else if ((this.element.offsetLeft + xdiff) > (container.offsetWidth - this.element.offsetWidth)){
            this.element.style.left = (container.offsetWidth - this.element.offsetWidth) + unit
            this.angle = this.angle < 0 ? -Math.PI - this.angle : Math.PI - this.angle
        } else {
            this.element.style.left = (this.element.offsetLeft + xdiff) + unit
        }

        if ((this.element.offsetTop + ydiff) < 0) {
            this.element.style.top = '0'
            this.angle *= -1
        // } else if ((this.element.offsetTop + ydiff) > (container.offsetHeight - this.element.offsetHeight)) {
        //     this.element.style.top = (container.offsetHeight - this.element.offsetHeight) + unit
        //     this.angle *= -1
        } else {
            this.element.style.top = (this.element.offsetTop + ydiff) + unit
        }

        this.speed -= this.speed <= 0 ? 0 : friction * (1 + this.speed * 0.04)

    },

}

var x, y, x0, y0
var mousespeed
var listen = true

document.addEventListener('mousemove', function(event){
    x = event.clientX
    y = event.clientY
    pointer.style.left = (x - 10) + unit
    pointer.style.top = (y - 10) + unit
})
movingBox.element.addEventListener('mousemove', function(event){
    if (listen) {
        //window.alert(event.shiftKey)
        listen = false
    }
})

movingBox.element.addEventListener('mouseover', function(event){
 
        xbox = movingBox.element.offsetLeft + movingBox.element.offsetWidth / 2
        ybox = movingBox.element.offsetTop + movingBox.element.offsetHeight / 2
        movingBox.angle = getAngle(ybox - event.clientY, xbox - event.clientX)
        //x0 = x
        //y0 = y
        movingBox.speed = mousespeed
        // setTimeout(() => {
        //    //document.getElementById('label').innerHTML = Math.sqrt(Math.pow(x0 - x, 2) + Math.pow(y0 - y, 2))
        //    let s = Math.sqrt(Math.pow(x0 - x, 2) + Math.pow(y0 - y, 2)) / 4
        //    movingBox.speed = s > 20 ? 20 : s
        // }, 15);
})


function start(){
    setInterval(refresh, 15)
}

function refresh() {
    //window.alert('dddd')
    mousespeed = Math.sqrt(Math.pow(x0 - x, 2) + Math.pow(y0 - y, 2)) / 4
    if (mousespeed < 5) mousespeed = 5
    x0 = x
    y0 = y
    movingBox.move()
    //movingBox.element.style.left = 10 + 'px'
}


