// Variables and canvas config

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 200;

const CANVAS_DIM = {
    max_X: canvas.width,
    max_Y: canvas.height,
    center_X: canvas.width / 2,
    center_Y: canvas.height / 2,
}

const SETTINGS = {
    POINTS_NBR: 50,
    SHOW_POINTS: true,
    SHOW_LINES: true,
    POINTS_COLOR: '#32323250',
    LINES_COLOR: '#32323210',
}

// Generate random size for points

function randomSize() {
    return Math.floor(Math.random() * 4 + 2);
}

// Generate random speed for points 

function randomSpeed() {
    let speed = Math.floor(Math.random() * 3 + 1)
    speed = Math.random() >= 0.5 ? speed : -speed;
    return speed;
}

// Create points list dynamically

const points = [];

function initPoints() {
    for (let i = 0; i < SETTINGS.POINTS_NBR; i++) {
        let point = {
            // x: i < 10 ? i * 60 : i * 60 - CANVAS_DIM.max_X,
            // y: i <= 10 ? 20 : CANVAS_DIM.max_Y - 20,
            x: Math.floor(Math.random() * (CANVAS_DIM.max_X + 100) - 100),
            y: Math.floor(Math.random() * (CANVAS_DIM.max_Y + 100) - 100),
            size: randomSize(),
            dx: randomSpeed(),
            dy: randomSpeed(),
        };

        points.push(point);
    }
}

initPoints();

// Draw Points on canvas

function drawPoints() {
    points.forEach(point => {
        ctx.beginPath();
        // ctx.fillStyle = '#00000055'
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = SETTINGS.POINTS_COLOR;
        ctx.fill();
    })
}

// Draw lines between points

function drawLines(current_point) {
    points.forEach(point => {
    })

    let current_index = points.indexOf(current_point);

    for (let i = current_index; i < current_index + 2; i++) {
        if (current_index + 2 >= points.length) return
        ctx.beginPath();
        ctx.moveTo(current_point.x, current_point.y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.strokeStyle = SETTINGS.LINES_COLOR;
        ctx.stroke()
    }
}

function drawLinesAllPoints() {
    points.forEach(point => drawLines(point));
}

// Check Collision between points and borders

function checkCollision(point) {
    // Horizontal collision
    if (point.x < -50 || point.x >= CANVAS_DIM.max_X + 50) {
        point.dx *= -1;
    }

    // Vertical collision
    if (point.y < -50 || point.y >= CANVAS_DIM.max_Y + 50) {
        point.dy *= -1;
    }
}

function checkCollisionPoints() {
    points.forEach(point => checkCollision(point));
}

// Move points on the canvas

function movePoint(point) {
    point.x += point.dx / 5;
    point.y += point.dy / 5;
}

function moveAllPoints() {
    points.forEach(point => movePoint(point));
}

// Update function for animation

function update() {

    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_DIM.max_X, CANVAS_DIM.max_Y);

    // Move points on the canvas
    moveAllPoints();

    // Check collision between points and borders
    checkCollisionPoints();

    // Draw points on the canvas
    SETTINGS.SHOW_POINTS && drawPoints();

    // Draw lines between points
    SETTINGS.SHOW_LINES && drawLinesAllPoints();

    // Animate update function
    requestAnimationFrame(update);
}

update();