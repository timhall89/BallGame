const friction = 0.01
const unit = 'px'
const g = 9.81

var mouseX, mouseY
var boxHeight, boxWidth
var container = document.getElementById('container')

var pointer = newCircle(300, 100, 'pointer')

var fixies = []
var movings = []





movings.push(newCircle(100, 100, 'moving'))


// Create some fixed points
fixies.push(newCircle(200, 200, 'fixedPoint'))
fixies.push(newCircle(700, 400, 'fixedPoint'))

function CheckCollision(moving, fixie) {
    var r = (moving.offsetWidth / 2) + (fixie.offsetWidth / 2)
    var d = getSpeed(fixie.x - (moving.x + moving.xspeed), fixie.y - (moving.y + moving.yspeed))

    if (d < r) moving.collision(fixie)
}



for (var f in fixies) {
    console.log(fixies[f].x)
}
function CheckMovings(){
    for (var m in movings) checkAMoving(m)
}

function checkAMoving(moving){
    for (var f in fixies) CheckCollision(moving, f)
    
}
function getAngle(y, x) {
    return Math.atan2(y, x)
}

function getXspeed(speed, angle){
    return Math.cos(angle) * speed
}

function getYspeed(speed, angle){
    return Math.sin(angle) * speed
}

function getSpeed(xspeed, yspeed){
    return Math.sqrt(Math.pow(xspeed, 2) + Math.pow(yspeed, 2))
}

function newMoving(_xspeed = 0, _speed = 0) {
    var newC = newCircle
}

function newCircle(x, y, cls){
    var cirle = document.createElement('div')
    cirle.classList.add(cls)
    container.appendChild(cirle)

    cirle.move = function(_x, _y){
        if (this.x != _x) {
            this.style.left = _x + unit
            this.x = _x
        } 

        if (this.y != _y){
            this.style.top = _y + unit
            this.y = _y
        }
    }

    cirle.move(x, y)
    cirle.xspeed = 0
    cirle.yspeed = 0

    cirle.collision = function(obj){
        var angle = getAngle(this.xspeed, this.yspeed)
        var speed = getSpeed(this.xspeed, this.yspeed)

        var anglecol = getAngle(obj.x - this.x, obj.y - this.y)

        var speedcol = getXspeed(speed, angle - anglecol)
    }
    return cirle
}

function ReverseAngle(angle) {
    var modAngle = angle % 360
    var flipAngle
    //if (modAngle < 0) 
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

        var xdiff = getXspeed(this.speed, this.angle)
        var ydiff = getYspeed(this.speed, this.angle)
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
    mouseX = event.clientX
    mouseY = event.clientY
    
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
    pointer.move((mouseX - 10), (mouseY - 10))
    
    mousespeed = Math.sqrt(Math.pow(x0 - x, 2) + Math.pow(y0 - y, 2)) / 4
    if (mousespeed < 5) mousespeed = 5
    x0 = x
    y0 = y
    movingBox.move()
    //movingBox.element.style.left = 10 + 'px'
}


